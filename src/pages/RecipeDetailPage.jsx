// src/pages/RecipeDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // useParams para leer el ID de la URL
import { getRecipeById } from '../api/theMealDB';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import './RecipeDetailPage.css';

const RecipeDetailPage = () => {
  const { recipeId } = useParams(); // Obtiene { recipeId: '52772' } de la URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecipeById(recipeId);
        if (data) {
          setRecipe(data);
        } else {
          setError("No se encontró la receta.");
        }
      } catch (err) {
        setError("Error al cargar los detalles de la receta.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]); // Se ejecuta cada vez que el ID en la URL cambia

  // Función para procesar los ingredientes
  const getIngredients = (recipeData) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipeData[`strIngredient${i}`];
      const measure = recipeData[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!recipe) return <p>Receta no encontrada.</p>;

  const ingredients = getIngredients(recipe);
  
  // Extraer el ID de un video de YouTube si existe
  const youtubeVideoId = recipe.strYoutube ? recipe.strYoutube.split('v=')[1] : null;


  return (
    <div className="recipe-detail-page">
      <Link to="/" className="back-link">← Volver a la búsqueda</Link>
      <h1>{recipe.strMeal}</h1>
      <div className="recipe-meta">
        <span><strong>Categoría:</strong> {recipe.strCategory}</span>
        <span><strong>Área:</strong> {recipe.strArea}</span>
      </div>
      
      <div className="recipe-content">
        <div className="recipe-media">
          {youtubeVideoId ? (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title={recipe.strMeal}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
          ) : (
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          )}
        </div>
        
        <div className="recipe-instructions-container">
          <h2>Ingredientes</h2>
          <ul className="ingredients-list">
            {ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
          
          <h2>Instrucciones</h2>
          {/* El texto de las instrucciones puede tener saltos de línea \r\n */}
          <p className="instructions-text">
            {recipe.strInstructions.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;