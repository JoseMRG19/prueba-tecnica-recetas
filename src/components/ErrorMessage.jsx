// src/components/ErrorMessage.jsx

import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  // Si no nos pasan un mensaje, mostramos uno por defecto.
  const displayMessage = message || "An unexpected error has occurred.";

  return (
    <div className="error-container">
      <p className="error-text">⚠️ {displayMessage}</p>
    </div>
  );
};

// La línea que soluciona el error:
export default ErrorMessage;
