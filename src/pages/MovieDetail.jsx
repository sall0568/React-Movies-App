// src/pages/MovieDetail.jsx - VERSION AVEC AVIS COMPLETS
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieAPI } from "../services/api";
import Header from "../components/Header";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import WatchProviders from "../components/WatchProviders";
import ReviewsSection from "../components/Reviewssection";
import { useFavorites } from "../contexts/FavoritesContext";
import Footer from "../components/Footer";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [watchProviders, setWatchProviders] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isMovieFavorite, toggleMovieFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const [
          movieData,
          creditsData,
          videosData,
          similarData,
          providersData,
          reviewsData,
        ] = await Promise.all([
          movieAPI.getDetails(id),
          movieAPI.getCredits(id),
          movieAPI.getVideos(id),
          movieAPI.getSimilar(id),
          movieAPI.getWatchProviders(id),
          movieAPI.getReviews(id),
        ]);

        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videosData.results);
        setSimilar(similarData.results.slice(0, 6));
        setWatchProviders(providersData.results.FR || null);
        setReviews(reviewsData.results);
        setTotalReviews(
          reviewsData.total_results || reviewsData.results.length
        );
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err.message || "Impossible de charger les détails du film.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const dateFormater = (date) => {
    if (!date) return "";
    const [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <ErrorMessage
          message={error}
          onRetry={() => window.location.reload()}
        />
      </>
    );
  }

  if (!movie) return null;

  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  const isFav = isMovieFavorite(movie.id);

  return (
    <div className="movie-detail-page">
      <Header />

      <button className="btn-back-fixed" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="movie-detail-container">
        <div className="movie-backdrop">
          {movie.backdrop_path && (
            <img
              src={`${
                process.env.REACT_APP_TMDB_IMAGE_BASE_URL ||
                "https://image.tmdb.org/t/p/original"
              }${movie.backdrop_path}`}
              alt={movie.title}
            />
          )}
          <div className="backdrop-overlay"></div>
        </div>

        <div className="movie-content">
          <div className="movie-poster">
            <img
              src={
                movie.poster_path
                  ? `${
                      process.env.REACT_APP_TMDB_IMAGE_BASE_URL ||
                      "https://image.tmdb.org/t/p/original"
                    }${movie.poster_path}`
                  : "./img/poster.jpg"
              }
              alt={movie.title}
            />
          </div>

          <div className="movie-info">
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}

            <div className="movie-meta">
              <span className="rating">
                ⭐ {movie.vote_average.toFixed(1)}/10
              </span>
              {movie.release_date && (
                <span>📅 {dateFormater(movie.release_date)}</span>
              )}
              {movie.runtime && <span>⏱️ {formatRuntime(movie.runtime)}</span>}
            </div>

            <div className="genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-badge">
                  {genre.name}
                </span>
              ))}
            </div>

            <button
              className={`btn-favorite ${isFav ? "active" : ""}`}
              onClick={() => toggleMovieFavorite(movie.id)}
            >
              {isFav ? "💔 Retirer des favoris" : "💖 Ajouter aux favoris"}
            </button>

            <div className="overview">
              <h2>Synopsis</h2>
              <p>{movie.overview || "Pas de synopsis disponible"}</p>
            </div>

            <WatchProviders providers={watchProviders} />

            {/* 🆕 Section Avis Complète */}
            <ReviewsSection reviews={reviews} totalReviews={totalReviews} />

            {credits && credits.cast.length > 0 && (
              <div className="cast">
                <h2>Casting principal</h2>
                <div className="cast-list">
                  {credits.cast.slice(0, 6).map((actor) => (
                    <div
                      key={actor.id}
                      className="cast-member"
                      onClick={() => navigate(`/person/${actor.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                        />
                      ) : (
                        <div className="no-photo">👤</div>
                      )}
                      <p className="actor-name">{actor.name}</p>
                      <p className="character-name">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {trailer && (
              <div className="trailer">
                <h2>Bande-annonce</h2>
                <div className="video-container">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {similar.length > 0 && (
              <div className="similar-movies">
                <h2>Films similaires</h2>
                <div className="similar-grid">
                  {similar.map((movie) => (
                    <div
                      key={movie.id}
                      className="similar-card"
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                            : "./img/poster.jpg"
                        }
                        alt={movie.title}
                      />
                      <p>{movie.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetail;
