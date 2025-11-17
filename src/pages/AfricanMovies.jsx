import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import ScrollToTop from "../components/ScrollToTop";
import SEOHelmet from "../components/SEOHelmet";
import { movieAPI } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";

const AfricanMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedDecade, setSelectedDecade] = useState("all");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  // Pays africains avec codes ISO 3166-1
  const africanCountries = [
    { code: "all", name: "Tous les pays", flag: "🌍" },
    { code: "DZ", name: "Algérie", flag: "🇩🇿" },
    { code: "ZA", name: "Afrique du Sud", flag: "🇿🇦" },
    { code: "EG", name: "Égypte", flag: "🇪🇬" },
    { code: "NG", name: "Nigeria", flag: "🇳🇬" },
    { code: "MA", name: "Maroc", flag: "🇲🇦" },
    { code: "TN", name: "Tunisie", flag: "🇹🇳" },
    { code: "KE", name: "Kenya", flag: "🇰🇪" },
    { code: "SN", name: "Sénégal", flag: "🇸🇳" },
    { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮" },
    { code: "GH", name: "Ghana", flag: "🇬🇭" },
    { code: "CM", name: "Cameroun", flag: "🇨🇲" },
    { code: "BF", name: "Burkina Faso", flag: "🇧🇫" },
    { code: "ML", name: "Mali", flag: "🇲🇱" },
    { code: "ET", name: "Éthiopie", flag: "🇪🇹" },
    { code: "UG", name: "Ouganda", flag: "🇺🇬" },
  ];

  // Décennies disponibles
  const decades = [
    { value: "all", label: "Toutes les époques" },
    { value: "2020-2029", label: "Années 2020" },
    { value: "2010-2019", label: "Années 2010" },
    { value: "2000-2009", label: "Années 2000" },
    { value: "1990-1999", label: "Années 1990" },
    { value: "1980-1989", label: "Années 1980" },
    { value: "1970-1979", label: "Années 1970" },
    { value: "1960-1969", label: "Années 1960" },
  ];

  // Options de tri
  const sortOptions = [
    { value: "popularity.desc", label: "Plus populaires" },
    { value: "vote_average.desc", label: "Meilleures notes" },
    { value: "release_date.desc", label: "Plus récents" },
    { value: "release_date.asc", label: "Plus anciens" },
  ];

  const debouncedCountry = useDebounce(selectedCountry, 300);
  const debouncedDecade = useDebounce(selectedDecade, 300);

  // Liste statique des codes pays (pour éviter la boucle infinie)
  const allAfricanCountryCodes = "DZ|ZA|EG|NG|MA|TN|KE|SN|CI|GH|CM|BF|ML|ET|UG";

  // Fonction pour récupérer les films africains
  const fetchAfricanMovies = useCallback(
    async (pageNum = 1, reset = false) => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          language: "fr-FR",
          sort_by: sortBy,
          page: pageNum,
          include_adult: false,
        };

        // Ajouter le filtre de pays
        if (debouncedCountry !== "all") {
          params.with_origin_country = debouncedCountry;
        } else {
          // Si "tous", on utilise la liste statique
          params.with_origin_country = allAfricanCountryCodes;
        }

        // Ajouter le filtre de décennie
        if (debouncedDecade !== "all") {
          const [start, end] = debouncedDecade.split("-");
          params["primary_release_date.gte"] = `${start}-01-01`;
          params["primary_release_date.lte"] = `${end}-12-31`;
        }

        console.log("🎬 Fetching African movies with params:", params);

        const data = await movieAPI.discover(params);

        if (reset || pageNum === 1) {
          setMovies(data.results);
        } else {
          setMovies((prev) => [...prev, ...data.results]);
        }

        setTotalResults(data.total_results);
        setHasMore(pageNum < data.total_pages);
      } catch (err) {
        console.error("Error fetching African movies:", err);
        setError(
          err.message ||
            "Impossible de charger les films africains. Veuillez réessayer."
        );
      } finally {
        setLoading(false);
      }
    },
    [sortBy, debouncedCountry, debouncedDecade, allAfricanCountryCodes]
  );

  // Charger les films au montage et quand les filtres changent
  useEffect(() => {
    setPage(1);
    fetchAfricanMovies(1, true);
  }, [fetchAfricanMovies]);

  // Charger plus de films
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAfricanMovies(nextPage);
  };

  // Statistiques
  const stats = {
    total: totalResults,
    countries: africanCountries.length - 1,
    avgRating:
      movies.length > 0
        ? (
            movies.reduce((sum, m) => sum + m.vote_average, 0) / movies.length
          ).toFixed(1)
        : "N/A",
  };

  return (
    <>
      <SEOHelmet
        title="Films Africains - CinéScope | Cinéma d'Afrique"
        description="Découvrez le meilleur du cinéma africain : Nollywood, films maghrébins, cinéma d'Afrique de l'Ouest et plus encore. Plus de 1000 films africains."
        type="website"
      />

      <div className="african-movies-page">
        <Header />

        {/* Hero Section */}
        <div className="african-hero">
          <div className="african-hero-content">
            <h1>🌍 Cinéma Africain</h1>
            <p className="hero-tagline">
              Découvrez le meilleur du 7ème art africain
            </p>
            <p className="hero-description">
              De Nollywood à Cannes, explorez la richesse et la diversité du
              cinéma africain
            </p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="african-stats">
          <div className="stat-card">
            <div className="stat-icon">🎬</div>
            <div className="stat-value">{stats.total}+</div>
            <div className="stat-label">Films disponibles</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌍</div>
            <div className="stat-value">{stats.countries}</div>
            <div className="stat-label">Pays représentés</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">{stats.avgRating}</div>
            <div className="stat-label">Note moyenne</div>
          </div>
        </div>

        {/* Filtres */}
        <div className="african-filters">
          <div className="filters-header">
            <h2>📍 Filtrer par pays</h2>
          </div>

          <div className="country-filters">
            {africanCountries.map((country) => (
              <button
                key={country.code}
                onClick={() => setSelectedCountry(country.code)}
                className={`country-btn ${
                  selectedCountry === country.code ? "active" : ""
                }`}
              >
                <span className="country-flag">{country.flag}</span>
                <span className="country-name">{country.name}</span>
              </button>
            ))}
          </div>

          <div className="additional-filters">
            <div className="filter-group">
              <label htmlFor="decade-filter">Époque :</label>
              <select
                id="decade-filter"
                value={selectedDecade}
                onChange={(e) => setSelectedDecade(e.target.value)}
              >
                {decades.map((decade) => (
                  <option key={decade.value} value={decade.value}>
                    {decade.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-filter">Trier par :</label>
              <select
                id="sort-filter"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="african-content">
          {error && (
            <ErrorMessage
              message={error}
              onRetry={() => fetchAfricanMovies(1, true)}
            />
          )}

          {loading && page === 1 ? (
            <Loading />
          ) : movies.length === 0 && !loading ? (
            <EmptyState
              icon="😔"
              title="Aucun film trouvé"
              message="Essayez de modifier vos filtres ou sélectionnez un autre pays"
            />
          ) : (
            <>
              <div className="movies-header">
                <h2>
                  🎥 {movies.length} film{movies.length > 1 ? "s" : ""} trouvé
                  {movies.length > 1 ? "s" : ""}
                </h2>
              </div>

              <div className="result">
                {movies.map((movie) => (
                  <Card movie={movie} key={movie.id} />
                ))}
              </div>

              {hasMore && movies.length > 0 && (
                <div className="load-more-container">
                  <button
                    className="btn-load-more"
                    onClick={loadMore}
                    disabled={loading}
                  >
                    {loading ? "Chargement..." : "Charger plus"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Section informative */}
        <div className="african-info-section">
          <h2>💡 Le saviez-vous ?</h2>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">🇳🇬</div>
              <h3>Nollywood</h3>
              <p>
                L'industrie cinématographique nigériane est la 2ème plus
                productive au monde, produisant plus de 2500 films par an.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎭</div>
              <h3>Cinéma Maghrébin</h3>
              <p>
                L'Algérie, le Maroc et la Tunisie ont une riche tradition
                cinématographique reconnue internationalement.
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">🏆</div>
              <h3>Festivals</h3>
              <p>
                Le FESPACO au Burkina Faso est le plus grand festival de cinéma
                africain, célébrant le 7ème art depuis 1969.
              </p>
            </div>
          </div>
        </div>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default AfricanMovies;
