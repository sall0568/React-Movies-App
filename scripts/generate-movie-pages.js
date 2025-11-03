// scripts/generate-movie-pages.js
// Script pour générer automatiquement des pages "Où regarder [FILM]"

const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Configuration
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const OUTPUT_DIR = path.join(__dirname, "../src/pages/generated");
const SITEMAP_PATH = path.join(__dirname, "../public/sitemap-generated.xml");

// Créer le dossier de sortie
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Fonction pour créer un slug SEO-friendly
const createSlug = (title) => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 60);
};

// Fonction pour récupérer les films populaires
const getPopularMovies = async (pages = 10) => {
  console.log(`📥 Récupération des films populaires (${pages} pages)...`);

  const movies = [];

  for (let page = 1; page <= pages; page++) {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
        params: {
          api_key: TMDB_API_KEY,
          language: "fr-FR",
          page: page,
        },
      });

      movies.push(...response.data.results);
      console.log(
        `   ✅ Page ${page}/${pages} récupérée (${response.data.results.length} films)`
      );

      // Pause pour ne pas surcharger l'API
      await new Promise((resolve) => setTimeout(resolve, 250));
    } catch (error) {
      console.error(`   ❌ Erreur page ${page}:`, error.message);
    }
  }

  console.log(`\n✅ Total: ${movies.length} films récupérés\n`);
  return movies;
};

// Fonction pour récupérer les plateformes de streaming
const getStreamingProviders = async (movieId) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${movieId}/watch/providers`,
      {
        params: { api_key: TMDB_API_KEY },
      }
    );

    return response.data.results?.FR || null;
  } catch (error) {
    return null;
  }
};

// Template de page React
const generatePageTemplate = (movie, providers) => {
  const slug = createSlug(movie.title);
  const componentName = `WhereToWatch${movie.id}`;

  // Préparer les données des plateformes
  const streamingData = providers
    ? {
        flatrate: providers.flatrate || [],
        rent: providers.rent || [],
        buy: providers.buy || [],
      }
    : null;

  return `// Page générée automatiquement pour "${movie.title}"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './WhereToWatch.scss';

