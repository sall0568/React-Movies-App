// src/components/ReviewsSection.jsx
import React, { useState } from "react";
import {
  User,
  Calendar,
  Star,
  ThumbsUp,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ReviewsSection = ({ reviews, totalReviews }) => {
  const [expanded, setExpanded] = useState({});
  const [sortBy, setSortBy] = useState("recent"); // recent, rating, helpful
  const [filterRating, setFilterRating] = useState(0); // 0 = tous, 1-10
  const [showFilters, setShowFilters] = useState(false);

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
      return avatarPath.substring(1);
    }

    // Si c'est un path TMDB
    if (avatarPath.startsWith("/")) {
      return `https://image.tmdb.org/t/p/w200${avatarPath}`;
    }

    return avatarPath;
  };

  // Calcul des statistiques
  const reviewStats = React.useMemo(() => {
    if (!reviews || reviews.length === 0) return null;

    const withRating = reviews.filter((r) => r.author_details.rating);
    const avgRating = withRating.length
      ? (
          withRating.reduce((sum, r) => sum + r.author_details.rating, 0) /
          withRating.length
        ).toFixed(1)
      : null;

    const ratingDistribution = [0, 0, 0, 0, 0]; // 1-2, 3-4, 5-6, 7-8, 9-10
    withRating.forEach((r) => {
      const rating = r.author_details.rating;
      if (rating <= 2) ratingDistribution[0]++;
      else if (rating <= 4) ratingDistribution[1]++;
      else if (rating <= 6) ratingDistribution[2]++;
      else if (rating <= 8) ratingDistribution[3]++;
      else ratingDistribution[4]++;
    });

    return {
      avgRating,
      withRating: withRating.length,
      distribution: ratingDistribution,
    };
  }, [reviews]);

  // Filtrage et tri
  const processedReviews = React.useMemo(() => {
    let filtered = [...reviews];

    // Filtrer par note
    if (filterRating > 0) {
      filtered = filtered.filter(
        (r) =>
          r.author_details.rating && r.author_details.rating >= filterRating
      );
    }

    // Trier
    filtered.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortBy === "rating") {
        const ratingA = a.author_details.rating || 0;
        const ratingB = b.author_details.rating || 0;
        return ratingB - ratingA;
      }
      return 0;
    });

    return filtered;
  }, [reviews, sortBy, filterRating]);

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
      {/* En-tête avec statistiques */}
      <div className="reviews-header">
        <div className="reviews-title-stats">
          <h2>
            Avis de la communauté
            {totalReviews > 0 && (
              <span className="review-count">({totalReviews})</span>
            )}
          </h2>
          {reviewStats && reviewStats.avgRating && (
            <div className="reviews-stats-summary">
              <div className="avg-rating">
                <Star size={20} fill="gold" stroke="gold" />
                <span className="rating-value">{reviewStats.avgRating}/10</span>
                <span className="rating-count">
                  ({reviewStats.withRating} notes)
                </span>
              </div>
            </div>
          )}
        </div>

        <button
          className="btn-toggle-filters"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Statistiques détaillées */}
      {reviewStats && reviewStats.avgRating && (
        <div className="reviews-stats">
          <div className="rating-bars">
            {["9-10★", "7-8★", "5-6★", "3-4★", "1-2★"].map((label, index) => {
              const count = reviewStats.distribution[4 - index];
              const percentage =
                reviewStats.withRating > 0
                  ? ((count / reviewStats.withRating) * 100).toFixed(0)
                  : 0;
              return (
                <div key={label} className="rating-bar">
                  <span className="rating-label">{label}</span>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="rating-value">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filtres et tri */}
      {showFilters && (
        <div className="reviews-controls">
          <div className="control-group">
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

          <div className="control-group">
            <label htmlFor="filter-rating">Note minimale :</label>
            <select
              id="filter-rating"
              value={filterRating}
              onChange={(e) => setFilterRating(Number(e.target.value))}
            >
              <option value="0">Toutes</option>
              <option value="8">8+ ⭐</option>
              <option value="6">6+ ⭐</option>
              <option value="4">4+ ⭐</option>
            </select>
          </div>

          {(sortBy !== "recent" || filterRating > 0) && (
            <button
              className="btn-reset-filters"
              onClick={() => {
                setSortBy("recent");
                setFilterRating(0);
              }}
            >
              Réinitialiser
            </button>
          )}
        </div>
      )}

      {/* Liste des avis */}
      {processedReviews.length === 0 ? (
        <div className="no-reviews-filtered">
          <p>Aucun avis ne correspond à vos critères.</p>
          <button
            className="btn-reset"
            onClick={() => {
              setSortBy("recent");
              setFilterRating(0);
            }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="reviews-list">
          {processedReviews.map((review) => {
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
      )}

      {/* Footer */}
      {processedReviews.length > 0 &&
        processedReviews.length < totalReviews && (
          <div className="reviews-footer">
            <p className="reviews-info">
              Affichage de {processedReviews.length} avis sur {totalReviews}
            </p>
            <small>Plus d'avis disponibles sur TMDB</small>
          </div>
        )}
    </div>
  );
};

export default ReviewsSection;
