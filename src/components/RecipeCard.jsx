import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.idMeal}`} className="recipe-card">
      <div className="recipe-card-image-wrapper">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} loading="lazy" />
      </div>
      <div className="recipe-card-content">
        <h3>{recipe.strMeal}</h3>
      </div>
    </Link>
  );
};
export default RecipeCard;