const ${componentName} = () => {
  const navigate = useNavigate();
  
  const movie = ${JSON.stringify(movie, null, 2)};
  
  const providers = ${JSON.stringify(streamingData, null, 2)};
  
  const affiliateLinks = {
    netflix: "https://www.netflix.com/search?q=${encodeURIComponent(
      movie.title
    )}",
    prime: "https://www.primevideo.com/search?q=${encodeURIComponent(
      movie.title
    )}",
    disney: "https://www.disneyplus.com/search?q=${encodeURIComponent(
      movie.title
    )}",
    canal: "https://www.canalplus.com/recherche/?query=${encodeURIComponent(
      movie.title
    )}"
  };
  
  return (
    <>
      <Helmet>
        <title>Où regarder ${movie.title} en streaming ? | CinéScope</title>
        <meta 
          name="description" 
          content="Découvrez où regarder ${
            movie.title
          } légalement en streaming. Netflix, Prime Video, Disney+, Canal+. Comparez les prix et abonnez-vous en 1 clic."
        />
        <meta name="keywords" content="où regarder ${movie.title}, ${
    movie.title
  } streaming, ${movie.title} netflix, ${movie.title} prime video" />
        <link rel="canonical" href="https://moviereverse.netlify.app/ou-regarder-${slug}" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Où regarder ${
          movie.title
        } en streaming ?" />
        <meta property="og:description" content="Trouvez où regarder ${
          movie.title
        } légalement sur Netflix, Prime Video, Disney+ et plus." />
        <meta property="og:image" content={\`https://image.tmdb.org/t/p/w500\${movie.poster_path}\`} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="where-to-watch-page">
        <Header />
        
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Retour
        </button>
        
        <div className="where-content">
          <div className="movie-header">
            <div className="movie-poster">
              <img 
                src={\`https://image.tmdb.org/t/p/w500\${movie.poster_path}\`}
                alt={\`Affiche de \${movie.title}\`}
                loading="lazy"
              />
            </div>
            
            <div className="movie-info">
              <h1>Où regarder {movie.title} en streaming ?</h1>
              
              {movie.release_date && (
                <p className="release-date">
                  📅 Sorti le {new Date(movie.release_date).toLocaleDateString('fr-FR')}
                </p>
              )}
              
              <div className="rating">
                ⭐ {movie.vote_average.toFixed(1)}/10
              </div>
              
              {movie.overview && (
                <div className="synopsis">
                  <h2>Synopsis</h2>
                  <p>{movie.overview}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="streaming-section">
            <h2>📺 Plateformes de streaming disponibles</h2>
            
            {providers ? (
              <>
                {providers.flatrate && providers.flatrate.length > 0 && (
                  <div className="platform-category">
                    <h3>Inclus dans l'abonnement</h3>
                    <div className="platform-list">
                      {providers.flatrate.map((provider) => (
                        <a 
                          key={provider.provider_id}
                          href={affiliateLinks[provider.provider_name.toLowerCase()] || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="platform-card"
                        >
                          <img 
                            src={\`https://image.tmdb.org/t/p/original\${provider.logo_path}\`}
                            alt={provider.provider_name}
                          />
                          <span>{provider.provider_name}</span>
                          <button className="btn-watch">Regarder maintenant</button>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                {providers.rent && providers.rent.length > 0 && (
                  <div className="platform-category">
                    <h3>Location</h3>
                    <div className="platform-list">
                      {providers.rent.map((provider) => (
                        <a 
                          key={provider.provider_id}
                          href={affiliateLinks[provider.provider_name.toLowerCase()] || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="platform-card"
                        >
                          <img 
                            src={\`https://image.tmdb.org/t/p/original\${provider.logo_path}\`}
                            alt={provider.provider_name}
                          />
                          <span>{provider.provider_name}</span>
                          <button className="btn-watch">Louer</button>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                {providers.buy && providers.buy.length > 0 && (
                  <div className="platform-category">
                    <h3>Achat</h3>
                    <div className="platform-list">
                      {providers.buy.map((provider) => (
                        <a 
                          key={provider.provider_id}
                          href={affiliateLinks[provider.provider_name.toLowerCase()] || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="platform-card"
                        >
                          <img 
                            src={\`https://image.tmdb.org/t/p/original\${provider.logo_path}\`}
                            alt={provider.provider_name}
                          />
                          <span>{provider.provider_name}</span>
                          <button className="btn-watch">Acheter</button>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="no-providers">
                <p>Aucune plateforme de streaming disponible pour le moment.</p>
                <p>Vérifiez les principales plateformes :</p>
                <div className="platform-list">
                  {Object.entries(affiliateLinks).map(([name, link]) => (
                    <a 
                      key={name}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="platform-link"
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="faq-section">
            <h2>❓ Questions fréquentes</h2>
            
            <div className="faq-item">
              <h3>Où regarder ${movie.title} gratuitement ?</h3>
              <p>
                ${
                  movie.title
                } peut être disponible gratuitement sur certaines plateformes avec publicité.
                Vérifiez les plateformes ci-dessus ou attendez sa disponibilité sur une plateforme
                incluse dans votre abonnement.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Est-ce que ${movie.title} est sur Netflix ?</h3>
              <p>
                Vérifiez la disponibilité ci-dessus. La disponibilité sur Netflix varie selon
                les pays et change régulièrement.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Quel est le meilleur prix pour regarder ${movie.title} ?</h3>
              <p>
                Si le film est inclus dans un abonnement que vous possédez déjà (Netflix, Prime Video, etc.),
                c'est l'option la plus économique. Sinon, comparez les prix de location ci-dessus.
              </p>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default ${componentName};
`;
};

