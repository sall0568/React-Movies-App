// src/utils/imageOptimizer.js
export const getOptimizedImageUrl = (tmdbPath, size = 'w500') => {
  if (!tmdbPath) return './img/poster.jpg';
  
  const sizes = {
    'small': 'w185',
    'medium': 'w500',
    'large': 'w780',
    'original': 'original'
  };
  
  const selectedSize = sizes[size] || size;
  return `https://image.tmdb.org/t/p/${selectedSize}${tmdbPath}`;
};
