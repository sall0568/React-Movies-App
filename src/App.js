import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Loading from "./components/Loading";

// Lazy loading des pages
const Home = lazy(() => import("./pages/Home"));
const LikePage = lazy(() => import("./pages/LikePage"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coups-de-coeur" element={<LikePage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
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
