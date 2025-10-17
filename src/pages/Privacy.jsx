// src/pages/Privacy.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="legal-page">
      <Header />
      <div className="legal-content">
        <h1>Politique de Confidentialité</h1>
        <p className="last-updated">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>

        <section className="intro">
          <p>
            Chez <strong>React Movies</strong>, nous prenons la protection de
            vos données personnelles très au sérieux. Cette politique de
            confidentialité explique comment nous collectons, utilisons et
            protégeons vos informations.
          </p>
        </section>

        <section>
          <h2>1. Responsable du traitement des données</h2>
          <p>
            <strong>Nom :</strong> Sall Mamadou
            <br />
            <strong>Email :</strong> mamadouhassimiousall693@gmail.com
            <br />
            <strong>Application :</strong> React Movies
          </p>
        </section>

        <section>
          <h2>2. Données collectées</h2>

          <h3>2.1 Données que nous NE collectons PAS</h3>
          <div className="info-box success">
            <p>✅ Cette application ne collecte AUCUNE donnée personnelle :</p>
            <ul>
              <li>Pas d'inscription requise</li>
              <li>Pas de nom, prénom, email</li>
              <li>Pas d'adresse IP enregistrée</li>
              <li>Pas de tracking ou d'analytics</li>
              <li>Pas de cookies publicitaires</li>
            </ul>
          </div>

          <h3>2.2 Données stockées localement (dans votre navigateur)</h3>
          <p>
            Les seules données conservées sont stockées dans le{" "}
            <strong>localStorage</strong> de votre navigateur :
          </p>
          <ul>
            <li>
              <strong>Vos favoris :</strong> Liste des IDs de films et séries
              que vous avez marqués comme favoris
            </li>
            <li>
              <strong>Préférence de thème :</strong> Votre choix entre le mode
              clair et sombre
            </li>
          </ul>
          <p>
            ⚠️ <strong>Important :</strong> Ces données restent uniquement dans
            votre navigateur et ne sont jamais envoyées à nos serveurs ou à des
            tiers.
          </p>
        </section>

        <section>
          <h2>3. Utilisation des données</h2>
          <h3>3.1 Données de localStorage</h3>
          <p>Les données stockées localement sont utilisées pour :</p>
          <ul>
            <li>Afficher votre liste de favoris personnalisée</li>
            <li>Mémoriser vos préférences d'affichage (thème)</li>
            <li>Améliorer votre expérience utilisateur</li>
          </ul>

          <h3>3.2 Requêtes API</h3>
          <p>
            Lorsque vous utilisez l'application, des requêtes sont envoyées à :
          </p>
          <ul>
            <li>
              <strong>Notre backend :</strong> Pour proxyfier les appels à l'API
              TMDB de manière sécurisée
            </li>
            <li>
              <strong>TMDB :</strong> Pour récupérer les informations sur les
              films et séries
            </li>
            <li>
              <strong>YouTube :</strong> Pour afficher les bandes-annonces (si
              vous cliquez dessus)
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Partage des données avec des tiers</h2>

          <h3>4.1 API TMDB</h3>
          <p>
            Nous utilisons l'API de{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Movie Database (TMDB)
            </a>{" "}
            pour récupérer les informations sur les films et séries.
          </p>
          <p>
            Les requêtes passent par notre backend pour protéger notre clé API,
            mais TMDB peut collecter certaines données techniques (adresse IP,
            user-agent).
          </p>
          <p>
            Consultez la{" "}
            <a
              href="https://www.themoviedb.org/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              politique de confidentialité de TMDB
            </a>
            .
          </p>

          <h3>4.2 YouTube (bandes-annonces)</h3>
          <p>
            Si vous regardez une bande-annonce, celle-ci est chargée depuis
            YouTube. YouTube peut collecter des données selon sa propre
            politique de confidentialité.
          </p>
          <p>
            Consultez la{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              politique de confidentialité de Google/YouTube
            </a>
            .
          </p>
        </section>

        <section>
          <h2>5. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité pour protéger vos
            données :
          </p>
          <ul>
            <li>✅ Clé API TMDB stockée de manière sécurisée sur le serveur</li>
            <li>✅ Communication HTTPS entre le frontend et le backend</li>
            <li>✅ Rate limiting pour éviter les abus</li>
            <li>✅ Aucune base de données centralisée</li>
            <li>✅ Pas de stockage de données personnelles</li>
          </ul>
        </section>

        <section>
          <h2>6. Vos droits (RGPD)</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), vous disposez des droits suivants :
          </p>

          <div className="rights-grid">
            <div className="right-item">
              <h4>📖 Droit d'accès</h4>
              <p>
                Vous pouvez consulter les données stockées dans votre navigateur
                via les outils de développement (F12 → Application → Local
                Storage)
              </p>
            </div>

            <div className="right-item">
              <h4>✏️ Droit de rectification</h4>
              <p>
                Vous pouvez modifier vos favoris à tout moment en les ajoutant
                ou retirant
              </p>
            </div>

            <div className="right-item">
              <h4>🗑️ Droit à l'effacement</h4>
              <p>
                Vous pouvez supprimer toutes vos données en vidant le
                localStorage de votre navigateur ou en effaçant les cookies du
                site
              </p>
            </div>

            <div className="right-item">
              <h4>⛔ Droit d'opposition</h4>
              <p>
                Vous pouvez arrêter d'utiliser l'application à tout moment.
                Aucune donnée n'est conservée après la suppression du
                localStorage
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>7. Suppression de vos données</h2>
          <p>Pour supprimer toutes vos données locales :</p>

          <div className="info-box">
            <h4>Méthode 1 : Via les paramètres du navigateur</h4>
            <ol>
              <li>Ouvrez les paramètres de votre navigateur</li>
              <li>Allez dans "Confidentialité et sécurité"</li>
              <li>Cliquez sur "Effacer les données de navigation"</li>
              <li>Sélectionnez "Cookies et données de sites"</li>
              <li>Choisissez la période et validez</li>
            </ol>

            <h4>Méthode 2 : Via les outils de développement</h4>
            <ol>
              <li>Appuyez sur F12 pour ouvrir les DevTools</li>
              <li>Allez dans l'onglet "Application" (ou "Storage")</li>
              <li>Dans le menu de gauche, cliquez sur "Local Storage"</li>
              <li>Sélectionnez le site React Movies</li>
              <li>Cliquez-droit → "Clear"</li>
            </ol>
          </div>
        </section>

        <section>
          <h2>8. Cookies</h2>
          <p>Cette application utilise uniquement des cookies techniques :</p>
          <table className="cookies-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Type</th>
                <th>Durée</th>
                <th>Finalité</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>movieFavorites</td>
                <td>localStorage</td>
                <td>Permanente</td>
                <td>Sauvegarde de vos films favoris</td>
              </tr>
              <tr>
                <td>tvFavorites</td>
                <td>localStorage</td>
                <td>Permanente</td>
                <td>Sauvegarde de vos séries favorites</td>
              </tr>
              <tr>
                <td>theme</td>
                <td>localStorage</td>
                <td>Permanente</td>
                <td>Sauvegarde de votre préférence de thème</td>
              </tr>
            </tbody>
          </table>
          <p>
            ℹ️ Ces "cookies" sont en réalité du localStorage et ne sont pas
            transmis aux serveurs.
          </p>
        </section>

        <section>
          <h2>9. Modifications de cette politique</h2>
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité
            occasionnellement. Toute modification sera publiée sur cette page
            avec une nouvelle date de "Dernière mise à jour".
          </p>
          <p>
            Nous vous encourageons à consulter régulièrement cette page pour
            rester informé de la manière dont nous protégeons vos données.
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou
            l'utilisation de vos données :
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

        <section className="summary-box">
          <h2>📌 Résumé</h2>
          <div className="summary-content">
            <p>
              <strong>En résumé :</strong> React Movies ne collecte AUCUNE
              donnée personnelle. Toutes vos préférences (favoris, thème) sont
              stockées uniquement dans votre navigateur et ne quittent jamais
              votre appareil.
            </p>
            <p>
              Nous utilisons uniquement l'API TMDB pour afficher les
              informations sur les films et séries. Aucun tracking, aucune
              publicité, aucune revente de données.
            </p>
            <p>
              ✅ Votre vie privée est respectée. 🔒 Vos données sont protégées.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
