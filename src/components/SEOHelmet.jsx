// src/components/SEOHelmet.jsx
// Composant pour gérer les balises meta dynamiques par page

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SEOHelmet = ({
  title = "CinéScope - Films & Séries TV",
  description = "Découvrez des milliers de films et séries TV. Consultez notes, bandes-annonces et casting.",
  image = "https://moviereverse.netlify.app/og-image.png",
  type = "website",
}) => {
  const location = useLocation();
  const fullUrl = `https://moviereverse.netlify.app${location.pathname}`;

  useEffect(() => {
    // Mettre à jour le titre
    document.title = title;

    // Mettre à jour les meta tags
    updateMetaTag("description", description);
    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:image", image, "property");
    updateMetaTag("og:url", fullUrl, "property");
    updateMetaTag("og:type", type, "property");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Mettre à jour le canonical
    updateCanonical(fullUrl);
  }, [title, description, image, fullUrl, type]);

  return null; // Ce composant ne rend rien
};

// Fonction helper pour mettre à jour les meta tags
const updateMetaTag = (name, content, attribute = "name") => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

// Fonction helper pour mettre à jour le canonical
const updateCanonical = (url) => {
  let link = document.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", url);
};

export default SEOHelmet;
