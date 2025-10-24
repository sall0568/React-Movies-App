// src/pages/Home.jsx - AVEC SCROLL TO TOP
import React from "react";
import Form from "../components/Form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Form />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;
