import React from "react";

const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  const genres = [
    { id: null, name: "Tous" },
    { id: 28, name: "Action" },
    { id: 12, name: "Aventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comédie" },
    { id: 80, name: "Policier" },
    { id: 99, name: "Documentaire" },
    { id: 18, name: "Drame" },
    { id: 10751, name: "Famille" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "Histoire" },
    { id: 27, name: "Horreur" },
    { id: 10402, name: "Musique" },
    { id: 9648, name: "Mystère" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science-fiction" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "Guerre" },
    { id: 37, name: "Western" },
  ];

  return (
    <div className="genre-filter">
      <label htmlFor="genre-select">Genre :</label>
      <select
        id="genre-select"
        value={selectedGenre || ""}
        onChange={(e) => onGenreChange(e.target.value ? Number(e.target.value) : null)}
      >
        {genres.map((genre) => (
          <option key={genre.id || "all"} value={genre.id || ""}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;