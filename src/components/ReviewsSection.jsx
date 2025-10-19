// src/components/ReviewsSection.jsx
import React, { useState } from "react";
import { ThumbsUp, User, Calendar, Star } from "lucide-react";

const ReviewsSection = ({ reviews, totalReviews }) => {
  const [expanded, setExpanded] = useState({});
  const [sortBy, setSortBy] = useState("recent"); // recent, rating

  const toggleExpanded = (reviewId) => {
    setExpanded((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;

    // Si c'est une URL Gravatar
    if (
      avatarPath.startsWith("/https://") ||
      avatarPath.startsWith("/http://")
    ) {
      return avatarPath.substring(1); // Enlever le premier /
    }

    // Si c'est un path TMDB
    if (avatarPath.startsWith("/")) {
      return `https://image.tmdb.org/t/p/w200${avatarPath}`;
    }

    return avatarPath;
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === "rating") {
      const ratingA = a.author_details.rating || 0;
      const ratingB = b.author_details.rating || 0;
      return ratingB - ratingA;
    }
    return 0;
  });

  if (!reviews || reviews.length === 0) {
    return (
      <div className="reviews-section">
        <h2>Avis de la communauté</h2>
        <div className="no-reviews">
          <p>Aucun avis disponible pour le moment.</p>
          <small>Soyez le premier à donner votre avis sur TMDB !</small>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h2>
          Avis de la communauté
          {totalReviews > 0 && (
            <span className="review-count">({totalReviews})</span>
          )}
        </h2>

        <div className="reviews-sort">
          <label htmlFor="sort-reviews">Trier par :</label>
          <select
            id="sort-reviews"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">Plus récents</option>
            <option value="rating">Meilleure note</option>
          </select>
        </div>
      </div>

      <div className="reviews-list">
        {sortedReviews.map((review) => {
          const isExpanded = expanded[review.id];
          const content = review.content || "";
          const shouldTruncate = content.length > 500;
          const displayContent =
            !isExpanded && shouldTruncate
              ? content.substring(0, 500) + "..."
              : content;

          const avatarUrl = getAvatarUrl(review.author_details.avatar_path);

          return (
            <div key={review.id} className="review-card">
              <div className="review-header-info">
                <div className="review-author">
                  <div className="author-avatar">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={review.author} />
                    ) : (
                      <div className="avatar-placeholder">
                        <User size={24} />
                      </div>
                    )}
                  </div>
                  <div className="author-details">
                    <h3 className="author-name">{review.author}</h3>
                    <div className="review-meta">
                      <span className="review-date">
                        <Calendar size={14} />
                        {formatDate(review.created_at)}
                      </span>
                      {review.author_details.rating && (
                        <span className="review-rating">
                          <Star size={14} fill="gold" stroke="gold" />
                          {review.author_details.rating}/10
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="review-content">
                <p>{displayContent}</p>
                {shouldTruncate && (
                  <button
                    className="btn-read-more"
                    onClick={() => toggleExpanded(review.id)}
                  >
                    {isExpanded ? "Voir moins" : "Lire la suite"}
                  </button>
                )}
              </div>

              {review.url && (
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="review-link"
                >
                  Voir sur TMDB →
                </a>
              )}
            </div>
          );
        })}
      </div>

      {reviews.length < totalReviews && (
        <div className="reviews-footer">
          <p className="reviews-info">
            Affichage de {reviews.length} avis sur {totalReviews}
          </p>
          <small>Plus d'avis disponibles sur TMDB</small>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
