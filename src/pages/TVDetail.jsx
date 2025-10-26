// src/pages/TVDetail.jsx - VERSION MISE À JOUR avec avis complets
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tvAPI } from "../services/api";
import Header from "../components/Header";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import WatchProviders from "../components/WatchProviders";
import ReviewsSection from "../components/SectionReviews.jsx";
import Season from "../components/Season";
import { useFavorites } from "../contexts/FavoritesContext";
import Footer from "../components/Footer";
import StructuredData, {
  generateTVSeriesSchema,
  generateBreadcrumbSchema,
} from "../components/StructuredData";
import Breadcrumbs from "../components/Breadcrumbs";
import { useSlugRedirect } from "../utils/seo";

function TVDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isTVFavorite, toggleTVFavorite } = useFavorites();
  const [show, setShow] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [watchProviders, setWatchProviders] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const movieSchema = generateTVSeriesSchema(movie);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Accueil", url: "https://moviereverse.netlify.app/" },
    { name: "Films", url: "https://moviereverse.netlify.app/" },
    { name: movie.title, url: window.location.href },
  ]);

  useSlugRedirect(movie?.id, movie?.title, "/movie");

  useEffect(() => {
    const fetchTVDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const [
          showData,
          creditsData,
          videosData,
          similarData,
          providersData,
          reviewsData,
        ] = await Promise.all([
          tvAPI.getDetails(id),
          tvAPI.getCredits(id),
          tvAPI.getVideos(id),
          tvAPI.getSimilar(id),
          tvAPI.getWatchProviders(id),
          tvAPI.getReviews(id),
        ]);

        setShow(showData);
        setCredits(creditsData);
        setVideos(videosData.results);
        setSimilar(similarData.results.slice(0, 6));
        setWatchProviders(providersData.results.FR || null);
        setReviews(reviewsData.results);
        setTotalReviews(
          reviewsData.total_results || reviewsData.results.length
        );
      } catch (err) {
        console.error("Error fetching TV details:", err);
        setError(
          err.message || "Impossible de charger les détails de la série."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTVDetails();
  }, [id]);

  const dateFormater = (date) => {
    if (!date) return "";
    const [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  const handleSeasonClick = (seasonNumber) => {
    navigate(`/tv/${id}/season/${seasonNumber}`);
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

  if (!show) return null;

  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  const isFav = isTVFavorite(parseInt(id));

  return (
    <>
      <StructuredData data={movieSchema} />
      <StructuredData data={breadcrumbSchema} />
      <SEOHelmet
        title={movie.title}
        description={movie.overview?.substring(0, 160)}
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        url={window.location.href}
      />
      <Header />
      <Breadcrumbs
        items={[{ name: "Films", url: "/" }, { name: movie.title }]}
      />
      <div className="tv-detail-page">
        <Header />

        <button className="btn-back-fixed" onClick={() => navigate(-1)}>
          ← Retour
        </button>

        <div className="tv-detail-container">
          <div className="tv-backdrop">
            {show.backdrop_path && (
              <img
                src={`${
                  process.env.REACT_APP_TMDB_IMAGE_BASE_URL ||
                  "https://image.tmdb.org/t/p/original"
                }${show.backdrop_path}`}
                alt={show.name}
              />
            )}
            <div className="backdrop-overlay"></div>
          </div>

          <div className="tv-content">
            <div className="tv-poster">
              <img
                src={
                  show.poster_path
                    ? `${
                        process.env.REACT_APP_TMDB_IMAGE_BASE_URL ||
                        "https://image.tmdb.org/t/p/original"
                      }${show.poster_path}`
                    : "./img/poster.jpg"
                }
                alt={show.name}
              />
            </div>

            <div className="tv-info">
              <h1>{show.name}</h1>
              {show.tagline && <p className="tagline">"{show.tagline}"</p>}

              <div className="tv-meta">
                <span className="rating">
                  ⭐ {show.vote_average.toFixed(1)}/10
                </span>
                {show.first_air_date && (
                  <span>📅 {dateFormater(show.first_air_date)}</span>
                )}
                {show.number_of_seasons && (
                  <span>
                    📺 {show.number_of_seasons} saison
                    {show.number_of_seasons > 1 ? "s" : ""}
                  </span>
                )}
                {show.number_of_episodes && (
                  <span>🎬 {show.number_of_episodes} épisodes</span>
                )}
              </div>

              <div className="genres">
                {show.genres &&
                  show.genres.map((genre) => (
                    <span key={genre.id} className="genre-badge">
                      {genre.name}
                    </span>
                  ))}
              </div>

              <button
                className={`btn-favorite ${isFav ? "active" : ""}`}
                onClick={() => toggleTVFavorite(parseInt(id))}
              >
                {isFav ? "💔 Retirer des favoris" : "💖 Ajouter aux favoris"}
              </button>

              <div className="overview">
                <h2>Synopsis</h2>
                <p>{show.overview || "Pas de synopsis disponible"}</p>
              </div>

              <WatchProviders providers={watchProviders} />

              {/* 🆕 Section Avis Complète pour les séries */}
              <ReviewsSection reviews={reviews} totalReviews={totalReviews} />

              {/* Section Saisons */}
              {show.seasons && show.seasons.length > 0 && (
                <div className="seasons-section">
                  <h2>Saisons ({show.number_of_seasons})</h2>
                  <div className="seasons-list">
                    {show.seasons
                      .filter((season) => season.season_number >= 0)
                      .map((season) => (
                        <Season
                          key={season.id}
                          season={season}
                          showId={show.id}
                          onEpisodeClick={handleSeasonClick}
                        />
                      ))}
                  </div>
                </div>
              )}

              {show.created_by && show.created_by.length > 0 && (
                <div className="creators">
                  <h2>Créé par</h2>
                  <div className="creators-list">
                    {show.created_by.map((creator) => (
                      <div key={creator.id} className="creator-item">
                        {creator.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${creator.profile_path}`}
                            alt={creator.name}
                          />
                        ) : (
                          <div className="no-photo">👤</div>
                        )}
                        <p>{creator.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                <div className="similar-shows">
                  <h2>Séries similaires</h2>
                  <div className="similar-grid">
                    {similar.map((tvShow) => (
                      <div
                        key={tvShow.id}
                        className="similar-card"
                        onClick={() => navigate(`/tv/${tvShow.id}`)}
                      >
                        <img
                          src={
                            tvShow.poster_path
                              ? `https://image.tmdb.org/t/p/w200${tvShow.poster_path}`
                              : "./img/poster.jpg"
                          }
                          alt={tvShow.name}
                        />
                        <p>{tvShow.name}</p>
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
    </>
  );
}

export default TVDetail;
