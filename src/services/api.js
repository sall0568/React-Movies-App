// src/services/api.js
import axios from "axios";

// URL du backend
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Instance axios configurée
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// INTERCEPTEURS
// ========================================

// Intercepteur de requête (optionnel - pour le logging)
api.interceptors.request.use(
  (config) => {
    console.log(`🔵 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour gérer les erreurs
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error);

    // Gestion personnalisée des erreurs
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 429:
          return Promise.reject(
            new Error("Trop de requêtes. Veuillez patienter.")
          );
        case 404:
          return Promise.reject(new Error("Ressource non trouvée."));
        case 500:
        case 502:
        case 503:
          return Promise.reject(
            new Error("Erreur serveur. Réessayez plus tard.")
          );
        default:
          return Promise.reject(
            new Error(data?.message || "Une erreur est survenue.")
          );
      }
    } else if (error.request) {
      // Pas de réponse du serveur
      return Promise.reject(
        new Error(
          "Impossible de contacter le serveur. Vérifiez votre connexion."
        )
      );
    } else {
      return Promise.reject(new Error(error.message || "Erreur inconnue."));
    }
  }
);

// ========================================
// API FILMS
// ========================================

export const movieAPI = {
  // Recherche de films
  search: async (query, page = 1) => {
    const response = await api.get("/tmdb/search/movie", {
      params: { query, language: "fr-FR", page },
    });
    return response.data;
  },

  // Films populaires (now_playing)
  getPopular: async (page = 1) => {
    const response = await api.get("/tmdb/movie/now_playing", {
      params: { language: "fr-FR", page },
    });
    return response.data;
  },

  // Détails d'un film
  getDetails: async (id) => {
    const response = await api.get(`/tmdb/movie/${id}`, {
      params: { language: "fr-FR" },
    });
    return response.data;
  },

  // Crédits (casting)
  getCredits: async (id) => {
    const response = await api.get(`/tmdb/movie/${id}/credits`, {
      params: { language: "fr-FR" },
    });
    return response.data;
  },

  // Vidéos (bandes-annonces)
  getVideos: async (id) => {
    const response = await api.get(`/tmdb/movie/${id}/videos`, {
      params: { language: "fr-FR" },
    });
    return response.data;
  },

  // Films similaires
  getSimilar: async (id) => {
    const response = await api.get(`/tmdb/movie/${id}/similar`, {
      params: { language: "fr-FR" },
    });
    return response.data;
  },

  // Fournisseurs de streaming
  getWatchProviders: async (id) => {
    const response = await api.get(`/tmdb/movie/${id}/watch/providers`);
    return response.data;
  },

  // Avis utilisateurs
  getReviews: async (id) => {
    const response = await api.get(`/tmdb/movie/${id}/reviews`, {
      params: { language: "fr-FR" },
    });
    return response.data;
  },
};

// ========================================
// API SÉRIES TV
// ========================================

export const tvAPI = {
  // Recherche de séries
  search: async (query, page = 1) => {
    const response = await api.get("/tmdb/search/tv", {
      params: { query, language: "fr-FR", page },
    });
    return response.data;
  },

  // Séries populaires
  getPopular: async (page = 1) => {
    const response = await api.get("/tmdb/tv/popular", {
      params: { language: "fr-FR", page },
    });
    return response.data;
  },

  // Détails d'une série
  getDetails: async (id) => {
    const response = await api.get(`/tmdb/tv/${id}`, {
      params: { language: "fr-FR" },
    });
    return response.data;
  },

  // Crédits
  getCredits: async (id) => {
    const response = await api.get(`/tmdb/tv/${id}/credits`, {
      params: { language: "fr-FR" },
    });
    return response.data;
  },

  // Vidéos
  getVideos: async (id) => {
    const response = await api.get(`/tmdb/tv/${id}/videos`, {
      params: { language: "fr-FR" },
    });
    return response.data;
  },

  // Séries similaires
  getSimilar: async (id) => {
    const response = await api.get(`/tmdb/tv/${id}/similar`, {
      params: { language: "fr-FR" },
    });
    return response.data;
  },

  // Fournisseurs de streaming
  getWatchProviders: async (id) => {
    const response = await api.get(`/tmdb/tv/${id}/watch/providers`);
    return response.data;
  },

  // Détails d'une saison
  getSeasonDetails: async (tvId, seasonNumber) => {
    const response = await api.get(`/tmdb/tv/${tvId}/season/${seasonNumber}`, {
      params: { language: "fr-FR" },
    });
    return response.data;
  },
};

// ========================================
// API PERSONNES
// ========================================

export const personAPI = {
  // Détails d'une personne
  getDetails: async (id) => {
    const response = await api.get(`/tmdb/person/${id}`, {
      params: { language: "fr-FR" },
    });
    return response.data;
  },

  // Filmographie
  getMovieCredits: async (id) => {
    const response = await api.get(`/tmdb/person/${id}/movie_credits`, {
      params: { language: "fr-FR" },
    });
    return response.data;
  },
};

// ========================================
// EXPORT
// ========================================

export default api;
