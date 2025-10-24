// src/pages/TVShows.jsx - AVEC SCROLL TO TOP
import React from "react";
import Header from "../components/Header";
import TVForm from "../components/TVForm";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const TVShows = () => {
  return (
    <div className="tv-shows-page">
      <Header />
      <TVForm />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default TVShows;
