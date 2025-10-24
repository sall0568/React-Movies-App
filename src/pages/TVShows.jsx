// src/pages/TVShows.jsx - AVEC SEO OPTIMISÉ
import React from "react";
import Header from "../components/Header";
import TVForm from "../components/TVForm";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import SEOHelmet from "../components/SEOHelmet";

const TVShows = () => {
  return (
    <>
      <SEOHelmet
        title="Séries TV - CinéScope | Découvrez les Meilleures Séries"
        description="Explorez des milliers de séries TV sur CinéScope. Consultez les notes, bandes-annonces, saisons, épisodes et créez votre liste de séries favorites."
        type="website"
      />
      <div className="tv-shows-page">
        <Header />
        <TVForm />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default TVShows;
