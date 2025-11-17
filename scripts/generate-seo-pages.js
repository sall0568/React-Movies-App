// scripts/generate-seo-pages.js
// Générateur automatique de pages "Où regarder" pour SEO

const fs = require("fs");
const path = require("path");

// 🎬 TOP 50 FILMS POPULAIRES (à étendre à 500+)
const popularMovies = [
  { id: 299534, title: "Avengers: Endgame", genre: "Action" },
  { id: 27205, title: "Inception", genre: "Science-Fiction" },
  { id: 155, title: "The Dark Knight", genre: "Action" },
  { id: 157336, title: "Interstellar", genre: "Science-Fiction" },
  { id: 299536, title: "Avengers: Infinity War", genre: "Action" },
  { id: 76341, title: "Mad Max: Fury Road", genre: "Action" },
  { id: 447365, title: "Guardians of the Galaxy Vol. 3", genre: "Action" },
  { id: 505642, title: "Black Panther: Wakanda Forever", genre: "Action" },
  { id: 634649, title: "Spider-Man: No Way Home", genre: "Action" },
  {
    id: 338953,
    title: "Fantastic Beasts: The Secrets of Dumbledore",
    genre: "Fantasy",
  },
  { id: 550, title: "Fight Club", genre: "Drame" },
  { id: 13, title: "Forrest Gump", genre: "Drame" },
  { id: 19995, title: "Avatar", genre: "Science-Fiction" },
  { id: 603, title: "The Matrix", genre: "Science-Fiction" },
  { id: 424, title: "Schindler's List", genre: "Drame" },
  { id: 278, title: "The Shawshank Redemption", genre: "Drame" },
  { id: 680, title: "Pulp Fiction", genre: "Crime" },
  { id: 238, title: "The Godfather", genre: "Crime" },
  { id: 389, title: "12 Angry Men", genre: "Drame" },
  { id: 429, title: "The Good, the Bad and the Ugly", genre: "Western" },
  { id: 496243, title: "Parasite", genre: "Thriller" },
  { id: 129, title: "Spirited Away", genre: "Animation" },
  { id: 914, title: "The Great Dictator", genre: "Comédie" },
  { id: 637, title: "Life Is Beautiful", genre: "Comédie Dramatique" },
  { id: 372058, title: "Your Name", genre: "Animation" },
  { id: 497, title: "The Green Mile", genre: "Drame" },
  { id: 11216, title: "Cinema Paradiso", genre: "Drame" },
  { id: 539, title: "Psycho", genre: "Horreur" },
  { id: 567, title: "Rear Window", genre: "Thriller" },
  { id: 598, title: "City of God", genre: "Crime" },
  { id: 769, title: "GoodFellas", genre: "Crime" },
  { id: 311, title: "Once Upon a Time in America", genre: "Crime" },
  { id: 19404, title: "Dilwale Dulhania Le Jayenge", genre: "Romance" },
  {
    id: 324857,
    title: "Spider-Man: Into the Spider-Verse",
    genre: "Animation",
  },
  {
    id: 122,
    title: "The Lord of the Rings: The Return of the King",
    genre: "Fantasy",
  },
  {
    id: 120,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    genre: "Fantasy",
  },
  { id: 121, title: "The Lord of the Rings: The Two Towers", genre: "Fantasy" },
  {
    id: 140607,
    title: "Star Wars: The Force Awakens",
    genre: "Science-Fiction",
  },
  { id: 11, title: "Star Wars", genre: "Science-Fiction" },
  { id: 1891, title: "The Empire Strikes Back", genre: "Science-Fiction" },
  { id: 1892, title: "Return of the Jedi", genre: "Science-Fiction" },
  { id: 120467, title: "The Grand Budapest Hotel", genre: "Comédie" },
  { id: 274, title: "The Silence of the Lambs", genre: "Thriller" },
  { id: 346, title: "Seven", genre: "Thriller" },
  { id: 4935, title: "Howl's Moving Castle", genre: "Animation" },
  { id: 12477, title: "Grave of the Fireflies", genre: "Animation" },
  { id: 637, title: "La vita è bella", genre: "Comédie Dramatique" },
  { id: 630, title: "The Usual Suspects", genre: "Crime" },
  { id: 562, title: "Die Hard", genre: "Action" },
  { id: 24428, title: "The Avengers", genre: "Action" },
];

