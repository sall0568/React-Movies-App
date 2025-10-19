// src/components/AdvancedFilters.jsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

const AdvancedFilters = ({ onFilterChange, initialFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    year: initialFilters.year || "",
    decade: initialFilters.decade || "",
    minRuntime: initialFilters.minRuntime || "",
    maxRuntime: initialFilters.maxRuntime || "",
    language: initialFilters.language || "",
    sortBy: initialFilters.sortBy || "popularity.desc",
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
    { value: "release_date.desc", label: "Plus récents" },
    { value: "release_date.asc", label: "Plus anciens" },
    { value: "title.asc", label: "Titre (A-Z)" },
    { value: "title.desc", label: "Titre (Z-A)" },
  ];

  // Années (de 2024 à 1900)
  const currentYear = new Date().getFullYear();
  const years = [
    { value: "", label: "Toutes" },
    ...Array.from({ length: currentYear - 1899 }, (_, i) => ({
      value: currentYear - i,
      label: currentYear - i,
    })),
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
    { value: "3", label: "Google Play Movies" },
    { value: "10", label: "Amazon Video" },
    { value: "1771", label: "MUBI" },
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
      apiFilters.primary_release_year = newFilters.year;
    }

    // Décennie
    if (newFilters.decade) {
      const [start, end] = newFilters.decade.split("-");
      apiFilters["primary_release_date.gte"] = `${start}-01-01`;
      apiFilters["primary_release_date.lte"] = `${end}-12-31`;
    }

    // Durée
    if (newFilters.minRuntime) {
      apiFilters["with_runtime.gte"] = newFilters.minRuntime;
    }
    if (newFilters.maxRuntime) {
      apiFilters["with_runtime.lte"] = newFilters.maxRuntime;
    }

    // Langue
    if (newFilters.language) {
      apiFilters.with_original_language = newFilters.language;
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
      minRuntime: "",
      maxRuntime: "",
      language: "",
      sortBy: "popularity.desc",
      streamingProvider: "",
    };
    setFilters(defaultFilters);
    onFilterChange({ sort_by: "popularity.desc" });
  };

  const hasActiveFilters =
    filters.year ||
    filters.decade ||
    filters.minRuntime ||
    filters.maxRuntime ||
    filters.language ||
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

            {/* Durée min */}
            <div className="filter-group">
              <label htmlFor="minRuntime">Durée min (minutes)</label>
              <input
                type="number"
                id="minRuntime"
                value={filters.minRuntime}
                onChange={(e) =>
                  handleFilterChange("minRuntime", e.target.value)
                }
                placeholder="Ex: 90"
                min="0"
                max="300"
              />
            </div>

            {/* Durée max */}
            <div className="filter-group">
              <label htmlFor="maxRuntime">Durée max (minutes)</label>
              <input
                type="number"
                id="maxRuntime"
                value={filters.maxRuntime}
                onChange={(e) =>
                  handleFilterChange("maxRuntime", e.target.value)
                }
                placeholder="Ex: 180"
                min="0"
                max="300"
              />
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

export default AdvancedFilters;
