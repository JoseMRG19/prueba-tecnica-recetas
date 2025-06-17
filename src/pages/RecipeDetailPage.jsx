import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Importaciones de lógica y componentes
import { getRecipeById } from '../api/theMealDB';
import { getFlagUrl } from '../utils/countryUtils'; // Importamos la nueva utilidad
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

// Importación de estilos
import './RecipeDetailPage.css';

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      // Reiniciamos el estado en cada nueva búsqueda
      setLoading(true);
      setError(null);
      setRecipe(null);
      
      try {
        const data = await getRecipeById(recipeId);
        if (data) {
          setRecipe(data);
        } else {
          setError("No se encontró la receta que estás buscando.");
        }
      } catch (err) {
        setError("Error al cargar los detalles de la receta.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]); // El efecto se ejecuta cada vez que el ID de la receta en la URL cambia

  // Función para procesar la lista de ingredientes desde el objeto de la receta
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

  // --- Renderizado Condicional ---
  if (loading) return <div className="page-center"><LoadingSpinner /></div>;
  if (error) return <div className="page-center"><ErrorMessage message={error} /></div>;
  if (!recipe) return <div className="page-center"><p>Receta no disponible.</p></div>;

  // --- Preparación de Datos para Renderizar ---
  const ingredients = getIngredients(recipe);
  const flagUrl = getFlagUrl(recipe.strArea); // Obtenemos la URL de la bandera
  const youtubeVideoId = recipe.strYoutube ? recipe.strYoutube.split('v=')[1]?.split('&')[0] : null;

  return (
    <div className="container recipe-detail-page">
      <Link to="/" className="back-link">← Volver a la búsqueda</Link>

      <header className="recipe-header">
        <h1>{recipe.strMeal}</h1>
        <div className="meta-info">
          {recipe.strCategory && <span className="meta-tag">{recipe.strCategory}</span>}
          
          {/* Lógica para mostrar la bandera junto al área */}
          {recipe.strArea && (
            <span className="meta-tag area-tag">
              {flagUrl && <img src={flagUrl} alt={`Bandera de ${recipe.strArea}`} className="flag-icon" />}
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
          <h2>Ingredientes</h2>
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
        <h2>Instrucciones</h2>
        <p className="instructions-text">{recipe.strInstructions}</p>
      </div>

      {recipe.strSource && (
        <p className="recipe-source">
          Fuente: <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">{recipe.strSource}</a>
        </p>
      )}
    </div>
  );
};

export default RecipeDetailPage;