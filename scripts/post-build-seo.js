// scripts/post-build-seo.js
// Optimisations SEO post-build

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://moviereverse.netlify.app";
const BUILD_DIR = path.join(__dirname, "../build");

console.log("🚀 Optimisation SEO post-build...\n");

// 1. Vérifier que robots.txt est correct
const robotsTxtPath = path.join(BUILD_DIR, "robots.txt");
const correctRobotsTxt = `# robots.txt pour CinéScope - Optimisation SEO

# Autoriser tous les robots
User-agent: *
Allow: /

# Autoriser spécifiquement Googlebot
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Autoriser Bingbot
User-agent: Bingbot
Allow: /
Crawl-delay: 0

# Bloquer les fichiers inutiles pour le SEO
Disallow: /static/js/
Disallow: /static/css/
Disallow: /*.json$
Disallow: /*.map$

# SITEMAP - TRÈS IMPORTANT pour SEO
Sitemap: ${SITE_URL}/sitemap.xml
`;

try {
  fs.writeFileSync(robotsTxtPath, correctRobotsTxt);
  console.log("✅ robots.txt créé/mis à jour");
} catch (error) {
  console.error("❌ Erreur robots.txt:", error);
}

// 2. Ajouter meta robots dans index.html
const indexPath = path.join(BUILD_DIR, "index.html");

try {
  let html = fs.readFileSync(indexPath, "utf8");

  // Ajouter meta robots si absent
  if (!html.includes('meta name="robots"')) {
    html = html.replace(
      "<head>",
      `<head>
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`
    );
  }

  // Ajouter canonical si absent
  if (!html.includes('rel="canonical"')) {
    html = html.replace(
      "<head>",
      `<head>
    <link rel="canonical" href="${SITE_URL}/">`
    );
  }

  fs.writeFileSync(indexPath, html);
  console.log("✅ index.html optimisé pour SEO");
} catch (error) {
  console.error("❌ Erreur index.html:", error);
}

// 3. Créer une page HTML simple de test
const testPagePath = path.join(BUILD_DIR, "seo-test.html");
const testPage = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <title>Test SEO - CinéScope</title>
  <meta name="description" content="Page de test pour vérifier l'indexation Google de CinéScope">
  <link rel="canonical" href="${SITE_URL}/seo-test.html">
</head>
<body>
  <h1>Test SEO - CinéScope</h1>
  <p>Si vous voyez cette page dans Google, c'est que votre site est indexé!</p>
  <p>Date de création: ${new Date().toISOString()}</p>
  <a href="${SITE_URL}">Retour au site principal</a>
</body>
</html>`;

try {
  fs.writeFileSync(testPagePath, testPage);
  console.log("✅ Page de test SEO créée: /seo-test.html");
} catch (error) {
  console.error("❌ Erreur page de test:", error);
}

// 4. Vérifier que sitemap.xml existe
const sitemapPath = path.join(BUILD_DIR, "sitemap.xml");

if (fs.existsSync(sitemapPath)) {
  console.log("✅ sitemap.xml présent");

  // Lire et afficher le nombre d'URLs
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const urlCount = (sitemap.match(/<loc>/g) || []).length;
  console.log(`   → ${urlCount} URLs dans le sitemap`);
} else {
  console.warn("⚠️  sitemap.xml manquant - Génération...");

  // Générer un sitemap basique
  const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/series</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/coups-de-coeur</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/about</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/seo-test.html</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  fs.writeFileSync(sitemapPath, basicSitemap);
  console.log("✅ sitemap.xml généré (basique)");
}

// 5. Créer _headers pour Netlify (améliorer SEO)
const headersPath = path.join(BUILD_DIR, "_headers");
const headersContent = `# Headers pour optimisation SEO et performance

/*
  X-Robots-Tag: index, follow
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin

# Cache agressif pour les assets
/static/*
  Cache-Control: public, max-age=31536000, immutable

# Sitemap
/sitemap.xml
  Content-Type: application/xml; charset=utf-8
  Cache-Control: public, max-age=3600

# Robots.txt
/robots.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=3600
`;

try {
  fs.writeFileSync(headersPath, headersContent);
  console.log("✅ _headers créé pour Netlify");
} catch (error) {
  console.error("❌ Erreur _headers:", error);
}

// 6. Résumé final
console.log("\n📊 RÉSUMÉ:");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("✅ robots.txt optimisé");
console.log("✅ index.html amélioré");
console.log("✅ Page de test SEO créée");
console.log("✅ sitemap.xml vérifié");
console.log("✅ Headers Netlify configurés");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

console.log("🎯 PROCHAINES ÉTAPES:");
console.log("1. Deploy sur Netlify");
console.log("2. Aller sur Google Search Console");
console.log("3. Demander indexation de ces URLs:");
console.log(`   - ${SITE_URL}/`);
console.log(`   - ${SITE_URL}/series`);
console.log(`   - ${SITE_URL}/coups-de-coeur`);
console.log(`   - ${SITE_URL}/about`);
console.log(`   - ${SITE_URL}/seo-test.html`);
console.log("4. Vérifier robots.txt:");
console.log(`   → ${SITE_URL}/robots.txt`);
console.log("5. Vérifier sitemap.xml:");
console.log(`   → ${SITE_URL}/sitemap.xml`);
console.log("\n✨ Optimisation SEO terminée!\n");
