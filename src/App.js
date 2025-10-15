import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Loading from "./components/Loading";

// Lazy loading des pages
const Home = lazy(() => import("./pages/Home"));
const LikePage = lazy(() => import("./pages/LikePage"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const PersonDetail = lazy(() => import("./pages/PersonDetail"));
const TVShows = lazy(() => import("./pages/TVShows"));
const TVDetail = lazy(() => import("./pages/TVDetail"));
const SeasonDetail = lazy(() => import("./pages/SeasonDetail"));

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/series" element={<TVShows />} />
            <Route path="/coups-de-coeur" element={<LikePage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route
              path="/tv/:tvId/season/:seasonNumber"
              element={<SeasonDetail />}
            />
            <Route path="/tv/:id" element={<TVDetail />} />
            <Route path="/person/:id" element={<PersonDetail />} />
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
