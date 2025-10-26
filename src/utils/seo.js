// src/utils/seo.js
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
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
