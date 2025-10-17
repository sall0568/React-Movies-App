// src/contexts/FavoritesContext.js - VERSION MISE À JOUR
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { movieAPI, tvAPI } from "../services/api"; // 👈 Import du service

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  // Favoris films
  const [favoriteMovieIds, setFavoriteMovieIds] = useLocalStorage(
    "movieFavorites",
    []
  );
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(false);

  // Favoris séries
  const [favoriteTVIds, setFavoriteTVIds] = useLocalStorage("tvFavorites", []);
  const [favoriteTVShows, setFavoriteTVShows] = useState([]);
  const [loadingTV, setLoadingTV] = useState(false);

  // ✅ Charger les détails des films favoris
  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (favoriteMovieIds.length === 0) {
        setFavoriteMovies([]);
        return;
      }

      setLoadingMovies(true);

      try {
        // 👇 Utilisation du service API
        const promises = favoriteMovieIds.map((id) => movieAPI.getDetails(id));
        const movies = await Promise.all(promises);
        setFavoriteMovies(movies);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      } finally {
        setLoadingMovies(false);
      }
    };

    fetchFavoriteMovies();
  }, [favoriteMovieIds]);

  // ✅ Charger les détails des séries favorites
  useEffect(() => {
    const fetchFavoriteTVShows = async () => {
      if (favoriteTVIds.length === 0) {
        setFavoriteTVShows([]);
        return;
      }

      setLoadingTV(true);

      try {
        // 👇 Utilisation du service API
        const promises = favoriteTVIds.map((id) => tvAPI.getDetails(id));
        const shows = await Promise.all(promises);
        setFavoriteTVShows(shows);
      } catch (error) {
        console.error("Error fetching favorite TV shows:", error);
      } finally {
        setLoadingTV(false);
      }
    };

    fetchFavoriteTVShows();
  }, [favoriteTVIds]);

  // Fonctions pour les films
  const addMovieFavorite = (movieId) => {
    if (!favoriteMovieIds.includes(movieId)) {
      setFavoriteMovieIds([...favoriteMovieIds, movieId]);
    }
  };

  const removeMovieFavorite = (movieId) => {
    setFavoriteMovieIds(favoriteMovieIds.filter((id) => id !== movieId));
  };

  const isMovieFavorite = (movieId) => {
    return favoriteMovieIds.includes(movieId);
  };

  const toggleMovieFavorite = (movieId) => {
    if (isMovieFavorite(movieId)) {
      removeMovieFavorite(movieId);
    } else {
      addMovieFavorite(movieId);
    }
  };

  // Fonctions pour les séries
  const addTVFavorite = (tvId) => {
    if (!favoriteTVIds.includes(tvId)) {
      setFavoriteTVIds([...favoriteTVIds, tvId]);
    }
  };

  const removeTVFavorite = (tvId) => {
    setFavoriteTVIds(favoriteTVIds.filter((id) => id !== tvId));
  };

  const isTVFavorite = (tvId) => {
    return favoriteTVIds.includes(tvId);
  };

  const toggleTVFavorite = (tvId) => {
    if (isTVFavorite(tvId)) {
      removeTVFavorite(tvId);
    } else {
      addTVFavorite(tvId);
    }
  };

  // Compteurs totaux
  const totalFavorites = favoriteMovieIds.length + favoriteTVIds.length;

  const value = {
    // Films
    favoriteMovieIds,
    favoriteMovies,
    loadingMovies,
    addMovieFavorite,
    removeMovieFavorite,
    isMovieFavorite,
    toggleMovieFavorite,

    // Séries
    favoriteTVIds,
    favoriteTVShows,
    loadingTV,
    addTVFavorite,
    removeTVFavorite,
    isTVFavorite,
    toggleTVFavorite,

    // Global
    totalFavorites,

    // Backward compatibility
    favoriteIds: [...favoriteMovieIds, ...favoriteTVIds],
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
