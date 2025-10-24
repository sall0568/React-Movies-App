// src/pages/About.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHelmet from "../components/SEOHelmet";
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
          <div className="about-hero">
            <h1>À propos de CinéScope</h1>
            <p className="tagline">
              Votre compagnon de découverte cinématographique 🎬
            </p>
          </div>

          <section className="about-intro">
            <p>
              <strong>CinéScope</strong> est une application web moderne qui
              vous permet de découvrir, rechercher et organiser vos films et
              séries TV préférés. Développée avec passion et à des fins
              éducatives, cette application met en avant les meilleures
              pratiques du développement web moderne.
            </p>
          </section>

          <section className="features-grid">
            <h2>✨ Fonctionnalités</h2>
            <div className="features">
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Recherche intelligente</h3>
                <p>
                  Recherchez parmi des milliers de films et séries avec un
                  système de recherche en temps réel et des filtres avancés.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">💖</div>
                <h3>Gestion des favoris</h3>
                <p>
                  Créez votre collection personnelle en ajoutant vos films et
                  séries préférés à vos favoris.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Informations détaillées</h3>
                <p>
                  Consultez les synopsis, notes, casting, bandes-annonces et
                  bien plus encore.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🌓</div>
                <h3>Mode sombre/clair</h3>
                <p>
                  Profitez d'une expérience visuelle optimale avec le thème de
                  votre choix.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Design responsive</h3>
                <p>
                  Utilisez l'application sur tous vos appareils : ordinateur,
                  tablette ou smartphone.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Respect de la vie privée</h3>
                <p>
                  Aucune donnée personnelle collectée. Vos informations restent
                  dans votre navigateur.
                </p>
              </div>
            </div>
          </section>

          <section className="tech-stack">
            <h2>🛠️ Technologies utilisées</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <Code size={32} />
                <h4>Frontend</h4>
                <ul>
                  <li>React 18</li>
                  <li>React Router v6</li>
                  <li>Axios</li>
                  <li>SCSS</li>
                  <li>Lucide React (icons)</li>
                </ul>
              </div>

              <div className="tech-item">
                <Database size={32} />
                <h4>Backend</h4>
                <ul>
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>CORS</li>
                  <li>Rate Limiting</li>
                </ul>
              </div>

              <div className="tech-item">
                <ExternalLink size={32} />
                <h4>APIs & Services</h4>
                <ul>
                  <li>TMDB API</li>
                  <li>YouTube API</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="tmdb-section">
            <h2>🎬 Données fournies par TMDB</h2>
            <div className="tmdb-attribution-about">
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
                alt="The Movie Database"
                className="tmdb-logo-large"
              />
              <p>
                Cette application utilise l'API de{" "}
                <strong>The Movie Database (TMDB)</strong> pour récupérer toutes
                les informations sur les films et séries TV.
              </p>
              <div className="tmdb-info-box">
                <p>
                  TMDB est une base de données communautaire contenant des
                  informations sur plus de 800 000 films et 100 000 séries TV.
                  Les données incluent :
                </p>
                <ul>
                  <li>✓ Synopsis et descriptions</li>
                  <li>✓ Affiches et images</li>
                  <li>✓ Notes et avis</li>
                  <li>✓ Informations sur le casting et l'équipe</li>
                  <li>✓ Bandes-annonces</li>
                  <li>✓ Disponibilité sur les plateformes de streaming</li>
                </ul>
              </div>
              <p className="disclaimer">
                ⚠️ <strong>Important :</strong> Ce produit utilise l'API TMDB
                mais n'est ni approuvé ni certifié par TMDB.
              </p>
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="tmdb-link-btn"
              >
                Visiter TMDB <ExternalLink size={16} />
              </a>
            </div>
          </section>

          <section className="developer-section">
            <h2>👨‍💻 Développeur</h2>
            <div className="developer-card">
              <div className="developer-avatar">
                <div className="avatar-placeholder">
                  <img src="./img/IMG_2449.PNG" alt="SM" />
                </div>
              </div>
              <div className="developer-info">
                <h3>Sall Mamadou</h3>
                <p className="developer-title">Développeur Full Stack</p>
                <p className="developer-bio">
                  Passionné par le développement web et les nouvelles
                  technologies, j'ai créé CinéScope pour mettre en pratique mes
                  compétences et partager ma passion pour le cinéma.
                </p>
                <div className="developer-links">
                  <a
                    href="https://github.com/sall0568"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dev-link"
                  >
                    <Github size={20} />
                    GitHub
                  </a>
                  <a
                    href="mailto:mamadouhassimiousall693@gmail.com"
                    className="dev-link"
                  >
                    <Mail size={20} />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="project-info">
            <h2>📚 Projet éducatif</h2>
            <div className="info-box">
              <p>
                <strong>CinéScope</strong> a été développé dans un but éducatif
                et de démonstration de compétences en développement web. Ce
                projet illustre :
              </p>
              <ul>
                <li>✓ L'architecture d'une application React moderne</li>
                <li>✓ L'intégration d'APIs tierces de manière sécurisée</li>
                <li>✓ La gestion d'état avec Context API</li>
                <li>✓ Le routing avec React Router</li>
                <li>✓ La création d'un backend proxy Node.js</li>
                <li>✓ Les bonnes pratiques de sécurité</li>
                <li>✓ Le design responsive et l'accessibilité</li>
                <li>✓ L'optimisation des performances</li>
              </ul>
            </div>
          </section>

          <section className="open-source">
            <h2>💡 Open Source</h2>
            <p>
              Le code source de cette application est disponible sur GitHub à
              des fins éducatives. N'hésitez pas à consulter le code pour
              apprendre ou à contribuer au projet !
            </p>
            <a
              href="https://github.com/sall0568/React-Movies-App"
              target="_blank"
              rel="noopener noreferrer"
              className="github-btn"
            >
              <Github size={20} />
              Voir le code sur GitHub
            </a>
          </section>

          <section className="thanks">
            <h2>🙏 Remerciements</h2>
            <div className="thanks-grid">
              <div className="thanks-item">
                <Heart size={32} className="thanks-icon" />
                <h4>TMDB</h4>
                <p>
                  Pour leur API exceptionnelle et leur base de données complète
                </p>
              </div>
              <div className="thanks-item">
                <Code size={32} className="thanks-icon" />
                <h4>React Community</h4>
                <p>
                  Pour les outils et bibliothèques qui rendent le développement
                  plus simple
                </p>
              </div>
              <div className="thanks-item">
                <Heart size={32} className="thanks-icon" />
                <h4>Vous</h4>
                <p>Pour utiliser et apprécier cette application !</p>
              </div>
            </div>
          </section>

          <section className="contact-section">
            <h2>📧 Contact</h2>
            <p>
              Vous avez des questions, des suggestions ou vous avez trouvé un
              bug ? N'hésitez pas à me contacter !
            </p>
            <div className="contact-buttons">
              <a
                href="mailto:mamadouhassimiousall693@gmail.com"
                className="contact-btn primary"
              >
                <Mail size={20} />
                Envoyer un email
              </a>
              <a
                href="https://github.com/sall0568/React-Movies-App/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn secondary"
              >
                <Github size={20} />
                Signaler un problème
              </a>
            </div>
          </section>

          <section className="version-info">
            <p className="version">
              Version 2.0.0 • {new Date().getFullYear()}
            </p>
            <p className="made-with">
              Fait avec <Heart size={16} className="heart-icon" fill="red" /> et
              beaucoup de ☕
            </p>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;
