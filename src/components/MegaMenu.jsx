import React from 'react';
import { Link } from 'react-router-dom';
import './MegaMenu.css';

const MegaMenu = ({ onCategoryClick, allCategories }) => {
  return (
    <div className="mega-menu-content">
      <div className="menu-column">
        <h4>Categories</h4>
        <ul>
          {Array.isArray(allCategories) && allCategories.map(cat => (
            <li key={cat.strCategory}>
              <Link
                to={`/?category=${cat.strCategory}`} // El enlace es útil para SEO y abrir en nueva pestaña
                onClick={(e) => {
                  e.preventDefault(); // Prevenimos la navegación por defecto del Link
                  onCategoryClick(cat.strCategory); // Usamos nuestra propia lógica de navegación con scroll
                }}
              >
                {cat.strCategory}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MegaMenu;