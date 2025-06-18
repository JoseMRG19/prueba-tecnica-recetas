import React from 'react';
import { getFlagUrl, areaToCountryCode } from '../utils/countryUtils';
import './CategoryFilter.css';

// Obtenemos la lista de países dinámicamente, excluyendo "Unknown"
const displayCountries = Object.keys(areaToCountryCode).filter(c => c !== 'Unknown');

const CountryFilter = ({ onCountrySelect, selectedArea }) => {
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