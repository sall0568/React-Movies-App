import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useLocalStorage("movieFavorites", []);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Charger les détails des films favoris
  useEffect(() => {
    const fetchFavorites = async () => {
      if (favoriteIds.length === 0) {
        setFavoriteMovies([]);
        return;
      }

      setLoading(true);
      try {
        const promises = favoriteIds.map((id) =>
          axios.get(
            `${process.env.REACT_APP_TMDB_BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`
          )
        );
        const responses = await Promise.all(promises);
        setFavoriteMovies(responses.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favoriteIds]);

  const addFavorite = (movieId) => {
    if (!favoriteIds.includes(movieId)) {
      setFavoriteIds([...favoriteIds, movieId]);
    }
  };

  const removeFavorite = (movieId) => {
    setFavoriteIds(favoriteIds.filter((id) => id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favoriteIds.includes(movieId);
  };

  const toggleFavorite = (movieId) => {
    if (isFavorite(movieId)) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }
  };

  const value = {
    favoriteIds,
    favoriteMovies,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
