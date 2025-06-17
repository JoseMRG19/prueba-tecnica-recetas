import React, { useState, useEffect } from 'react';
import { getCategories } from '../api/theMealDB';
import './CategoryFilter.css';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      try {
        const apiCategories = await getCategories();
        
        // Lógica para asegurar que 'Dessert' esté al principio y no haya duplicados
        const uniqueCategories = [
          { strCategory: 'Dessert' }, // Objeto por defecto para "Postres"
          ...apiCategories.filter(cat => cat.strCategory !== 'Dessert') // Añade el resto de la API, excepto 'Dessert'
        ];
        
        setCategories(uniqueCategories);

      } catch (error) {
        console.error("No se pudieron cargar las categorías", error);
      }
    };
    
    fetchAndSetCategories();
  }, []); // Se ejecuta solo una vez al montar

  return (
    <div className="category-filter-container">
      {/* Mostramos solo un número limitado de categorías para mantener la UI limpia */}
      {categories.slice(0, 7).map((cat) => (
        <button
          key={cat.strCategory} // Usamos el string 'strCategory' como key
          className={`filter-button ${selectedCategory === cat.strCategory ? 'active' : ''}`}
          onClick={() => onCategoryChange(cat.strCategory)}
        >
          {/* Mostramos el string 'strCategory', con una traducción para 'Dessert' */}
          {cat.strCategory === 'Dessert' ? 'Postres' : cat.strCategory}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;