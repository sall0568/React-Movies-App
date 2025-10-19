// src/services/api.js - VERSION AVEC CACHE
import axios from "axios";
import apiCache from "../utils/cache";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== FONCTION HELPER POUR LES REQUÊTES AVEC CACHE =====
const cachedRequest = async (endpoint, params = {}, useCache = true) => {
  // Générer une clé de cache
  const cacheKey = apiCache.generateKey(endpoint, params);

  // Vérifier le cache si activé
  if (useCache) {
    const cachedData = apiCache.get(cacheKey);
    if (cachedData) {
      return cachedData; // Retourner les données en cache
    }
  }

  // Faire la requête API
  console.log(`🌐 API Request: ${endpoint}`);
  const response = await api.get(endpoint, { params });

  // Sauvegarder dans le cache
  if (useCache) {
    apiCache.set(cacheKey, response.data);
  }

  return response.data;
};

// Intercepteurs (garder ceux existants)
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

api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error);

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 429:
          return Promise.reject(
            new Error(
              "Trop de requêtes. Données en cache utilisées ou veuillez patienter 10 secondes."
            )
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
    return await cachedRequest("/tmdb/search/movie", {
      query,
      language: "fr-FR",
      page,
    });
  },

  // Films populaires (now_playing)
  getPopular: async (page = 1) => {
    return await cachedRequest("/tmdb/movie/now_playing", {
      language: "fr-FR",
      page,
    });
  },

  // DISCOVER - Filtres avancés
  discover: async (filters = {}) => {
    const params = {
      language: "fr-FR",
      sort_by: filters.sortBy || "popularity.desc",
      page: filters.page || 1,
      include_adult: false,
      include_video: false,
      ...filters,
    };

    Object.keys(params).forEach(
      (key) =>
        (params[key] === undefined ||
          params[key] === null ||
          params[key] === "") &&
        delete params[key]
    );

    return await cachedRequest("/tmdb/discover/movie", params);
  },

  // Détails d'un film
  getDetails: async (id) => {
    return await cachedRequest(`/tmdb/movie/${id}`, { language: "fr-FR" });
  },

  // Crédits (casting)
  getCredits: async (id) => {
    return await cachedRequest(`/tmdb/movie/${id}/credits`, {
      language: "fr-FR",
    });
  },

  // Vidéos (bandes-annonces)
  getVideos: async (id) => {
    return await cachedRequest(`/tmdb/movie/${id}/videos`, {
      language: "fr-FR",
    });
  },

  // Films similaires
  getSimilar: async (id) => {
    return await cachedRequest(`/tmdb/movie/${id}/similar`, {
      language: "fr-FR",
    });
  },

  // Fournisseurs de streaming
  getWatchProviders: async (id) => {
    return await cachedRequest(`/tmdb/movie/${id}/watch/providers`);
  },

  // Avis utilisateurs
  getReviews: async (id) => {
    return await cachedRequest(`/tmdb/movie/${id}/reviews`, {
      language: "fr-FR",
    });
  },
};

// ========================================
// API SÉRIES TV
// ========================================

export const tvAPI = {
  search: async (query, page = 1) => {
    return await cachedRequest("/tmdb/search/tv", {
      query,
      language: "fr-FR",
      page,
    });
  },

  getPopular: async (page = 1) => {
    return await cachedRequest("/tmdb/tv/popular", {
      language: "fr-FR",
      page,
    });
  },

  discover: async (filters = {}) => {
    const params = {
      language: "fr-FR",
      sort_by: filters.sortBy || "popularity.desc",
      page: filters.page || 1,
      include_adult: false,
      ...filters,
    };

    Object.keys(params).forEach(
      (key) =>
        (params[key] === undefined ||
          params[key] === null ||
          params[key] === "") &&
        delete params[key]
    );

    return await cachedRequest("/tmdb/discover/tv", params);
  },

  getDetails: async (id) => {
    return await cachedRequest(`/tmdb/tv/${id}`, { language: "fr-FR" });
  },

  getCredits: async (id) => {
    return await cachedRequest(`/tmdb/tv/${id}/credits`, {
      language: "fr-FR",
    });
  },

  getVideos: async (id) => {
    return await cachedRequest(`/tmdb/tv/${id}/videos`, {
      language: "fr-FR",
    });
  },

  getSimilar: async (id) => {
    return await cachedRequest(`/tmdb/tv/${id}/similar`, {
      language: "fr-FR",
    });
  },

  getWatchProviders: async (id) => {
    return await cachedRequest(`/tmdb/tv/${id}/watch/providers`);
  },

  getSeasonDetails: async (tvId, seasonNumber) => {
    return await cachedRequest(`/tmdb/tv/${tvId}/season/${seasonNumber}`, {
      language: "fr-FR",
    });
  },

  getReviews: async (id) => {
    return await cachedRequest(`/tmdb/tv/${id}/reviews`, {
      language: "fr-FR",
    });
  },
};

// ========================================
// API PERSONNES
// ========================================

export const personAPI = {
  getDetails: async (id) => {
    return await cachedRequest(`/tmdb/person/${id}`, { language: "fr-FR" });
  },

  getMovieCredits: async (id) => {
    return await cachedRequest(`/tmdb/person/${id}/movie_credits`, {
      language: "fr-FR",
    });
  },
};

export default api;
