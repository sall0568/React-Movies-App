import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";
import TVCard from "./TVCard";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import EmptyState from "./EmptyState";
import GenreFilter from "./GenreFilter";

const TVForm = () => {
  const [tvData, setTvData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortGoodBad, setSortGoodBad] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearch = useDebounce(search, 500);

  const fetchPopularTV = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError(null);

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'ed82f4c18f2964e75117c2dc65e2161d';
    const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

    try {
      const response = await axios.get(
        `${BASE_URL}/tv/popular`,
        {
          params: {
            api_key: API_KEY,
            language: "fr-FR",
            page: pageNum,
          },
        }
      );

      if (pageNum === 1) {
        setTvData(response.data.results);
      } else {
        setTvData((prev) => [...prev, ...response.data.results]);
      }

      setHasMore(pageNum < response.data.total_pages);
    } catch (err) {
      console.error("Error fetching popular TV shows:", err);
      setError("Impossible de charger les séries. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTV = useCallback(async (searchTerm, pageNum = 1) => {
    if (!searchTerm.trim()) {
      fetchPopularTV(pageNum);
      return;
    }

    setLoading(true);
    setError(null);

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'ed82f4c18f2964e75117c2dc65e2161d';
    const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

    try {
      const response = await axios.get(
        `${BASE_URL}/search/tv`,
        {
          params: {
            api_key: API_KEY,
            query: searchTerm,
            language: "fr-FR",
            page: pageNum,
          },
        }
      );

      if (pageNum === 1) {
        setTvData(response.data.results);
      } else {
        setTvData((prev) => [...prev, ...response.data.results]);
      }

      setHasMore(pageNum < response.data.total_pages);
    } catch (err) {
      console.error("Error fetching TV shows:", err);
      setError("Impossible de charger les séries. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }, [fetchPopularTV]);

  useEffect(() => {
    fetchPopularTV(1);
  }, [fetchPopularTV]);

  useEffect(() => {
    setPage(1);
    fetchTV(debouncedSearch, 1);
  }, [debouncedSearch, fetchTV]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (debouncedSearch.trim()) {
      fetchTV(debouncedSearch, nextPage);
    } else {
      fetchPopularTV(nextPage);
    }
  };

  const filteredTV = tvData
    .filter((show) => {
      if (selectedGenre && !show.genre_ids.includes(selectedGenre)) {
        return false;
      }
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
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Rechercher une série"
          />
        </form>

        <div className="filters-container">
          <div className="btn-sort-container">
            <button
              className={`btn-sort ${sortGoodBad === "goodToBad" ? "active" : ""}`}
              id="goodToBad"
              onClick={() => setSortGoodBad("goodToBad")}
              aria-label="Trier du meilleur au pire"
            >
              Top<span>➜</span>
            </button>
            <button
              className={`btn-sort ${sortGoodBad === "badToGood" ? "active" : ""}`}
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