// 📝 TEMPLATE DE PAGE SEO
function generateSEOPage(movie) {
  const slug = movie.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `---
title: "Où regarder ${movie.title} en streaming en 2025 ?"
description: "Découvrez où regarder ${
    movie.title
  } légalement en streaming. Netflix, Prime Video, Disney+, Canal+. Prix, disponibilité et alternatives gratuites."
keywords: "où regarder ${movie.title}, ${movie.title} streaming, ${
    movie.title
  } netflix, ${movie.title} gratuit, streaming ${movie.title} vf"
date: "${new Date().toISOString()}"
movie_id: ${movie.id}
genre: "${movie.genre}"
---

# Où regarder ${movie.title} en streaming en 2025 ? 🎬

Vous cherchez **où regarder ${
    movie.title
  } en streaming** ? Vous êtes au bon endroit ! Ce guide complet vous indique toutes les plateformes légales pour visionner ${
    movie.title
  } en France.

## 🎥 Où regarder ${movie.title} légalement ?

### Streaming Inclus dans l'Abonnement

#### Netflix
- **Disponibilité** : [Vérifier sur Netflix](https://netflix.com)
- **Prix** : À partir de 5,99€/mois
- **Qualité** : Jusqu'en 4K HDR
- **Avantages** : Catalogue varié, interface intuitive

#### Amazon Prime Video
- **Disponibilité** : [Vérifier sur Prime Video](https://primevideo.com)
- **Prix** : 6,99€/mois ou inclus dans Prime (69,90€/an)
- **Qualité** : Jusqu'en 4K HDR
- **Avantages** : Livraison gratuite Amazon incluse

#### Disney+
- **Disponibilité** : [Vérifier sur Disney+](https://disneyplus.com)
- **Prix** : 5,99€/mois avec publicité ou 11,99€/mois sans publicité
- **Qualité** : Jusqu'en 4K HDR
- **Avantages** : Tous les films Marvel, Star Wars, Pixar

#### Canal+
- **Disponibilité** : [Vérifier sur Canal+](https://canalplus.com)
- **Prix** : À partir de 24,99€/mois
- **Qualité** : HD et 4K
- **Avantages** : Cinéma + séries + sport

#### OCS
- **Disponibilité** : [Vérifier sur OCS](https://ocs.fr)
- **Prix** : 10,99€/mois
- **Qualité** : HD
- **Avantages** : Séries HBO exclusives

### 💰 Location & Achat VOD

Si ${
    movie.title
  } n'est pas inclus dans votre abonnement, vous pouvez le louer ou l'acheter :

#### YouTube
- **Location** : 2,99€ - 4,99€ (48h)
- **Achat** : 7,99€ - 14,99€
- **Qualité** : HD et 4K disponibles

#### Google Play
- **Location** : 2,99€ - 4,99€ (48h)
- **Achat** : 7,99€ - 14,99€
- **Qualité** : HD et 4K disponibles

#### Apple TV
- **Location** : 2,99€ - 4,99€ (48h)
- **Achat** : 7,99€ - 14,99€
- **Qualité** : 4K HDR avec Dolby Atmos

#### Microsoft Store
- **Location** : 2,99€ - 4,99€ (48h)
- **Achat** : 7,99€ - 14,99€
- **Qualité** : HD et 4K disponibles

## ❓ FAQ - Questions fréquentes

### Est-ce que ${movie.title} est sur Netflix ?
La disponibilité de ${
    movie.title
  } sur Netflix varie selon les pays. Vérifiez directement sur Netflix France pour savoir si le film est actuellement disponible.

### Où regarder ${movie.title} gratuitement ?
Il n'existe pas de moyen **100% légal et gratuit** de regarder ${
    movie.title
  }. Cependant, vous pouvez profiter :
- Des **essais gratuits** de 7-30 jours sur Netflix, Prime Video, Disney+
- De **Pluto TV** et **Molotov TV** (avec publicités)
- Des **médiathèques** de votre bibliothèque municipale

⚠️ **Attention** : Évitez les sites de streaming illégaux. Ils sont :
- Illégaux et punissables par la loi
- Dangereux pour votre ordinateur (virus, malware)
- De mauvaise qualité (coupures, sous-titres désynchronisés)

### Est-ce que ${movie.title} est sur Prime Video ?
Vérifiez directement sur Prime Video. La disponibilité change régulièrement.

### Quel est le meilleur prix pour regarder ${movie.title} ?
Le meilleur rapport qualité/prix dépend de vos habitudes :
- **Si vous regardez beaucoup de films** → Abonnement Netflix/Prime/Disney+
- **Si c'est ponctuel** → Location VOD à 2,99€-4,99€

## 🎭 À propos de ${movie.title}

### Synopsis
${movie.title} est un film de ${
    movie.genre
  } qui a marqué le cinéma. [Le synopsis complet sera ajouté prochainement]

### Informations techniques
- **Genre** : ${movie.genre}
- **Durée** : [À compléter]
- **Sortie** : [À compléter]
- **Réalisateur** : [À compléter]
- **Casting** : [À compléter]

### Pourquoi regarder ${movie.title} ?
${movie.title} est considéré comme un incontournable du cinéma ${
    movie.genre
  }. [Les raisons seront ajoutées prochainement]

## 🎬 Films similaires à ${movie.title}

Si vous avez aimé ${movie.title}, vous aimerez aussi :
- [Film similaire 1]
- [Film similaire 2]
- [Film similaire 3]
- [Film similaire 4]
- [Film similaire 5]

[Découvrez plus de films ${movie.genre} sur CinéScope →](/)

## 📱 Applications pour regarder ${movie.title}

### Sur Mobile & Tablette
- **Netflix** : iOS & Android
- **Prime Video** : iOS & Android
- **Disney+** : iOS & Android
- **Canal+** : iOS & Android

### Sur TV & Consoles
- **Smart TV** : Samsung, LG, Sony
- **Apple TV** : tvOS
- **Android TV** : Google TV, Nvidia Shield
- **Consoles** : PlayStation, Xbox
- **Box Internet** : Freebox, Livebox, Bbox, SFR Box

## 💡 Conseils pour économiser

### Astuce #1 : Profitez des essais gratuits
Tous les services proposent des essais gratuits :
- Netflix : 1 mois gratuit pour nouveaux clients
- Prime Video : 30 jours gratuits
- Disney+ : 7 jours gratuits

### Astuce #2 : Partagez les abonnements
Netflix, Prime Video et Disney+ autorisent le partage de compte :
- Netflix : Jusqu'à 4 écrans simultanés
- Prime Video : 3 écrans
- Disney+ : 4 écrans

### Astuce #3 : Alternez les abonnements
Abonnez-vous à un service pendant 1 mois, regardez tout ce qui vous intéresse, puis changez le mois suivant.

## 🔒 Streaming légal vs illégal

### Pourquoi privilégier le streaming légal ?
1. ✅ **Qualité optimale** : 4K, HDR, Dolby Atmos
2. ✅ **Sécurité** : Pas de virus ou malware
3. ✅ **Légalité** : Évitez les amendes (jusqu'à 1500€)
4. ✅ **Soutien aux créateurs** : Financez la création de nouveaux films

### Les risques du streaming illégal
- 🚫 Amende jusqu'à 1500€
- 🚫 Virus et ransomware
- 🚫 Qualité médiocre
- 🚫 Sous-titres désynchronisés
- 🚫 Publicités intrusives

## 📊 Comparatif des plateformes

| Plateforme | Prix/mois | Essai gratuit | Qualité | Catalogue |
|-----------|-----------|---------------|---------|-----------|
| Netflix | 5,99€-17,99€ | 1 mois* | 4K HDR | ⭐⭐⭐⭐⭐ |
| Prime Video | 6,99€ | 30 jours | 4K HDR | ⭐⭐⭐⭐ |
| Disney+ | 5,99€-11,99€ | 7 jours | 4K HDR | ⭐⭐⭐⭐ |
| Canal+ | 24,99€+ | Non | 4K | ⭐⭐⭐⭐⭐ |
| OCS | 10,99€ | 7 jours | HD | ⭐⭐⭐ |

*Offres variables selon les périodes

## 🌐 Regarder ${movie.title} depuis l'étranger

### Avec un VPN
Si vous voyagez ou habitez à l'étranger, vous pouvez accéder au catalogue français avec un VPN :
- **NordVPN** : 3,99€/mois
- **ExpressVPN** : 6,18€/mois
- **CyberGhost** : 2,19€/mois

⚠️ Vérifiez les conditions d'utilisation de votre plateforme de streaming.

## 📅 Historique de disponibilité

| Date | Plateforme | Statut |
|------|-----------|--------|
| Nov 2025 | [À vérifier] | Disponible/Indisponible |

*Dernière mise à jour : ${new Date().toLocaleDateString("fr-FR")}*

## 💬 Votre avis compte !

Avez-vous regardé ${movie.title} ? Partagez votre avis dans les commentaires !

**Note moyenne** : ⭐⭐⭐⭐⭐ (4.5/5 basé sur [X] avis)

---

## 🔗 Liens utiles

- [Retour à l'accueil CinéScope](/)
- [Tous les films ${movie.genre}](/genre/${movie.genre.toLowerCase()})
- [Nouveautés streaming 2025](/nouveautes-2025)
- [Top films à voir absolument](/top-films)

---

**Dernière mise à jour** : ${new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}

*CinéScope ne propose pas de streaming illégal. Nous vous guidons vers les plateformes légales pour soutenir l'industrie du cinéma.*
`;
}

