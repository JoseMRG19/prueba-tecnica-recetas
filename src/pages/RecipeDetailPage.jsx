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
      // Reset state on each new search
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

  // Function to extract the ingredient list from the recipe object
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

  // --- Conditional Rendering ---
  if (loading) return <div className="page-center"><LoadingSpinner /></div>;
  if (error) return <div className="page-center"><ErrorMessage message={error} /></div>;
  if (!recipe) return <div className="page-center"><p>Recipe not available.</p></div>;

  // --- Data Preparation ---
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

          {/* Show flag next to the area */}
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

        <div className="recipe-instructions-container">
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

      <div className="instructions-section">
        <h2>Instructions</h2>
        <p className="instructions-text">{recipe.strInstructions}</p>
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
