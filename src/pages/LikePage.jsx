import React, { useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { useFavorites } from "../contexts/FavoritesContext";

const LikePage = () => {
  const { favoriteMovies, loading } = useFavorites();
  const [sortBy, setSortBy] = useState("date");

  const sortedMovies = [...favoriteMovies].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.vote_average - a.vote_average;
      case "title":
        return a.title.localeCompare(b.title);
      case "date":
        return new Date(b.release_date) - new Date(a.release_date);
      default:
        return 0;
    }
  });

  return (
    <div className="user-list-page">
      <Header />
      <div className="page-header">
        <h2>
          Coups de coeur <span>💖</span>
        </h2>
        {favoriteMovies.length > 0 && (
          <div className="sort-options">
            <label htmlFor="sort-favorites">Trier par :</label>
            <select
              id="sort-favorites"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Date d'ajout</option>
              <option value="rating">Note</option>
              <option value="title">Titre</option>
            </select>
          </div>
        )}
      </div>

      {loading ? (
        <Loading />
      ) : favoriteMovies.length > 0 ? (
        <div className="result">
          {sortedMovies.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="💔"
          title="Aucun coup de cœur"
          message="Commencez à ajouter vos films préférés pour les retrouver ici"
        />
      )}
    </div>
  );
};

export default LikePage;