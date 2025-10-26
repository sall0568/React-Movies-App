// src/utils/seo.js
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 60);
};

export const getMovieUrl = (movieId, title) => {
  const slug = generateSlug(title);
  return `/movie/${movieId}-${slug}`;
};

export const getTVUrl = (tvId, title) => {
  const slug = generateSlug(title);
  return `/tv/${tvId}-${slug}`;
};

export const getPersonUrl = (personId, name) => {
  const slug = generateSlug(name);
  return `/person/${personId}-${slug}`;
};

export const extractIdFromSlug = (slugUrl) => {
  const match = slugUrl.match(/\/(\d+)/);
  return match ? match[1] : null;
};

// Hook pour rediriger vers l'URL avec slug
export const useSlugRedirect = (itemId, title, basePath) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!itemId || !title) return;

    const expectedSlug = generateSlug(title);
    const expectedUrl = `${basePath}/${itemId}-${expectedSlug}`;

    // Si l'URL actuelle ne contient pas le slug, rediriger
    if (!id.includes("-") && itemId && title) {
      navigate(expectedUrl, { replace: true });
    }
  }, [itemId, title, basePath, id, navigate]);
};
