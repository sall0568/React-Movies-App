import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Season = ({ season, showId, onEpisodeClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const dateFormater = (date) => {
    if (!date) return "Date inconnue";
    const [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  return (
    <div className="season-card">
      <div className="season-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="season-poster">
          {season.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
              alt={season.name}
            />
          ) : (
            <div className="no-poster">📺</div>
          )}
        </div>

        <div className="season-info">
          <h3>{season.name}</h3>
          {season.air_date && (
            <p className="season-date">
              Diffusée le {dateFormater(season.air_date)}
            </p>
          )}
          <p className="season-episodes">
            {season.episode_count} épisode{season.episode_count > 1 ? "s" : ""}
          </p>
          {season.overview && (
            <p className="season-overview">{season.overview}</p>
          )}
        </div>

        <button
          className="expand-btn"
          aria-label={isExpanded ? "Réduire" : "Développer"}
        >
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {isExpanded && (
        <div className="season-episodes-list">
          <button
            className="load-episodes-btn"
            onClick={() => onEpisodeClick(season.season_number)}
          >
            Voir les épisodes
          </button>
        </div>
      )}
    </div>
  );
};

export default Season;
