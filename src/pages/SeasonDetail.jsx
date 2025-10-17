// src/pages/SeasonDetail.jsx - VERSION MISE À JOUR
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tvAPI } from "../services/api"; // 👈 Import du service API
import Header from "../components/Header";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const SeasonDetail = () => {
  const { tvId, seasonNumber } = useParams();
  const navigate = useNavigate();
  const [season, setSeason] = useState(null);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeasonDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // ✅ Utilisation du service API avec Promise.all
        const [seasonData, showData] = await Promise.all([
          tvAPI.getSeasonDetails(tvId, seasonNumber),
          tvAPI.getDetails(tvId),
        ]);

        setSeason(seasonData);
        setShow(showData);
      } catch (err) {
        console.error("Error fetching season details:", err);
        setError(
          err.message || "Impossible de charger les détails de la saison."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonDetails();
  }, [tvId, seasonNumber]);

  const dateFormater = (date) => {
    if (!date) return "Date inconnue";
    const [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
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

  if (!season || !show) return null;

  return (
    <div className="season-detail-page">
      <Header />

      <button className="btn-back-fixed" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="season-detail-container">
        <div className="season-header-section">
          <div className="season-poster-large">
            {season.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                alt={season.name}
              />
            ) : (
              <div className="no-poster-large">📺</div>
            )}
          </div>

          <div className="season-info-section">
            <h1>{show.name}</h1>
            <h2>{season.name}</h2>

            <div className="season-meta">
              {season.air_date && (
                <span>📅 Diffusée le {dateFormater(season.air_date)}</span>
              )}
              <span>
                🎬 {season.episodes.length} épisode
                {season.episodes.length > 1 ? "s" : ""}
              </span>
            </div>

            {season.overview && (
              <div className="season-overview">
                <h3>Synopsis</h3>
                <p>{season.overview}</p>
              </div>
            )}
          </div>
        </div>

        <div className="episodes-section">
          <h2>Épisodes</h2>
          <div className="episodes-list">
            {season.episodes.map((episode) => (
              <div key={episode.id} className="episode-card">
                <div className="episode-still">
                  {episode.still_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                      alt={episode.name}
                    />
                  ) : (
                    <div className="no-still">🎬</div>
                  )}
                  <div className="episode-number">
                    Épisode {episode.episode_number}
                  </div>
                </div>

                <div className="episode-info">
                  <h3>{episode.name}</h3>

                  <div className="episode-meta">
                    {episode.air_date && (
                      <span className="episode-date">
                        📅 {dateFormater(episode.air_date)}
                      </span>
                    )}
                    {episode.runtime && (
                      <span className="episode-runtime">
                        ⏱️ {episode.runtime} min
                      </span>
                    )}
                    {episode.vote_average > 0 && (
                      <span className="episode-rating">
                        ⭐ {episode.vote_average.toFixed(1)}/10
                      </span>
                    )}
                  </div>

                  {episode.overview && (
                    <p className="episode-overview">{episode.overview}</p>
                  )}

                  {episode.crew && episode.crew.length > 0 && (
                    <div className="episode-crew">
                      {episode.crew
                        .filter((member) => member.job === "Director")
                        .slice(0, 2)
                        .map((director, index) => (
                          <span key={index}>
                            🎬 Réalisé par {director.name}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonDetail;
