// src/components/TVForm.jsx - VERSION OPTIMISÉE
import React, { useState, useEffect, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { tvAPI } from "../services/api";
import TVCard from "./TVCard";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import AdvancedFiltersTVShows from "./AdvancedFiltersTVShows";

const TVForm = () => {
  const [tvData, setTvData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortGoodBad, setSortGoodBad] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [useDiscover, setUseDiscover] = useState(false);

  // DEBOUNCE AUGMENTÉ À 800ms
  const debouncedSearch = useDebounce(search, 800);

  // Fonction pour charger les séries avec Discover
  const fetchDiscoverTV = useCallback(
    async (pageNum = 1, filters = {}) => {
      setLoading(true);
      setError(null);

      try {
        const discoverFilters = {
          page: pageNum,
          sort_by: filters.sort_by || "popularity.desc",
          ...filters,
        };

        if (minRating > 0) {
          discoverFilters["vote_average.gte"] = minRating;
        }

        const data = await tvAPI.discover(discoverFilters);

        if (pageNum === 1) {
          setTvData(data.results);
        } else {
          setTvData((prev) => [...prev, ...data.results]);
        }

        setHasMore(pageNum < data.total_pages);
      } catch (err) {
        console.error("Error fetching discover TV shows:", err);
        setError(
          err.message || "Impossible de charger les séries. Veuillez réessayer."
        );
      } finally {
        setLoading(false);
      }
    },
    [minRating]
  );

  // Fonction pour charger les séries populaires
  const fetchPopularTV = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError(null);

    try {
      const data = await tvAPI.getPopular(pageNum);

      if (pageNum === 1) {
        setTvData(data.results);
      } else {
        setTvData((prev) => [...prev, ...data.results]);
      }

      setHasMore(pageNum < data.total_pages);
    } catch (err) {
      console.error("Error fetching popular TV shows:", err);
      setError(
        err.message || "Impossible de charger les séries. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction pour rechercher des séries
  const fetchTV = useCallback(
    async (searchTerm, pageNum = 1) => {
      if (!searchTerm.trim()) {
        if (useDiscover || Object.keys(advancedFilters).length > 0) {
          fetchDiscoverTV(pageNum, advancedFilters);
        } else {
          fetchPopularTV(pageNum);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await tvAPI.search(searchTerm, pageNum);

        if (pageNum === 1) {
          setTvData(data.results);
        } else {
          setTvData((prev) => [...prev, ...data.results]);
        }

        setHasMore(pageNum < data.total_pages);
      } catch (err) {
        console.error("Error fetching TV shows:", err);
        setError(
          err.message || "Impossible de charger les séries. Veuillez réessayer."
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchPopularTV, fetchDiscoverTV, advancedFilters, useDiscover]
  );

  // Charger les séries au montage (OPTIMISÉ)
  useEffect(() => {
    // Éviter les appels redondants
    if (tvData.length > 0) return;

    if (useDiscover || Object.keys(advancedFilters).length > 0) {
      fetchDiscoverTV(1, advancedFilters);
    } else {
      fetchPopularTV(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPopularTV, fetchDiscoverTV, advancedFilters, useDiscover]);

  // Réagir aux changements de recherche
  useEffect(() => {
    setPage(1);
    fetchTV(debouncedSearch, 1);
  }, [debouncedSearch, fetchTV]);

  // Gérer les changements de filtres avancés
  const handleAdvancedFiltersChange = (filters) => {
    setAdvancedFilters(filters);
    setUseDiscover(true);
    setPage(1);
    setSearch("");
  };

  // Charger plus de séries
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (debouncedSearch.trim()) {
      fetchTV(debouncedSearch, nextPage);
    } else if (useDiscover || Object.keys(advancedFilters).length > 0) {
      fetchDiscoverTV(nextPage, advancedFilters);
    } else {
      fetchPopularTV(nextPage);
    }
  };

  // Filtrer et trier les séries localement
  const filteredTV = tvData
    .filter((show) => {
      if (useDiscover) return true;

      if (show.vote_average < minRating) {
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
            placeholder="Rechercher une série..."
            id="search-input"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setUseDiscover(false);
            }}
            aria-label="Rechercher une série"
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

          <div className="rating-filter">
            <label htmlFor="min-rating-tv">Note min : {minRating}</label>
            <input
              type="range"
              id="min-rating-tv"
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

      <AdvancedFiltersTVShows
        onFilterChange={handleAdvancedFiltersChange}
        initialFilters={advancedFilters}
      />

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => fetchTV(debouncedSearch, 1)}
        />
      )}

      {loading && page === 1 ? (
        <Loading />
      ) : filteredTV.length === 0 && !loading && search.trim() !== "" ? (
        <EmptyState
          icon="🔍"
          title="Aucune série trouvée"
          message="Essayez une autre recherche ou modifiez vos filtres"
        />
      ) : (
        <>
          <div className="result">
            {filteredTV.map((show) => (
              <TVCard show={show} key={show.id} />
            ))}
          </div>

          {hasMore && filteredTV.length > 0 && (
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

export default TVForm;
