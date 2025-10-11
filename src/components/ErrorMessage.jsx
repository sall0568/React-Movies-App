import React from "react";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <h3>Oups ! Une erreur s'est produite</h3>
      <p>{message || "Impossible de charger les données"}</p>
      {onRetry && (
        <button className="btn-retry" onClick={onRetry}>
          Réessayer
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;