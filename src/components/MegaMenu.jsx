import React from 'react';
import { Link } from 'react-router-dom';
import './MegaMenu.css';

const MegaMenu = ({ onCategoryClick, allCategories }) => {
  return (
    <div className="mega-menu-content">
      <div className="menu-column">
        <h4>Categorías</h4>
        <ul>
          {Array.isArray(allCategories) && allCategories.map(cat => (
            <li key={cat.strCategory}>
              <Link to={`/?category=${cat.strCategory}`} onClick={() => onCategoryClick(cat.strCategory)}>
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