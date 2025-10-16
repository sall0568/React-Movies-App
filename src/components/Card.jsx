import React, { useState } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  const { isMovieFavorite, toggleMovieFavorite } = useFavorites();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const dateFormater = (date) => {
    if (!date) return "";
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  const genreFinder = () => {
    const genreMap = {
      28: "Action",
      12: "Aventure",
      16: "Animation",
      35: "Comédie",
      80: "Policier",
      99: "Documentaire",
      18: "Drame",
      10751: "Famille",
      14: "Fantasy",
      36: "Histoire",
      27: "Horreur",
      10402: "Musique",
      9648: "Mystère",
      10749: "Romance",
      878: "Science-fiction",
      10770: "Téléfilm",
      53: "Thriller",
      10752: "Guerre",
      37: "Western",
    };

    if (movie.genre_ids) {
      return movie.genre_ids.map((id) => (
        <li key={id}>{genreMap[id] || "Inconnu"}</li>
      ));
    } else if (movie.genres) {
      return movie.genres.map((genre) => <li key={genre.id}>{genre.name}</li>);
    }
    return null;
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    toggleMovieFavorite(movie.id);
  };

  const posterUrl = movie.poster_path
    ? `${
        process.env.REACT_APP_TMDB_IMAGE_BASE_URL ||
        "https://image.tmdb.org/t/p/original"
      }${movie.poster_path}`
    : "./img/poster.jpg";

  const isFav = isMovieFavorite(movie.id);

  return (
    <div className="card">
      <Link to={`/movie/${movie.id}`} className="card-link">
        <div className="image-container">
          {!imageLoaded && !imageError && (
            <div className="image-skeleton"></div>
          )}
          <img
            src={posterUrl}
            alt={`affiche ${movie.title}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        </div>
        <h2>{movie.title}</h2>
        {movie.release_date && (
          <h5>Sorti le : {dateFormater(movie.release_date)}</h5>
        )}
        <h4>
          {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10{" "}
          <span>⭐</span>
        </h4>

        <ul>{genreFinder()}</ul>

        {movie.overview && <h3>Synopsis</h3>}
        <p>{movie.overview || "Pas de synopsis disponible"}</p>
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

export default Card;
