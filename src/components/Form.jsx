// src/components/Form.jsx - VERSION MISE À JOUR
import React, { useState, useEffect, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { movieAPI } from "../services/api"; // 👈 Import du service API
import Card from "./Card";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import GenreFilter from "./GenreFilter";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortGoodBad, setSortGoodBad] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearch = useDebounce(search, 500);

  // ✅ Fonction pour charger les films populaires
  const fetchPopularMovies = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError(null);

    try {
      // 👇 Utilisation du service API au lieu d'axios direct
      const data = await movieAPI.getPopular(pageNum);

      if (pageNum === 1) {
        setMoviesData(data.results);
      } else {
        setMoviesData((prev) => [...prev, ...data.results]);
      }

      setHasMore(pageNum < data.total_pages);
    } catch (err) {
      console.error("Error fetching popular movies:", err);
      setError(
        err.message || "Impossible de charger les films. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fonction pour rechercher des films
  const fetchMovies = useCallback(
    async (searchTerm, pageNum = 1) => {
      if (!searchTerm.trim()) {
        fetchPopularMovies(pageNum);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // 👇 Utilisation du service API
        const data = await movieAPI.search(searchTerm, pageNum);

        if (pageNum === 1) {
          setMoviesData(data.results);
        } else {
          setMoviesData((prev) => [...prev, ...data.results]);
        }

        setHasMore(pageNum < data.total_pages);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError(
          err.message || "Impossible de charger les films. Veuillez réessayer."
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchPopularMovies]
  );

  // Charger les films populaires au montage
  useEffect(() => {
    fetchPopularMovies(1);
  }, [fetchPopularMovies]);

  useEffect(() => {
    setPage(1);
    fetchMovies(debouncedSearch, 1);
  }, [debouncedSearch, fetchMovies]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (debouncedSearch.trim()) {
      fetchMovies(debouncedSearch, nextPage);
    } else {
      fetchPopularMovies(nextPage);
    }
  };

  const filteredMovies = moviesData
    .filter((movie) => {
      if (selectedGenre && !movie.genre_ids?.includes(selectedGenre)) {
        return false;
      }
      if (movie.vote_average < minRating) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortGoodBad === "goodToBad") {
        return b.vote_average - a.vote_average;
      } else if (sortGoodBad === "badToGood") {
        return a.vote_average - b.vote_average;
      }
      return 0;
    });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-component">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Rechercher un film"
          />
        </form>

        <div className="filters-container">
          <div className="btn-sort-container">
            <button
              className={`btn-sort ${
                sortGoodBad === "goodToBad" ? "active" : ""
              }`}
              id="goodToBad"
              onClick={() => setSortGoodBad("goodToBad")}
              aria-label="Trier du meilleur au pire"
            >
              Top<span>➜</span>
            </button>
            <button
              className={`btn-sort ${
                sortGoodBad === "badToGood" ? "active" : ""
              }`}
              id="badToGood"
              onClick={() => setSortGoodBad("badToGood")}
              aria-label="Trier du pire au meilleur"
            >
              Flop<span>➜</span>
            </button>
          </div>

          <GenreFilter
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />

          <div className="rating-filter">
            <label htmlFor="min-rating">Note min : {minRating}</label>
            <input
              type="range"
              id="min-rating"
              min="0"
              max="10"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              aria-label="Note minimale"
            />
          </div>
        </div>
      </div>

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => fetchMovies(debouncedSearch, 1)}
        />
      )}

      {loading && page === 1 ? (
        <Loading />
      ) : filteredMovies.length === 0 && !loading ? (
        <EmptyState
          icon="🔍"
          title="Aucun film trouvé"
          message="Essayez une autre recherche ou modifiez vos filtres"
        />
      ) : (
        <>
          <div className="result">
            {filteredMovies.map((movie) => (
              <Card movie={movie} key={movie.id} />
            ))}
          </div>

          {hasMore && filteredMovies.length > 0 && (
            <div className="load-more-container">
              <button
                className="btn-load-more"
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? "Chargement..." : "Charger plus"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Form;