// Générer le fichier de routes
const generateRoutesFile = (movies) => {
  const imports = movies
    .map((movie, index) => {
      const componentName = `WhereToWatch${movie.id}`;
      const slug = createSlug(movie.title);
      return `const ${componentName} = lazy(() => import('./pages/generated/WhereToWatch_${movie.id}'));`;
    })
    .join("\n");

  const routes = movies
    .map((movie) => {
      const componentName = `WhereToWatch${movie.id}`;
      const slug = createSlug(movie.title);
      return `  <Route path="/ou-regarder-${slug}" element={<${componentName} />} />`;
    })
    .join("\n");

  return `// Routes générées automatiquement
import { lazy } from 'react';
import { Route } from 'react-router-dom';

${imports}

export const generatedRoutes = (
  <>
${routes}
  </>
);
`;
};

// Générer le sitemap
const generateSitemap = (movies) => {
  const today = new Date().toISOString().split("T")[0];

  const urls = movies
    .map((movie) => {
      const slug = createSlug(movie.title);
      return `  <url>
    <loc>https://moviereverse.netlify.app/ou-regarder-${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, sitemap);
  console.log(`✅ Sitemap généré : ${SITEMAP_PATH}`);
};

// Fonction principale
const main = async () => {
  console.log('🚀 GÉNÉRATION AUTOMATIQUE DE PAGES "OÙ REGARDER"\n');
  console.log("=".repeat(60) + "\n");

  // 1. Récupérer les films
  const movies = await getPopularMovies(10); // 10 pages = ~200 films

  if (movies.length === 0) {
    console.error("❌ Aucun film récupéré. Vérifiez votre clé API TMDB.");
    process.exit(1);
  }

  // 2. Générer les pages
  console.log("📝 Génération des pages React...\n");

  let successCount = 0;
  let errorCount = 0;

  for (const movie of movies) {
    try {
      // Récupérer les plateformes de streaming
      const providers = await getStreamingProviders(movie.id);

      // Générer le contenu
      const pageContent = generatePageTemplate(movie, providers);

      // Sauvegarder le fichier
      const filename = `WhereToWatch_${movie.id}.jsx`;
      const filepath = path.join(OUTPUT_DIR, filename);
      fs.writeFileSync(filepath, pageContent);

      successCount++;
      console.log(`   ✅ [${successCount}/${movies.length}] ${movie.title}`);

      // Pause pour ne pas surcharger l'API
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      errorCount++;
      console.error(`   ❌ Erreur: ${movie.title} - ${error.message}`);
    }
  }

  // 3. Générer le fichier de routes
  console.log("\n📋 Génération du fichier de routes...");
  const routesContent = generateRoutesFile(movies);
  fs.writeFileSync(
    path.join(__dirname, "../src/generatedRoutes.js"),
    routesContent
  );
  console.log("✅ Fichier de routes généré\n");

  // 4. Générer le sitemap
  console.log("🗺️  Génération du sitemap...");
  generateSitemap(movies);

  // 5. Résumé
  console.log("\n" + "=".repeat(60));
  console.log("📊 RÉSUMÉ DE LA GÉNÉRATION\n");
  console.log(`✅ Pages générées avec succès : ${successCount}`);
  console.log(`❌ Erreurs : ${errorCount}`);
  console.log(`📁 Dossier de sortie : ${OUTPUT_DIR}`);
  console.log(`🗺️  Sitemap : ${SITEMAP_PATH}`);
  console.log("\n🎯 PROCHAINES ÉTAPES:");
  console.log("1. Importer les routes dans App.js");
  console.log("2. Créer le fichier WhereToWatch.scss");
  console.log("3. Build et deploy");
  console.log("4. Soumettre sitemap à Google Search Console");
  console.log("=".repeat(60) + "\n");
};

// Exécuter
main().catch(console.error);
