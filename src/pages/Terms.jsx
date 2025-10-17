// src/pages/Terms.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="legal-page">
      <Header />
      <div className="legal-content">
        <h1>Conditions Générales d'Utilisation</h1>
        <p className="last-updated">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>

        <section className="intro">
          <p>
            Bienvenue sur <strong>React Movies</strong>. En utilisant cette
            application, vous acceptez les présentes conditions générales
            d'utilisation. Veuillez les lire attentivement.
          </p>
        </section>

        <section>
          <h2>1. Objet</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation (CGU) ont pour
            objet de définir les modalités et conditions d'utilisation de
            l'application web React Movies, ainsi que les droits et obligations
            des utilisateurs.
          </p>
        </section>

        <section>
          <h2>2. Accès au service</h2>
          <h3>2.1 Conditions d'accès</h3>
          <p>L'accès à React Movies est :</p>
          <ul>
            <li>✅ Gratuit</li>
            <li>✅ Sans inscription</li>
            <li>✅ Accessible à tout public</li>
            <li>✅ Disponible 24h/24, 7j/7 (sous réserve de maintenance)</li>
          </ul>

          <h3>2.2 Prérequis techniques</h3>
          <p>Pour utiliser React Movies, vous devez disposer de :</p>
          <ul>
            <li>Un navigateur web récent (Chrome, Firefox, Safari, Edge)</li>
            <li>Une connexion internet</li>
            <li>JavaScript activé</li>
          </ul>
        </section>

        <section>
          <h2>3. Description du service</h2>
          <p>React Movies est une application web permettant de :</p>
          <ul>
            <li>🔍 Rechercher des films et séries TV</li>
            <li>
              📖 Consulter des informations détaillées (synopsis, casting,
              notes)
            </li>
            <li>💖 Créer une liste de favoris (stockée localement)</li>
            <li>🎬 Visionner des bandes-annonces</li>
            <li>📺 Découvrir les plateformes de streaming disponibles</li>
            <li>🌓 Personnaliser le thème (clair/sombre)</li>
          </ul>
        </section>

        <section>
          <h2>4. Utilisation du service</h2>
          <h3>4.1 Utilisation autorisée</h3>
          <p>Vous êtes autorisé à utiliser React Movies pour :</p>
          <ul>
            <li>Votre usage personnel et non commercial</li>
            <li>Rechercher et découvrir des films et séries</li>
            <li>Créer et gérer votre liste de favoris</li>
          </ul>

          <h3>4.2 Utilisations interdites</h3>
          <p>Il est strictement interdit de :</p>
          <ul>
            <li>
              ❌ Utiliser l'application à des fins commerciales sans
              autorisation
            </li>
            <li>❌ Tenter de contourner les mesures de sécurité</li>
            <li>❌ Extraire massivement des données (scraping)</li>
            <li>❌ Surcharger les serveurs (DDoS, flood)</li>
            <li>❌ Utiliser des bots ou scripts automatisés</li>
            <li>
              ❌ Copier, modifier ou distribuer le code source sans autorisation
            </li>
            <li>❌ Retirer les mentions de copyright ou d'attribution</li>
          </ul>
        </section>

        <section>
          <h2>5. Propriété intellectuelle</h2>
          <h3>5.1 Code source de l'application</h3>
          <p>
            Le code source de React Movies est protégé par le droit d'auteur.
            Tous droits réservés à Sall Mamadou.
          </p>
          <p>
            Le code est disponible sur GitHub à des fins éducatives. Toute
            réutilisation nécessite l'autorisation de l'auteur.
          </p>

          <h3>5.2 Contenus TMDB</h3>
          <div className="tmdb-box">
            <p>
              Les données affichées sur React Movies (affiches, synopsis, notes,
              informations sur les films et séries) proviennent de{" "}
              <strong>The Movie Database (TMDB)</strong> et sont soumises à
              leurs propres conditions d'utilisation.
            </p>
            <p>
              ⚠️ <strong>Important :</strong> Ce produit utilise l'API TMDB mais
              n'est ni approuvé ni certifié par TMDB.
            </p>
          </div>

          <h3>5.3 Images et médias</h3>
          <p>
            Les affiches de films, photos d'acteurs, et autres contenus visuels
            sont la propriété de leurs détenteurs de droits respectifs (studios,
            distributeurs, photographes). Ces contenus sont affichés
            conformément aux conditions d'utilisation de l'API TMDB.
          </p>

          <h3>5.4 Bandes-annonces</h3>
          <p>
            Les bandes-annonces sont hébergées sur YouTube et soumises aux
            conditions d'utilisation de YouTube et Google.
          </p>
        </section>

        <section>
          <h2>6. Responsabilité</h2>
          <h3>6.1 Disponibilité du service</h3>
          <p>
            Nous nous efforçons de maintenir React Movies accessible en
            permanence, mais ne pouvons garantir :
          </p>
          <ul>
            <li>Une disponibilité 100% du service</li>
            <li>L'absence d'interruptions ou d'erreurs</li>
            <li>La compatibilité avec tous les appareils et navigateurs</li>
          </ul>
          <p>
            Des maintenances programmées ou d'urgence peuvent interrompre
            temporairement le service.
          </p>

          <h3>6.2 Exactitude des informations</h3>
          <p>
            Les informations affichées proviennent de bases de données tierces
            (TMDB). Nous ne pouvons garantir :
          </p>
          <ul>
            <li>L'exactitude complète des données</li>
            <li>L'actualité des informations</li>
            <li>L'absence d'erreurs ou d'omissions</li>
          </ul>

          <h3>6.3 Limitation de responsabilité</h3>
          <p>En utilisant React Movies, vous reconnaissez que :</p>
          <ul>
            <li>
              L'application est fournie "en l'état", sans garantie d'aucune
              sorte
            </li>
            <li>
              Nous ne sommes pas responsables des dommages directs ou indirects
              liés à l'utilisation du service
            </li>
            <li>
              Nous ne sommes pas responsables du contenu des sites tiers (TMDB,
              YouTube, plateformes de streaming)
            </li>
          </ul>
        </section>

        <section>
          <h2>7. Données personnelles</h2>
          <h3>7.1 Protection de la vie privée</h3>
          <p>
            React Movies ne collecte AUCUNE donnée personnelle. Pour plus
            d'informations, consultez notre{" "}
            <a href="/privacy">Politique de confidentialité</a>.
          </p>

          <h3>7.2 Données locales</h3>
          <p>
            Vos favoris et préférences sont stockés uniquement dans votre
            navigateur (localStorage) et ne sont jamais transmis à nos serveurs.
          </p>

          <h3>7.3 Suppression des données</h3>
          <p>
            Vous pouvez à tout moment supprimer vos données locales en vidant le
            cache de votre navigateur ou en utilisant les outils de
            développement.
          </p>
        </section>

        <section>
          <h2>8. Liens externes</h2>
          <p>React Movies contient des liens vers des sites externes :</p>
          <ul>
            <li>TMDB (base de données de films)</li>
            <li>YouTube (bandes-annonces)</li>
            <li>
              Plateformes de streaming (informations sur la disponibilité)
            </li>
          </ul>
          <p>
            Ces sites sont régis par leurs propres conditions d'utilisation.
            Nous ne sommes pas responsables de leur contenu ou de leurs
            pratiques.
          </p>
        </section>

        <section>
          <h2>9. Modifications du service</h2>
          <p>Nous nous réservons le droit de :</p>
          <ul>
            <li>Modifier ou interrompre le service à tout moment</li>
            <li>Ajouter, supprimer ou modifier des fonctionnalités</li>
            <li>Changer l'apparence ou l'interface de l'application</li>
          </ul>
          <p>
            Ces modifications peuvent être effectuées sans préavis et n'engagent
            pas notre responsabilité.
          </p>
        </section>

        <section>
          <h2>10. Modifications des CGU</h2>
          <p>
            Nous pouvons modifier ces Conditions Générales d'Utilisation à tout
            moment. Les modifications entrent en vigueur dès leur publication
            sur cette page.
          </p>
          <p>
            Il est de votre responsabilité de consulter régulièrement cette
            page. La poursuite de votre utilisation après modification vaut
            acceptation des nouvelles conditions.
          </p>
        </section>

        <section>
          <h2>11. Résiliation</h2>
          <h3>11.1 Par l'utilisateur</h3>
          <p>
            Vous pouvez cesser d'utiliser React Movies à tout moment, sans
            préavis ni justification. Il vous suffit de fermer l'application
            et/ou de supprimer vos données locales.
          </p>

          <h3>11.2 Par l'éditeur</h3>
          <p>
            Nous nous réservons le droit de suspendre ou fermer l'accès à
            l'application sans préavis, notamment en cas de :
          </p>
          <ul>
            <li>Violation de ces CGU</li>
            <li>Utilisation abusive du service</li>
            <li>Raisons techniques ou économiques</li>
          </ul>
        </section>

        <section>
          <h2>12. Loi applicable et juridiction</h2>
          <p>
            Les présentes CGU sont régies par le droit français. En cas de
            litige, les tribunaux français seront seuls compétents.
          </p>
        </section>

        <section>
          <h2>13. Contact</h2>
          <p>
            Pour toute question concernant ces Conditions Générales
            d'Utilisation, vous pouvez nous contacter :
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
          <h2>14. Clause de non-affiliation</h2>
          <div className="disclaimer-box">
            <h3>⚠️ Avertissement important</h3>
            <p>
              <strong>React Movies</strong> est une application indépendante
              créée à des fins éducatives. Cette application :
            </p>
            <ul>
              <li>❌ N'est PAS affiliée à The Movie Database (TMDB)</li>
              <li>❌ N'est PAS approuvée par TMDB</li>
              <li>❌ N'est PAS certifiée par TMDB</li>
              <li>❌ N'est PAS un produit officiel de TMDB</li>
            </ul>
            <p>
              <strong>React Movies</strong> utilise simplement l'API publique de
              TMDB conformément à leurs conditions d'utilisation.
            </p>
            <p>
              TMDB™ est une marque déposée de TiVo Corporation. Toutes les
              marques commerciales et marques de service sont la propriété de
              leurs détenteurs respectifs.
            </p>
          </div>
        </section>

        <section>
          <h2>15. Acceptation des conditions</h2>
          <div className="acceptance-box">
            <p>
              En utilisant React Movies, vous reconnaissez avoir lu, compris et
              accepté l'intégralité des présentes Conditions Générales
              d'Utilisation.
            </p>
            <p>
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser
              l'application.
            </p>
          </div>
        </section>

        <section className="summary-box">
          <h2>📌 Résumé simplifié</h2>
          <div className="summary-content">
            <ul className="summary-list">
              <li>✅ Application gratuite et sans inscription</li>
              <li>✅ Usage personnel et non commercial</li>
              <li>✅ Aucune donnée personnelle collectée</li>
              <li>✅ Données stockées localement dans votre navigateur</li>
              <li>✅ Contenus fournis par TMDB (tiers)</li>
              <li>❌ Pas d'affiliation avec TMDB</li>
              <li>❌ Service fourni "en l'état" sans garantie</li>
              <li>❌ Interdiction d'usage commercial sans autorisation</li>
            </ul>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
