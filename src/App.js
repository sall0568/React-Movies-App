// src/App.js - VERSION MISE À JOUR avec routes légales
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Loading from "./components/Loading";
import { usePageTracking } from "./hooks/useAnalytics";

// Lazy loading des pages
const Home = lazy(() => import("./pages/Home"));
const LikePage = lazy(() => import("./pages/LikePage"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const PersonDetail = lazy(() => import("./pages/PersonDetail"));
const TVShows = lazy(() => import("./pages/TVShows"));
const TVDetail = lazy(() => import("./pages/TVDetail"));
const SeasonDetail = lazy(() => import("./pages/SeasonDetail"));

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
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Routes principales */}
            <Route path="/" element={<Home />} />
            <Route path="/series" element={<TVShows />} />
            <Route path="/coups-de-coeur" element={<LikePage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/movie/:id-:slug" element={<MovieDetail />} />
            <Route
              path="/tv/:tvId/season/:seasonNumber"
              element={<SeasonDetail />}
            />
            <Route path="/tv/:id" element={<TVDetail />} />
            <Route path="/tv/:id-:slug" element={<TVDetail />} />
            <Route path="/person/:id" element={<PersonDetail />} />
            <Route path="/person/:id-:slug" element={<PersonDetail />} />

            {/* Routes légales */}
            <Route path="/about" element={<About />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* Route 404 */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
