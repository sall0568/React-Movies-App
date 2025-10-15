import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Film, Tv, Heart, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useFavorites } from "../contexts/FavoritesContext";

const Header = () => {
  const { favoriteIds } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={`header ${menuOpen ? 'menu-is-open' : ''}`}>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <h1>React Movies</h1>

        <nav className={menuOpen ? "nav-open" : ""}>
          <ul>
            <li>
              <NavLink
                to="/"
                end
                className={(nav) => (nav.isActive ? "nav-active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                <Film size={20} />
                <span>Films</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/series"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                <Tv size={20} />
                <span>Séries</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/coups-de-coeur"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                <Heart size={20} />
                <span>Favoris</span>
                {favoriteIds.length > 0 && (
                  <span className="badge">{favoriteIds.length}</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>

        <ThemeToggle />
      </div>

      {/* Overlay en dehors du header pour éviter les conflits de z-index */}
      {menuOpen && (
        <div 
          className="nav-overlay-mobile" 
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;