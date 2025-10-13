import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useFavorites } from "../contexts/FavoritesContext";

const Header = ({ hideFullHeader = false }) => {
  const { favoriteIds } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  // Si hideFullHeader est true, on affiche seulement le ThemeToggle
  if (hideFullHeader) {
    return (
      <div className="header header-minimal">
        <ThemeToggle />
      </div>
    );
  }

  return (
    <div className="header">
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <h1>React Movies</h1>

      {menuOpen && (
        <div 
          className="nav-overlay" 
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav className={menuOpen ? "nav-open" : ""}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/coups-de-coeur"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Coups de coeur
              {favoriteIds.length > 0 && (
                <span className="badge">{favoriteIds.length}</span>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>

      <ThemeToggle />
    </div>
  );
};

export default Header;