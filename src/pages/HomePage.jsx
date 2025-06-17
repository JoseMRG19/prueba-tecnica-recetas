import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Importamos la nueva función
import { getRecipesByCategory, searchRecipeByName, getFeaturedRecipes } from '../api/theMealDB'; 
import useDebounce from '../hooks/useDebounce';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CategoryFilter from '../components/CategoryFilter';
import './HomePage.css';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // Ahora "All" es nuestro valor por defecto real
  const urlCategory = queryParams.get('category') || 'All'; 
  const urlSearch = queryParams.get('search') || '';
  
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(urlCategory);
  
  const debouncedSearchTerm = useDebounce(urlSearch, 300);

  useEffect(() => {
    setActiveCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (debouncedSearchTerm) {
          data = await searchRecipeByName(debouncedSearchTerm);
        } else {
          // --- LÓGICA MEJORADA ---
          if (activeCategory === 'All') {
            // Si la categoría es "All", llamamos a nuestra nueva función
            data = await getFeaturedRecipes();
          } else {
            // Si no, buscamos por la categoría específica
            data = await getRecipesByCategory(activeCategory);
          }
        }
        setRecipes(data);
      } catch (err) {
        setError("Lo sentimos, no pudimos cargar las recetas.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, [activeCategory, debouncedSearchTerm]);

  const handleCategoryChange = (newCategory) => {
    navigate(`/?category=${newCategory}`);
  };

  const getPageTitle = () => {
    if (urlSearch) return `Resultados para "${urlSearch}"`;
    if (activeCategory === 'All') return 'Recetas Populares';
    return `Recetas de ${activeCategory}`;
  };

  return (
    <div className="container page-content">
      <h1 className="main-title">Encuentra tu Receta Perfecta</h1>
      <p className="main-subtitle">Explora por categoría o busca por nombre.</p>
      
      <CategoryFilter selectedCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      <h2 className="section-title">{getPageTitle()}</h2>
      
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      
      {!loading && !error && (
        <div className="recipe-grid">
          {recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)}
        </div>
      )}
    </div>
  );
};

export default HomePage;