// 🚀 GÉNÉRATION DES PAGES
function generateAllPages() {
  const outputDir = path.join(__dirname, "../public/seo-pages");

  // Créer le dossier si inexistant
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("🎬 Génération des pages SEO...\n");

  let successCount = 0;
  let errorCount = 0;

  popularMovies.forEach((movie) => {
    try {
      const slug = movie.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const filename = `ou-regarder-${slug}.md`;
      const filepath = path.join(outputDir, filename);
      const content = generateSEOPage(movie);

      fs.writeFileSync(filepath, content);

      successCount++;
      console.log(
        `✅ [${successCount}/${popularMovies.length}] ${movie.title}`
      );
    } catch (error) {
      errorCount++;
      console.error(`❌ Erreur: ${movie.title} - ${error.message}`);
    }
  });

  console.log("\n" + "=".repeat(60));
  console.log("📊 RÉSUMÉ");
  console.log("=".repeat(60));
  console.log(`✅ Pages générées : ${successCount}`);
  console.log(`❌ Erreurs : ${errorCount}`);
  console.log(`📁 Dossier : ${outputDir}`);
  console.log("=".repeat(60));

  // Générer l'index
  generateIndex(outputDir);
}

// 📋 GÉNÉRER INDEX.HTML
function generateIndex(outputDir) {
  const indexHTML = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Où regarder ? - Index des pages SEO | CinéScope</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    h1 { color: #546fe4; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    .card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .card h3 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .card p {
      color: #666;
      font-size: 14px;
    }
    .card a {
      color: #546fe4;
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>🎬 Index des Pages "Où Regarder" - CinéScope</h1>
  <p>Toutes les pages SEO générées automatiquement</p>
  
  <div class="grid">
    ${popularMovies
      .map((movie) => {
        const slug = movie.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        return `
    <div class="card">
      <h3>${movie.title}</h3>
      <p>Genre: ${movie.genre}</p>
      <a href="ou-regarder-${slug}.md">Voir la page →</a>
    </div>
      `;
      })
      .join("")}
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(outputDir, "index.html"), indexHTML);
  console.log("\n✅ Index généré : index.html");
}

// 🎯 EXÉCUTION
generateAllPages();

console.log("\n🎉 Génération terminée !");
console.log("\n📝 PROCHAINES ÉTAPES:");
console.log("1. Convertir les .md en .html ou React components");
console.log("2. Ajouter les vraies données TMDB pour chaque film");
console.log("3. Intégrer les liens d'affiliation");
console.log("4. Soumettre le sitemap à Google Search Console");
console.log("5. Suivre les positions dans Google Analytics");
