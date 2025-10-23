// src/components/Form.jsx - VERSION OPTIMISÉE
import React, { useState, useEffect, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { movieAPI } from "../services/api";
import Card from "./Card";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import GenreFilter from "./GenreFilter";
import AdvancedFilters from "./AdvancedFilters";

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
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [useDiscover, setUseDiscover] = useState(false);

  // DEBOUNCE AUGMENTÉ À 800ms pour réduire les requêtes
  const debouncedSearch = useDebounce(search, 800);

  // Fonction pour charger les films avec Discover
  const fetchDiscoverMovies = useCallback(
    async (pageNum = 1, filters = {}) => {
      setLoading(true);
      setError(null);

      try {
        const discoverFilters = {
          page: pageNum,
          sort_by: filters.sort_by || "popularity.desc",
          ...filters,
        };

        if (selectedGenre) {
          discoverFilters.with_genres = selectedGenre;
        }

        if (minRating > 0) {
          discoverFilters["vote_average.gte"] = minRating;
        }

        const data = await movieAPI.discover(discoverFilters);

        if (pageNum === 1) {
          setMoviesData(data.results);
        } else {
          setMoviesData((prev) => [...prev, ...data.results]);
        }

        setHasMore(pageNum < data.total_pages);
      } catch (err) {
        console.error("Error fetching discover movies:", err);
        setError(
          err.message || "Impossible de charger les films. Veuillez réessayer."
        );
      } finally {
        setLoading(false);
      }
    },
    [selectedGenre, minRating]
  );

  // Fonction pour charger les films populaires
  const fetchPopularMovies = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError(null);

    try {
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

  // Fonction pour rechercher des films
  const fetchMovies = useCallback(
    async (searchTerm, pageNum = 1) => {
      if (!searchTerm.trim()) {
        if (useDiscover || Object.keys(advancedFilters).length > 0) {
          fetchDiscoverMovies(pageNum, advancedFilters);
        } else {
          fetchPopularMovies(pageNum);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
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
    [fetchPopularMovies, fetchDiscoverMovies, advancedFilters, useDiscover]
  );

  // Charger les films au montage (OPTIMISÉ - évite les appels redondants)
  useEffect(() => {
    // Ne charger que si aucun film n'est présent
    if (moviesData.length > 0) return;

    if (useDiscover || Object.keys(advancedFilters).length > 0) {
      fetchDiscoverMovies(1, advancedFilters);
    } else {
      fetchPopularMovies(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPopularMovies, fetchDiscoverMovies, advancedFilters, useDiscover]);

  // Réagir aux changements de recherche
  useEffect(() => {
    setPage(1);
    fetchMovies(debouncedSearch, 1);
  }, [debouncedSearch, fetchMovies]);

  // Gérer les changements de filtres avancés
  const handleAdvancedFiltersChange = (filters) => {
    setAdvancedFilters(filters);
    setUseDiscover(true);
    setPage(1);
    setSearch("");
  };

  // Charger plus de films
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (debouncedSearch.trim()) {
      fetchMovies(debouncedSearch, nextPage);
    } else if (useDiscover || Object.keys(advancedFilters).length > 0) {
      fetchDiscoverMovies(nextPage, advancedFilters);
    } else {
      fetchPopularMovies(nextPage);
    }
  };

  // Filtrer et trier les films localement
  const filteredMovies = moviesData
    .filter((movie) => {
      if (useDiscover) return true;

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
            onChange={(e) => {
              setSearch(e.target.value);
              setUseDiscover(false);
            }}
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
            onGenreChange={(genre) => {
              setSelectedGenre(genre);
              setPage(1);
            }}
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
              onChange={(e) => {
                setMinRating(Number(e.target.value));
                setPage(1);
              }}
              aria-label="Note minimale"
            />
          </div>
        </div>
      </div>

      <AdvancedFilters
        onFilterChange={handleAdvancedFiltersChange}
        initialFilters={advancedFilters}
      />

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
