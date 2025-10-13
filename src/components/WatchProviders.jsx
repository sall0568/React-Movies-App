import React from "react";

const WatchProviders = ({ providers }) => {
  if (!providers) return null;

  const { flatrate, rent, buy } = providers;

  return (
    <div className="watch-providers">
      <h2>Où regarder</h2>

      {flatrate && flatrate.length > 0 && (
        <div className="provider-section">
          <h3>📺 Streaming</h3>
          <div className="provider-list">
            {flatrate.map((provider) => (
              <div key={provider.provider_id} className="provider-item">
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  title={provider.provider_name}
                />
                <span>{provider.provider_name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {rent && rent.length > 0 && (
        <div className="provider-section">
          <h3>🎬 Location</h3>
          <div className="provider-list">
            {rent.map((provider) => (
              <div key={provider.provider_id} className="provider-item">
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  title={provider.provider_name}
                />
                <span>{provider.provider_name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {buy && buy.length > 0 && (
        <div className="provider-section">
          <h3>💰 Achat</h3>
          <div className="provider-list">
            {buy.map((provider) => (
              <div key={provider.provider_id} className="provider-item">
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  title={provider.provider_name}
                />
                <span>{provider.provider_name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!flatrate && !rent && !buy && (
        <p className="no-providers">
          Aucune plateforme disponible pour le moment
        </p>
      )}
    </div>
  );
};

export default WatchProviders;