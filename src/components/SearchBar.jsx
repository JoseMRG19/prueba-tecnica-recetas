import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a recipe by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        
        // --- CORRECCIÓN CLAVE ---
        // Atributos para desactivar el autocompletado nativo del navegador
        autoComplete="off"
        name="recipe-search"
        id="recipe-search-input"
      />
    </div>
  );
};

export default SearchBar;