import React from 'react';
import { Link } from 'react-router-dom';
import { getFlagUrl } from '../utils/countryUtils'; // Importamos nuestra utilidad de banderas
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  // Obtenemos la URL de la bandera a partir del área de la receta
  const flagUrl = getFlagUrl(recipe.strArea);

  return (
    <Link to={`/recipe/${recipe.idMeal}`} className="recipe-card">
      <div className="recipe-card-image-wrapper">
        <img 
          src={recipe.strMealThumb.replace('/preview', '')} 
          alt={recipe.strMeal} 
          className="recipe-card-image"
          loading="lazy"
        />
      </div>
      <div className="recipe-card-content">
        <div className="recipe-card-meta">
          {/* Mostramos la categoría como tag/píldora */}
          <span className="recipe-card-category">{recipe.strCategory}</span>

          {/* Mostramos la bandera solo si existe */}
          {flagUrl && (
            <img src={flagUrl} alt={recipe.strArea} className="recipe-card-flag" />
          )}
        </div>
        
        <h3 className="recipe-card-title">{recipe.strMeal}</h3>
      </div>
    </Link>
  );
};

export default RecipeCard;