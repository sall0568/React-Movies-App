// src/pages/LikePage.jsx - AVEC SCROLL TO TOP
import React, { useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import TVCard from "../components/TVCard";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import ScrollToTop from "../components/ScrollToTop";
import { useFavorites } from "../contexts/FavoritesContext";
import Footer from "../components/Footer";

const LikePage = () => {
  const {
    favoriteMovies,
    favoriteTVShows,
    loadingMovies,
    loadingTV,
    isInitialized,
  } = useFavorites();

  const [sortBy, setSortBy] = useState("date");
  const [activeTab, setActiveTab] = useState("all");

  const sortItems = (items) => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.vote_average - a.vote_average;
        case "title":
          const titleA = a.title || a.name;
          const titleB = b.title || b.name;
          return titleA.localeCompare(titleB);
        case "date":
        default:
          const dateA = a.release_date || a.first_air_date;
          const dateB = b.release_date || b.first_air_date;
          return new Date(dateB) - new Date(dateA);
      }
    });
  };

  const sortedMovies = sortItems(favoriteMovies);
  const sortedTVShows = sortItems(favoriteTVShows);

  const totalFavorites = favoriteMovies.length + favoriteTVShows.length;
  const loading = loadingMovies || loadingTV;
  const showLoading = !isInitialized && loading;

  return (
    <div className="user-list-page">
      <Header />
      <div className="page-header">
        <h2>
          Coups de coeur <span>💖</span>
        </h2>
        {totalFavorites > 0 && (
          <div className="header-controls">
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
          </div>
        )}
      </div>

      {totalFavorites > 0 && (
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            Tout ({totalFavorites})
          </button>
          <button
            className={`tab-btn ${activeTab === "movies" ? "active" : ""}`}
            onClick={() => setActiveTab("movies")}
          >
            Films ({favoriteMovies.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "tv" ? "active" : ""}`}
            onClick={() => setActiveTab("tv")}
          >
            Séries ({favoriteTVShows.length})
          </button>
        </div>
      )}

      {showLoading ? (
        <Loading />
      ) : totalFavorites === 0 ? (
        <EmptyState
          icon="💔"
          title="Aucun coup de cœur"
          message="Commencez à ajouter vos films et séries préférés pour les retrouver ici"
        />
      ) : (
        <>
          {(activeTab === "all" || activeTab === "movies") &&
            favoriteMovies.length > 0 && (
              <div className="favorites-section">
                {activeTab === "all" && (
                  <h3 className="section-title">
                    Films ({favoriteMovies.length})
                  </h3>
                )}
                <div className="result">
                  {sortedMovies.map((movie) => (
                    <Card movie={movie} key={movie.id} />
                  ))}
                </div>
              </div>
            )}

          {(activeTab === "all" || activeTab === "tv") &&
            favoriteTVShows.length > 0 && (
              <div className="favorites-section">
                {activeTab === "all" && (
                  <h3 className="section-title">
                    Séries ({favoriteTVShows.length})
                  </h3>
                )}
                <div className="result">
                  {sortedTVShows.map((show) => (
                    <TVCard show={show} key={show.id} />
                  ))}
                </div>
              </div>
            )}
        </>
      )}
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LikePage;
