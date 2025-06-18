import React from 'react';
import { getFlagUrl, areaToCountryCode } from '../utils/countryUtils';
import './CategoryFilter.css';

// El cálculo se hace una sola vez cuando el módulo se carga
const displayCountries = Object.keys(areaToCountryCode).filter(c => c !== 'Unknown');

const CountryFilter = ({ onCountrySelect, selectedArea }) => {
  // ... el resto del componente se queda igual
  return (
    <div className="category-filter-container">
      {displayCountries.map((countryName) => (
        <button
          key={countryName}
          className={`filter-button ${selectedArea === countryName ? 'active' : ''}`}
          onClick={() => onCountrySelect(countryName)}
        >
          <img src={getFlagUrl(countryName)} alt={countryName} className="filter-icon-flag" />
          <span>{countryName}</span>
        </button>
      ))}
    </div>
  );
};

export default CountryFilter;