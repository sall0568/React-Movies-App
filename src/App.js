// src/App.js - VERSION AVEC BLOG
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Loading from "./components/Loading";
import { usePageTracking } from "./hooks/useAnalytics";

// Lazy loading des pages principales
const Home = lazy(() => import("./pages/Home"));
const LikePage = lazy(() => import("./pages/LikePage"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const PersonDetail = lazy(() => import("./pages/PersonDetail"));
const TVShows = lazy(() => import("./pages/TVShows"));
const TVDetail = lazy(() => import("./pages/TVDetail"));
const SeasonDetail = lazy(() => import("./pages/SeasonDetail"));

// Pages Blog
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// Pages légales
const About = lazy(() => import("./pages/About"));
const Legal = lazy(() => import("./pages/Legal"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

const AppContent = () => {
  usePageTracking();
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Routes principales */}
          <Route path="/" element={<Home />} />
          <Route path="/series" element={<TVShows />} />
          <Route path="/coups-de-coeur" element={<LikePage />} />

          {/* Routes Films */}
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/movie/:id-:slug" element={<MovieDetail />} />

          {/* Routes Séries */}
          <Route
            path="/tv/:tvId/season/:seasonNumber"
            element={<SeasonDetail />}
          />
          <Route path="/tv/:id" element={<TVDetail />} />
          <Route path="/tv/:id-:slug" element={<TVDetail />} />

          {/* Routes Personnes */}
          <Route path="/person/:id" element={<PersonDetail />} />
          <Route path="/person/:id-:slug" element={<PersonDetail />} />

          {/* 🆕 ROUTES BLOG */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Routes légales */}
          <Route path="/about" element={<About />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Route 404 */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
