import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.idMeal}`} className="recipe-card">
      <div className="recipe-card-image-wrapper">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="recipe-card-image"
          loading="lazy"
        />
        <div className="recipe-card-overlay">
          <h3 className="recipe-card-title">{recipe.strMeal}</h3>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;