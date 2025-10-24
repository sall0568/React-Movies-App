// src/contexts/FavoritesContext.js - VERSION CORRIGÉE
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { movieAPI, tvAPI } from "../services/api";

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

  // ✅ CORRECTION : Charger immédiatement au montage
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ Charger les détails des films favoris
  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (favoriteMovieIds.length === 0) {
        setFavoriteMovies([]);
        setIsInitialized(true);
        return;
      }

      setLoadingMovies(true);

      try {
        console.log(
          `🎬 Chargement de ${favoriteMovieIds.length} films favoris...`
        );
        const promises = favoriteMovieIds.map((id) =>
          movieAPI.getDetails(id).catch((err) => {
            console.error(`Erreur film ${id}:`, err);
            return null;
          })
        );
        const movies = await Promise.all(promises);
        // Filtrer les films null (erreurs)
        const validMovies = movies.filter((m) => m !== null);
        setFavoriteMovies(validMovies);
        console.log(`✅ ${validMovies.length} films favoris chargés`);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      } finally {
        setLoadingMovies(false);
        setIsInitialized(true);
      }
    };

    fetchFavoriteMovies();
  }, [favoriteMovieIds]); // ✅ Se déclenche à chaque changement

  // ✅ Charger les détails des séries favorites
  useEffect(() => {
    const fetchFavoriteTVShows = async () => {
      if (favoriteTVIds.length === 0) {
        setFavoriteTVShows([]);
        return;
      }

      setLoadingTV(true);

      try {
        console.log(
          `📺 Chargement de ${favoriteTVIds.length} séries favorites...`
        );
        const promises = favoriteTVIds.map((id) =>
          tvAPI.getDetails(id).catch((err) => {
            console.error(`Erreur série ${id}:`, err);
            return null;
          })
        );
        const shows = await Promise.all(promises);
        // Filtrer les séries null (erreurs)
        const validShows = shows.filter((s) => s !== null);
        setFavoriteTVShows(validShows);
        console.log(`✅ ${validShows.length} séries favorites chargées`);
      } catch (error) {
        console.error("Error fetching favorite TV shows:", error);
      } finally {
        setLoadingTV(false);
      }
    };

    fetchFavoriteTVShows();
  }, [favoriteTVIds]); // ✅ Se déclenche à chaque changement

  // Fonctions pour les films
  const addMovieFavorite = (movieId) => {
    if (!favoriteMovieIds.includes(movieId)) {
      console.log(`💖 Ajout du film ${movieId} aux favoris`);
      setFavoriteMovieIds([...favoriteMovieIds, movieId]);
    }
  };

  const removeMovieFavorite = (movieId) => {
    console.log(`💔 Retrait du film ${movieId} des favoris`);
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
      console.log(`💖 Ajout de la série ${tvId} aux favoris`);
      setFavoriteTVIds([...favoriteTVIds, tvId]);
    }
  };

  const removeTVFavorite = (tvId) => {
    console.log(`💔 Retrait de la série ${tvId} des favoris`);
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
    isInitialized, // ✅ Nouveau : indique si le chargement initial est terminé

    // Backward compatibility
    favoriteIds: [...favoriteMovieIds, ...favoriteTVIds],
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
