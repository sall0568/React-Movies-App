// backend/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ========================================
// CONFIGURATION CORS
// ========================================
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "https://moviereverse.netlify.app", // ⬅️ Remplacez par votre URL
          "https://cinescope-app.netlify.app",
        ]
      : ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// ========================================
// RATE LIMITING (Protection anti-abus)
// ========================================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes max par IP
  message: { error: "Trop de requêtes. Réessayez dans 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);

// ========================================
// CONFIGURATION TMDB
// ========================================
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Vérification de la clé API au démarrage
if (!TMDB_API_KEY) {
  console.error("❌ ERREUR: TMDB_API_KEY manquante dans .env");
  process.exit(1);
}

// ========================================
// MIDDLEWARE DE LOGGING
// ========================================
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ========================================
// ROUTES API
// ========================================

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Route proxy générique pour TMDB (compatible Express 5)
app.get(/^\/api\/tmdb\/(.*)/, async (req, res) => {
  try {
    // req.params[0] contient tout ce qui suit /api/tmdb/
    const tmdbPath = req.params[0];

    const tmdbUrl = `${TMDB_BASE_URL}/${tmdbPath}`;
    const params = { ...req.query, api_key: TMDB_API_KEY };

    console.log(`🎬 Proxying to TMDB: ${tmdbPath}`);

    const response = await axios.get(tmdbUrl, { params });
    res.json(response.data);
  } catch (error) {
    console.error("❌ TMDB API Error:", error.message);

    if (error.response) {
      res.status(error.response.status).json({
        error: "Erreur TMDB API",
        message: error.response.data.status_message || error.message,
        code: error.response.status,
      });
    } else if (error.request) {
      res.status(503).json({
        error: "Service indisponible",
        message: "TMDB ne répond pas. Réessayez plus tard.",
      });
    } else {
      res.status(500).json({
        error: "Erreur serveur",
        message: "Une erreur interne s'est produite.",
      });
    }
  }
});

// ========================================
// ROUTES SPÉCIFIQUES (Optionnel - Plus performant)
// ========================================

// Films populaires
app.get("/api/movies/popular", async (req, res) => {
  try {
    const { page = 1, language = "fr-FR" } = req.query;

    const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing`, {
      params: {
        api_key: TMDB_API_KEY,
        language,
        page,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des films" });
  }
});

// Recherche de films
app.get("/api/movies/search", async (req, res) => {
  try {
    const { query, page = 1, language = "fr-FR" } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Paramètre "query" requis' });
    }

    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        language,
        page,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error searching movies:", error.message);
    res.status(500).json({ error: "Erreur lors de la recherche" });
  }
});

// Détails d'un film
app.get("/api/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { language = "fr-FR" } = req.query;

    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération du film" });
  }
});

// Séries populaires
app.get("/api/tv/popular", async (req, res) => {
  try {
    const { page = 1, language = "fr-FR" } = req.query;

    const response = await axios.get(`${TMDB_BASE_URL}/tv/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        language,
        page,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching popular TV shows:", error.message);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des séries" });
  }
});

// ========================================
// ROUTE 404
// ========================================
app.use((req, res) => {
  res.status(404).json({
    error: "Route non trouvée",
    path: req.path,
  });
});

// ========================================
// GESTION DES ERREURS GLOBALES
// ========================================
app.use((err, req, res, next) => {
  console.error("❌ Erreur non gérée:", err);
  res.status(500).json({
    error: "Erreur serveur interne",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ========================================
// DÉMARRAGE DU SERVEUR
// ========================================
app.listen(PORT, () => {
  console.log("\n" + "=".repeat(50));
  console.log(`🚀 Serveur backend démarré !`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔑 API Key: ${TMDB_API_KEY ? "✓ Configurée" : "✗ Manquante"}`);
  console.log("=".repeat(50) + "\n");
});

// Gestion propre de l'arrêt
process.on("SIGTERM", () => {
  console.log("👋 Arrêt du serveur...");
  process.exit(0);
});
