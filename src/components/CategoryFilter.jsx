import React from 'react';
import './CategoryFilter.css';
import { FaHamburger, FaFish, FaBirthdayCake, FaDrumstickBite, FaLeaf, FaGlobe } from 'react-icons/fa';

const categoryIcons = {
  All: <FaGlobe />,
  Beef: <FaHamburger />,
  Chicken: <FaDrumstickBite />,
  Dessert: <FaBirthdayCake />,
  Seafood: <FaFish />,
  Vegetarian: <FaLeaf />,
};

// Categorías principales que aparecerán como botones
const mainCategories = ["All", "Beef", "Chicken", "Dessert", "Seafood", "Vegetarian"];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter-container">
      {mainCategories.map((categoryName) => (
        <button
          key={categoryName}
          className={`filter-button ${selectedCategory === categoryName ? 'active' : ''}`}
          // Ahora simplemente pasa el nombre de la categoría, incluido "All"
          onClick={() => onCategoryChange(categoryName)}
        >
          {categoryIcons[categoryName]}
          <span>{categoryName === 'All' ? 'All' : categoryName}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
