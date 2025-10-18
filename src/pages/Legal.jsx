// src/pages/Legal.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Legal = () => {
  return (
    <div className="legal-page">
      <Header />
      <div className="legal-content">
        <h1>Mentions Légales</h1>
        <p className="last-updated">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>

        <section>
          <h2>1. Éditeur du site</h2>
          <p>
            <strong>Nom :</strong> CinéScope
            <br />
            <strong>Responsable de publication :</strong> Sall Mamadou
            <br />
            <strong>Email :</strong> mamadouhassimiousall693@gmail.com
            <br />
            <strong>Type :</strong> Application web éducative
          </p>
        </section>

        <section>
          <h2>2. Hébergement</h2>
          <p>
            <strong>Frontend hébergé sur :</strong> [Netlify]
            <br />
            <strong>Backend hébergé sur :</strong> [Render]
            <br />
            <strong>Serveurs situés dans :</strong> Union Européenne
          </p>
        </section>

        <section>
          <h2>3. Propriété intellectuelle</h2>
          <p>
            L'ensemble de ce site (structure, textes, logos, boutons, images,
            sons, vidéos, bases de données, etc.) relève de la législation
            française et internationale sur le droit d'auteur et la propriété
            intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication,
            adaptation de tout ou partie des éléments du site, quel que soit le
            moyen ou le procédé utilisé, est interdite, sauf autorisation écrite
            préalable.
          </p>
        </section>

        <section>
          <h2>4. Contenu et données</h2>
          <h3>4.1 Attribution TMDB</h3>
          <div className="tmdb-attribution-legal">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
              alt="The Movie Database (TMDB)"
              className="tmdb-logo-large"
            />
            <p>
              Ce site utilise l'API de{" "}
              <strong>The Movie Database (TMDB)</strong> pour récupérer les
              informations sur les films et séries TV.
            </p>
            <ul>
              <li>
                ✅ Ce produit utilise l'API TMDB mais n'est ni approuvé ni
                certifié par TMDB
              </li>
              <li>
                ✅ Toutes les données sur les films et séries proviennent de
                TMDB
              </li>
              <li>
                ✅ Les images, synopsis, notes et informations sont la propriété
                de TMDB et de leurs contributeurs
              </li>
              <li>✅ TMDB est une marque déposée de TiVo Corporation</li>
            </ul>
            <p>
              Pour plus d'informations sur TMDB et leurs conditions
              d'utilisation, visitez :{" "}
              <a
                href="https://www.themoviedb.org/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.themoviedb.org/terms-of-use
              </a>
            </p>
          </div>

          <h3>4.2 Images et médias</h3>
          <p>
            Les affiches de films, photos d'acteurs, bandes-annonces et autres
            contenus multimédias sont la propriété de leurs ayants droit
            respectifs :
          </p>
          <ul>
            <li>Studios de production</li>
            <li>Distributeurs de films</li>
            <li>Chaînes de télévision</li>
            <li>Agences photographiques</li>
          </ul>
          <p>
            Ces contenus sont affichés à des fins d'information et de référence
            uniquement, conformément aux conditions d'utilisation de l'API TMDB.
          </p>
        </section>

        <section>
          <h2>5. Limitation de responsabilité</h2>
          <h3>5.1 Exactitude des informations</h3>
          <p>
            Les informations fournies sur ce site sont issues de bases de
            données tierces (principalement TMDB). Nous nous efforçons de
            maintenir les informations à jour, mais ne pouvons garantir :
          </p>
          <ul>
            <li>L'exactitude complète des données</li>
            <li>La disponibilité permanente du service</li>
            <li>L'absence d'interruptions ou d'erreurs</li>
          </ul>

          <h3>5.2 Liens externes</h3>
          <p>
            Ce site peut contenir des liens vers des sites externes (YouTube
            pour les bandes-annonces, plateformes de streaming, etc.). Nous ne
            sommes pas responsables du contenu de ces sites tiers.
          </p>

          <h3>5.3 Usage éducatif</h3>
          <p>
            Cette application a été développée à des fins éducatives et de
            démonstration de compétences en développement web. Elle n'a pas de
            but commercial.
          </p>
        </section>

        <section>
          <h2>6. Données personnelles</h2>
          <p>
            Conformément au RGPD (Règlement Général sur la Protection des
            Données), vous disposez d'un droit d'accès, de rectification et de
            suppression de vos données personnelles.
          </p>
          <p>
            Pour plus d'informations sur la collecte et l'utilisation de vos
            données, consultez notre{" "}
            <a href="/privacy">Politique de confidentialité</a>.
          </p>
        </section>

        <section>
          <h2>7. Cookies</h2>
          <p>
            Ce site utilise uniquement des cookies techniques nécessaires au bon
            fonctionnement de l'application :
          </p>
          <ul>
            <li>Sauvegarde du thème (clair/sombre)</li>
            <li>Sauvegarde de vos films et séries favoris (localStorage)</li>
          </ul>
          <p>
            Ces données sont stockées localement dans votre navigateur et ne
            sont jamais transmises à des serveurs tiers.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>
            Pour toute question concernant ces mentions légales, vous pouvez
            nous contacter :
          </p>
          <ul>
            <li>
              <strong>Email :</strong> mamadouhassimiousall693@gmail.com
            </li>
            <li>
              <strong>GitHub :</strong>{" "}
              <a
                href="https://github.com/sall0568"
                target="_blank"
                rel="noopener noreferrer"
              >
                @sall0568
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2>9. Modifications</h2>
          <p>
            Nous nous réservons le droit de modifier ces mentions légales à tout
            moment. Les modifications entrent en vigueur dès leur publication
            sur le site.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Legal;
