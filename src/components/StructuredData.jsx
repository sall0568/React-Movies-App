// src/components/StructuredData.jsx
import { useEffect } from "react";

const StructuredData = ({ data }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    script.id = "structured-data-script";

    const existingScript = document.getElementById("structured-data-script");
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("structured-data-script");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null;
};

export const generateMovieSchema = (movie) => {
  if (!movie) return {};

  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    datePublished: movie.release_date,
    genre: movie.genres?.map((g) => g.name),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: movie.vote_average,
      bestRating: "10",
      ratingCount: movie.vote_count,
    },
    description: movie.overview,
    url: `https://moviereverse.netlify.app/movie/${movie.id}`,
  };
};

export const generateTVSeriesSchema = (show) => {
  if (!show) return {};

  return {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: show.name,
    image: `https://image.tmdb.org/t/p/original${show.poster_path}`,
    datePublished: show.first_air_date,
    genre: show.genres?.map((g) => g.name),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: show.vote_average,
      bestRating: "10",
      ratingCount: show.vote_count,
    },
    description: show.overview,
    numberOfSeasons: show.number_of_seasons,
    numberOfEpisodes: show.number_of_episodes,
    url: `https://moviereverse.netlify.app/tv/${show.id}`,
  };
};

export const generateBreadcrumbSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export default StructuredData;
