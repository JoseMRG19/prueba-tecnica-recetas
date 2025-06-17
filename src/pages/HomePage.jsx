import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Importaciones de Lógica y API, incluyendo la nueva función
import { 
  getRecipesByCategory, 
  searchRecipeByName, 
  getFeaturedRecipes, 
  getFullRecipesDetails 
} from '../api/theMealDB';
import useDebounce from '../hooks/useDebounce';

// Importaciones de Componentes
import HeroCarousel from '../components/HeroCarousel';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CategoryFilter from '../components/CategoryFilter';

// Importación de Estilos
import './HomePage.css';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

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

  // Efecto principal para obtener los datos enriquecidos de las recetas
 useEffect(() => {
  const fetchFullRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      let basicData;
      if (debouncedSearchTerm) {
        basicData = await searchRecipeByName(debouncedSearchTerm);
      } else {
        if (activeCategory === 'All') {
          basicData = await getFeaturedRecipes();
        } else {
          basicData = await getRecipesByCategory(activeCategory);
        }
      }

      if (basicData && basicData.length > 0) {
        // --- OPTIMIZACIÓN CLAVE ---
        // Tomamos solo una porción de la lista básica (ej: las primeras 12)
        // antes de pedir los detalles completos.
        const sampleData = basicData.slice(0, 12);
        
        const fullData = await getFullRecipesDetails(sampleData);
        setRecipes(fullData);
      } else {
        setRecipes([]);
      }

    } catch (err) {
      // El mensaje de error que ya tienes es perfecto para este caso
      setError("Lo sentimos, un error ocurrió al cargar las recetas. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  
  fetchFullRecipes();
}, [activeCategory, debouncedSearchTerm]);

  // Función para manejar el cambio de categoría desde los filtros
  const handleCategoryChange = (newCategory) => {
    navigate(`/?category=${newCategory}`);
  };

  // Función para generar un título dinámico para la sección
  const getPageTitle = () => {
    if (urlSearch) return `Resultados para "${urlSearch}"`;
    if (activeCategory === 'All') return 'Recetas Populares';
    return `Recetas de ${activeCategory}`;
  };

  return (
    <>
      <HeroCarousel />

      <div className="container page-content">
        <h1 className="main-title">Encuentra tu Receta Perfecta</h1>
        <p className="main-subtitle">Explora por categoría o busca por nombre.</p>
        
        <CategoryFilter selectedCategory={activeCategory} onCategoryChange={handleCategoryChange} />

        <h2 className="section-title">{getPageTitle()}</h2>
        
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && (
          recipes.length > 0 ? (
            <div className="recipe-grid">
              {/* No necesitamos pasar más props, RecipeCard obtiene todo de 'recipe' */}
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))}
            </div>
          ) : (
            <p className="no-results-message">No se encontraron recetas para esta selección.</p>
          )
        )}
      </div>
    </>
  );
};

export default HomePage;