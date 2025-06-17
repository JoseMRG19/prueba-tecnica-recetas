// src/components/SearchBar.jsx

import React from 'react';
import './SearchBar.css'; // Importamos los estilos que crearemos a continuación

// Este componente recibe dos props:
// 1. searchTerm: El valor actual de la búsqueda (para mostrarlo en el input).
// 2. setSearchTerm: La función para actualizar ese valor en el componente padre.
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Busca una receta por nombre..."
        // El valor del input está "controlado" por el estado de HomePage
        value={searchTerm}
        // Cada vez que el usuario escribe, llamamos a la función que nos pasaron
        // para actualizar el estado en HomePage.
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;