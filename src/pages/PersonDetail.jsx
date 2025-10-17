// src/pages/PersonDetail.jsx - VERSION MISE À JOUR
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { personAPI } from "../services/api"; // 👈 Import du service API
import Header from "../components/Header";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Footer from "../components/Footer";

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // ✅ Utilisation du service API avec Promise.all
        const [personData, creditsData] = await Promise.all([
          personAPI.getDetails(id),
          personAPI.getMovieCredits(id),
        ]);

        setPerson(personData);
        setCredits(creditsData);
      } catch (err) {
        console.error("Error fetching person details:", err);
        setError(
          err.message || "Impossible de charger les détails de la personne."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPersonDetails();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "";
    const [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  const calculateAge = (birthday, deathday) => {
    if (!birthday) return null;
    const birth = new Date(birthday);
    const end = deathday ? new Date(deathday) : new Date();
    let age = end.getFullYear() - birth.getFullYear();
    const monthDiff = end.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <ErrorMessage message={error} />
      </>
    );
  }

  if (!person) return null;

  const age = calculateAge(person.birthday, person.deathday);
  const sortedMovies =
    credits?.cast
      ?.filter((movie) => movie.poster_path)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 20) || [];

  return (
    <div className="person-detail-page">
      <Header />

      <button className="btn-back-fixed" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="person-detail-container">
        <div className="person-content">
          <div className="person-sidebar">
            <div className="person-poster">
              {person.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                  alt={person.name}
                />
              ) : (
                <div className="no-photo">👤</div>
              )}
            </div>

            <div className="person-info-sidebar">
              <h3>Informations personnelles</h3>

              {person.birthday && (
                <div className="info-item">
                  <strong>Naissance</strong>
                  <p>
                    {formatDate(person.birthday)} {age && `(${age} ans)`}
                  </p>
                </div>
              )}

              {person.place_of_birth && (
                <div className="info-item">
                  <strong>Lieu de naissance</strong>
                  <p>{person.place_of_birth}</p>
                </div>
              )}

              {person.deathday && (
                <div className="info-item">
                  <strong>Décès</strong>
                  <p>{formatDate(person.deathday)}</p>
                </div>
              )}

              {person.known_for_department && (
                <div className="info-item">
                  <strong>Connu pour</strong>
                  <p>
                    {person.known_for_department === "Acting"
                      ? "Acteur/Actrice"
                      : person.known_for_department}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="person-main">
            <h1>{person.name}</h1>

            {person.biography && (
              <div className="biography">
                <h2>Biographie</h2>
                <p>{person.biography || "Aucune biographie disponible."}</p>
              </div>
            )}

            {sortedMovies.length > 0 && (
              <div className="filmography">
                <h2>Filmographie ({credits.cast.length} films)</h2>
                <div className="filmography-grid">
                  {sortedMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="filmography-card"
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <div className="film-info">
                        <p className="film-title">{movie.title}</p>
                        {movie.character && (
                          <p className="film-character">{movie.character}</p>
                        )}
                        {movie.release_date && (
                          <p className="film-year">
                            {new Date(movie.release_date).getFullYear()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PersonDetail;
