// src/components/AdvancedFiltersTVShows.jsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

const AdvancedFiltersTVShows = ({ onFilterChange, initialFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    year: initialFilters.year || "",
    decade: initialFilters.decade || "",
    language: initialFilters.language || "",
    sortBy: initialFilters.sortBy || "popularity.desc",
    status: initialFilters.status || "",
    type: initialFilters.type || "",
    streamingProvider: initialFilters.streamingProvider || "",
  });

  // Décennies disponibles
  const decades = [
    { value: "", label: "Toutes" },
    { value: "2020-2029", label: "2020s" },
    { value: "2010-2019", label: "2010s" },
    { value: "2000-2009", label: "2000s" },
    { value: "1990-1999", label: "1990s" },
    { value: "1980-1989", label: "1980s" },
    { value: "1970-1979", label: "1970s" },
    { value: "1960-1969", label: "1960s" },
    { value: "1950-1959", label: "1950s" },
  ];

  // Langues disponibles
  const languages = [
    { value: "", label: "Toutes" },
    { value: "fr", label: "Français" },
    { value: "en", label: "Anglais" },
    { value: "es", label: "Espagnol" },
    { value: "de", label: "Allemand" },
    { value: "it", label: "Italien" },
    { value: "ja", label: "Japonais" },
    { value: "ko", label: "Coréen" },
    { value: "zh", label: "Chinois" },
  ];

  // Options de tri
  const sortOptions = [
    { value: "popularity.desc", label: "Plus populaires" },
    { value: "popularity.asc", label: "Moins populaires" },
    { value: "vote_average.desc", label: "Meilleures notes" },
    { value: "vote_average.asc", label: "Moins bonnes notes" },
    { value: "first_air_date.desc", label: "Plus récentes" },
    { value: "first_air_date.asc", label: "Plus anciennes" },
    { value: "name.asc", label: "Titre (A-Z)" },
    { value: "name.desc", label: "Titre (Z-A)" },
  ];

  // Statut des séries
  const statusOptions = [
    { value: "", label: "Tous" },
    { value: "0", label: "En cours" }, // Returning Series
    { value: "1", label: "Prévue" }, // Planned
    { value: "2", label: "En production" }, // In Production
    { value: "3", label: "Terminée" }, // Ended
    { value: "4", label: "Annulée" }, // Canceled
    { value: "5", label: "Pilote" }, // Pilot
  ];

  // Type de série
  const typeOptions = [
    { value: "", label: "Tous" },
    { value: "0", label: "Documentaire" },
    { value: "1", label: "Actualités" },
    { value: "2", label: "Mini-série" },
    { value: "3", label: "Réalité" },
    { value: "4", label: "Série scénarisée" },
    { value: "5", label: "Talk show" },
    { value: "6", label: "Vidéo" },
  ];

  // 🆕 Plateformes de streaming (IDs TMDB vérifiés)
  const streamingProviders = [
    { value: "", label: "Toutes" },
    { value: "8", label: "Netflix" },
    { value: "119", label: "Amazon Prime Video" },
    { value: "337", label: "Disney+" },
    { value: "350", label: "Apple TV+" },
    { value: "1899", label: "Max" },
    { value: "531", label: "Paramount+" },
    { value: "2", label: "Apple iTunes" },
    { value: "10", label: "Amazon Video" },
  ];

  // Années (de 2024 à 1950)
  const currentYear = new Date().getFullYear();
  const years = [
    { value: "", label: "Toutes" },
    ...Array.from({ length: currentYear - 1949 }, (_, i) => ({
      value: currentYear - i,
      label: currentYear - i,
    })),
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Construire l'objet de filtres pour l'API TMDB
    const apiFilters = {
      sort_by: newFilters.sortBy,
    };

    // Année spécifique
    if (newFilters.year) {
      apiFilters.first_air_date_year = newFilters.year;
    }

    // Décennie
    if (newFilters.decade) {
      const [start, end] = newFilters.decade.split("-");
      apiFilters["first_air_date.gte"] = `${start}-01-01`;
      apiFilters["first_air_date.lte"] = `${end}-12-31`;
    }

    // Langue
    if (newFilters.language) {
      apiFilters.with_original_language = newFilters.language;
    }

    // Statut
    if (newFilters.status) {
      apiFilters.with_status = newFilters.status;
    }

    // Type
    if (newFilters.type) {
      apiFilters.with_type = newFilters.type;
    }

    // 🆕 Plateforme de streaming
    if (newFilters.streamingProvider) {
      apiFilters.with_watch_providers = newFilters.streamingProvider;
      apiFilters.watch_region = "FR"; // Région France
    }

    onFilterChange(apiFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      year: "",
      decade: "",
      language: "",
      sortBy: "popularity.desc",
      status: "",
      type: "",
      streamingProvider: "",
    };
    setFilters(defaultFilters);
    onFilterChange({ sort_by: "popularity.desc" });
  };

  const hasActiveFilters =
    filters.year ||
    filters.decade ||
    filters.language ||
    filters.status ||
    filters.type ||
    filters.streamingProvider;

  return (
    <div className="advanced-filters">
      <button
        className="filters-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Filter size={20} />
        <span>Filtres avancés</span>
        {hasActiveFilters && (
          <span className="active-badge">
            {Object.values(filters).filter(Boolean).length - 1}
          </span>
        )}
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isExpanded && (
        <div className="filters-content">
          <div className="filters-grid">
            {/* Tri */}
            <div className="filter-group">
              <label htmlFor="sortBy">Trier par</label>
              <select
                id="sortBy"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Année */}
            <div className="filter-group">
              <label htmlFor="year">Année</label>
              <select
                id="year"
                value={filters.year}
                onChange={(e) => handleFilterChange("year", e.target.value)}
                disabled={!!filters.decade}
              >
                {years.map((year) => (
                  <option key={year.value} value={year.value}>
                    {year.label}
                  </option>
                ))}
              </select>
              {filters.decade && (
                <small className="helper-text">
                  Désactivé car une décennie est sélectionnée
                </small>
              )}
            </div>

            {/* Décennie */}
            <div className="filter-group">
              <label htmlFor="decade">Décennie</label>
              <select
                id="decade"
                value={filters.decade}
                onChange={(e) => handleFilterChange("decade", e.target.value)}
                disabled={!!filters.year}
              >
                {decades.map((decade) => (
                  <option key={decade.value} value={decade.value}>
                    {decade.label}
                  </option>
                ))}
              </select>
              {filters.year && (
                <small className="helper-text">
                  Désactivé car une année est sélectionnée
                </small>
              )}
            </div>

            {/* Langue */}
            <div className="filter-group">
              <label htmlFor="language">Langue originale</label>
              <select
                id="language"
                value={filters.language}
                onChange={(e) => handleFilterChange("language", e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Statut */}
            <div className="filter-group">
              <label htmlFor="status">Statut</label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="filter-group">
              <label htmlFor="type">Type de série</label>
              <select
                id="type"
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
              >
                {typeOptions.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 🆕 Plateforme de streaming */}
            <div className="filter-group">
              <label htmlFor="streamingProvider">Plateforme de streaming</label>
              <select
                id="streamingProvider"
                value={filters.streamingProvider}
                onChange={(e) =>
                  handleFilterChange("streamingProvider", e.target.value)
                }
              >
                {streamingProviders.map((provider) => (
                  <option key={provider.value} value={provider.value}>
                    {provider.label}
                  </option>
                ))}
              </select>
              <small className="helper-text">Disponible en France</small>
            </div>
          </div>

          {/* Bouton Reset */}
          {hasActiveFilters && (
            <div className="filters-actions">
              <button className="btn-reset" onClick={resetFilters}>
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedFiltersTVShows;
