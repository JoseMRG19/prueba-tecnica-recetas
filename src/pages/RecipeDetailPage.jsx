import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Logic and component imports
import { getRecipeById } from '../api/theMealDB';
import { getFlagUrl } from '../utils/countryUtils';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

// Style import
import './RecipeDetailPage.css';

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError(null);
      setRecipe(null);

      try {
        const data = await getRecipeById(recipeId);
        if (data) {
          setRecipe(data);
        } else {
          setError("The recipe you're looking for was not found.");
        }
      } catch (err) {
        setError("An error occurred while loading the recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  const getIngredients = (recipeData) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipeData[`strIngredient${i}`];
      const measure = recipeData[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({ measure: measure || '', name: ingredient });
      }
    }
    return ingredients;
  };

  if (loading) return <div className="page-center"><LoadingSpinner /></div>;
  if (error) return <div className="page-center"><ErrorMessage message={error} /></div>;
  if (!recipe) return <div className="page-center"><p>Recipe not available.</p></div>;

  const ingredients = getIngredients(recipe);
  const flagUrl = getFlagUrl(recipe.strArea);
  const youtubeVideoId = recipe.strYoutube ? recipe.strYoutube.split('v=')[1]?.split('&')[0] : null;

  return (
    <div className="container recipe-detail-page">
      <Link to="/" className="back-link">← Back to search</Link>

      <header className="recipe-header">
        <h1>{recipe.strMeal}</h1>
        <div className="meta-info">
          {recipe.strCategory && <span className="meta-tag">{recipe.strCategory}</span>}
          {recipe.strArea && (
            <span className="meta-tag area-tag">
              {flagUrl && <img src={flagUrl} alt={`Flag of ${recipe.strArea}`} className="flag-icon" />}
              {recipe.strArea}
            </span>
          )}
        </div>
      </header>

      <div className="recipe-main-content">
        <div className="recipe-media">
          {youtubeVideoId ? (
            <div className="video-responsive">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                title={recipe.strMeal}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <img src={recipe.strMealThumb.replace('/preview', '')} alt={recipe.strMeal} className="recipe-image" />
          )}
        </div>
        
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((ing, index) => (
              <li key={index}>
                <span className="measure">{ing.measure}</span>{ing.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- SECCIÓN DE INSTRUCCIONES MODIFICADA --- */}
      <div className="instructions-section">
        <h2>Instructions</h2>
        <ol className="instructions-list">
          {/* 
            Esta lógica divide el texto de instrucciones en un array por cada salto de línea,
            filtra las líneas que estén vacías, y luego crea un elemento de lista (<li>)
            para cada paso, resultando en una lista numerada y semánticamente correcta.
          */}
          {recipe.strInstructions
            .split(/\r?\n/)
            .filter(line => line.trim() !== '')
            .map((line, index) => (
              <li key={index}>{line}</li>
          ))}
        </ol>
      </div>

      {recipe.strSource && (
        <p className="recipe-source">
          Source: <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">{recipe.strSource}</a>
        </p>
      )}
    </div>
  );
};

export default RecipeDetailPage;