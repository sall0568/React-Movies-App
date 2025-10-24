// src/pages/About.jsx - AJOUTER SEOHelmet en haut
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHelmet from "../components/SEOHelmet"; // ✅ AJOUTER
import {
  Github,
  Mail,
  ExternalLink,
  Heart,
  Code,
  Database,
} from "lucide-react";

const About = () => {
  return (
    <>
      {/* ✅ AJOUTER CE BLOC */}
      <SEOHelmet
        title="À Propos - CinéScope | Application de Découverte de Films"
        description="Découvrez CinéScope, votre application gratuite pour explorer des milliers de films et séries. Développée avec React, propulsée par l'API TMDB."
        type="website"
      />

      <div className="about-page">
        <Header />
        <div className="about-content">
          {/* ... reste du code existant ... */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;
