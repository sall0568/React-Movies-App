import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { getTVUrl } from "../utils/seo";
import { getOptimizedImageUrl } from "../utils/imageOptimizer";

const TVCard = ({ show }) => {
  const { isTVFavorite, toggleTVFavorite } = useFavorites();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const dateFormater = (date) => {
    if (!date) return "";
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  const genreFinder = () => {
    const genreMap = {
      10759: "Action & Adventure",
      16: "Animation",
      35: "Comédie",
      80: "Crime",
      99: "Documentaire",
      18: "Drame",
      10751: "Famille",
      10762: "Enfants",
      9648: "Mystère",
      10763: "Actualités",
      10764: "Réalité",
      10765: "Science-Fiction & Fantastique",
      10766: "Soap",
      10767: "Talk",
      10768: "Guerre & Politique",
      37: "Western",
    };

    if (show.genre_ids) {
      return show.genre_ids.map((id) => (
        <li key={id}>{genreMap[id] || "Inconnu"}</li>
      ));
    } else if (show.genres) {
      return show.genres.map((genre) => <li key={genre.id}>{genre.name}</li>);
    }
    return null;
  };

  const posterUrl = show.poster_path
    ? `${
        process.env.REACT_APP_TMDB_IMAGE_BASE_URL ||
        "https://image.tmdb.org/t/p/original"
      }${show.poster_path}`
    : "./img/poster.jpg";

  const isFav = isTVFavorite(show.id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    toggleTVFavorite(show.id);
  };

  return (
    <div className="card">
      <Link to={getTVUrl(show.id, show.name)} className="card-link">
        <div className="image-container">
          {!imageLoaded && !imageError && (
            <div className="image-skeleton"></div>
          )}
          <img
            src={getOptimizedImageUrl(show.poster_path, "w500")}
            alt={`Affiche de la série ${show.name}`}
            loading="lazy"
            decoding="async"
            width="280"
            height="420"
          />
        </div>
        <h2>{show.name}</h2>
        {show.first_air_date && (
          <h5>Première diffusion : {dateFormater(show.first_air_date)}</h5>
        )}
        <h4>
          {show.vote_average ? show.vote_average.toFixed(1) : "N/A"}/10{" "}
          <span>⭐</span>
        </h4>

        <ul>{genreFinder()}</ul>

        {show.overview && <h3>Synopsis</h3>}
        <p>{show.overview || "Pas de synopsis disponible"}</p>
      </Link>

      <button
        className={`btn ${isFav ? "btn-remove" : "btn-add"}`}
        onClick={handleToggleFavorite}
        aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        {isFav ? (
          <>
            <span>💔</span> Retirer des favoris
          </>
        ) : (
          <>
            <span>💖</span> Ajouter aux favoris
          </>
        )}
      </button>
    </div>
  );
};

export default TVCard;
