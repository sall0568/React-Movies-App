// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Github, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        {/* Section À propos */}
        <div className="footer-section">
          <h3>React Movies</h3>
          <p>
            Votre application de découverte de films et séries, propulsée par
            l'API TMDB.
          </p>
          <div className="footer-social">
            <a
              href="https://github.com/sall0568"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:mamadouhassimiousall693@gmail.com"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Section Liens */}
        <div className="footer-section">
          <h4>Informations</h4>
          <ul>
            <li>
              <Link to="/about">À propos</Link>
            </li>
            <li>
              <Link to="/legal">Mentions légales</Link>
            </li>
            <li>
              <Link to="/privacy">Politique de confidentialité</Link>
            </li>
            <li>
              <Link to="/terms">Conditions générales</Link>
            </li>
          </ul>
        </div>

        {/* Section TMDB */}
        <div className="footer-section">
          <h4>API & Données</h4>
          <div className="tmdb-attribution">
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="tmdb-logo-link"
            >
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="TMDB Logo"
                className="tmdb-logo"
              />
            </a>
            <p className="tmdb-text">
              Ce produit utilise l'API TMDB mais n'est ni approuvé ni certifié
              par TMDB.
            </p>
            <a
              href="https://www.themoviedb.org/documentation/api"
              target="_blank"
              rel="noopener noreferrer"
              className="tmdb-link"
            >
              En savoir plus sur TMDB <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          © {currentYear} React Movies - Développé par{" "}
          <a
            href="https://github.com/sall0568"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sall Mamadou
          </a>
        </p>
        <p className="footer-disclaimer">
          Application éducative - Tous droits réservés
        </p>
      </div>
    </footer>
  );
};

export default Footer;
