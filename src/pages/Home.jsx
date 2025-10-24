// src/pages/Home.jsx - AVEC SEO OPTIMISÉ
import React from "react";
import Form from "../components/Form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import SEOHelmet from "../components/SEOHelmet";

const Home = () => {
  return (
    <>
      <SEOHelmet
        title="CinéScope - Films & Séries TV | Découvrez, Explorez, Organisez"
        description="Découvrez des milliers de films avec CinéScope. Recherchez, consultez les notes, bandes-annonces, casting et créez votre liste de favoris. Gratuit et sans inscription."
        type="website"
      />
      <div className="home-page">
        <Header />
        <Form />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Home;
