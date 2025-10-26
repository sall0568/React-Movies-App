import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { Link } from "react-router-dom";
import { getMovieUrl } from "../utils/seo";
import { getOptimizedImageUrl } from "../utils/imageOptimizer";

const Card = ({ movie }) => {
  const { isMovieFavorite, toggleMovieFavorite } = useFavorites();

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

  const isFav = isMovieFavorite(movie.id);

  return (
    <div className="card">
      <Link to={getMovieUrl(movie.id, movie.title)} className="card-link">
        <div className="image-container">
          <img
            src={getOptimizedImageUrl(movie.poster_path, "w500")}
            alt={`Affiche du film ${movie.title}`}
            loading="lazy"
            decoding="async"
            width="280"
            height="420"
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
