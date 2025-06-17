import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Importaciones de Lógica y API
import { getRecipesByCategory, searchRecipeByName, getFeaturedRecipes } from '../api/theMealDB';
import useDebounce from '../hooks/useDebounce';

// Importaciones de Componentes
import HeroCarousel from '../components/HeroCarousel'; // La nueva sección destacada
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

  // Leemos la URL para determinar el estado inicial, con "All" como valor por defecto
  const urlCategory = queryParams.get('category') || 'All';
  const urlSearch = queryParams.get('search') || '';
  
  // Estados del componente
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(urlCategory);
  
  // Debounce para la búsqueda, para no hacer llamadas a la API en cada tecleo
  const debouncedSearchTerm = useDebounce(urlSearch, 300);

  // Efecto para sincronizar el estado interno con la URL
  useEffect(() => {
    setActiveCategory(urlCategory);
  }, [urlCategory]);

  // Efecto principal para obtener los datos de las recetas
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (debouncedSearchTerm) {
          data = await searchRecipeByName(debouncedSearchTerm);
        } else {
          // Lógica para manejar la categoría "All"
          if (activeCategory === 'All') {
            data = await getFeaturedRecipes();
          } else {
            data = await getRecipesByCategory(activeCategory);
          }
        }
        setRecipes(data);
      } catch (err) {
        setError("Lo sentimos, no pudimos cargar las recetas. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, [activeCategory, debouncedSearchTerm]);

  // Función para manejar el cambio de categoría desde los filtros
  const handleCategoryChange = (newCategory) => {
    // Actualizamos la URL, lo que disparará el resto de la lógica a través de los useEffect
    navigate(`/?category=${newCategory}`);
  };

  // Función para generar un título dinámico y amigable para la sección
  const getPageTitle = () => {
    if (urlSearch) return `Resultados para "${urlSearch}"`;
    if (activeCategory === 'All') return 'Recetas Populares';
    return `Recetas de ${activeCategory}`;
  };

  return (
    // Fragmento para envolver las dos secciones principales de la página
    <>
      <HeroCarousel />

      <div className="container page-content">
        <h1 className="main-title">Encuentra tu Receta Perfecta</h1>
        <p className="main-subtitle">Explora por categoría o busca por nombre.</p>
        
        <CategoryFilter selectedCategory={activeCategory} onCategoryChange={handleCategoryChange} />

        <h2 className="section-title">{getPageTitle()}</h2>
        
        {/* Renderizado condicional del contenido principal */}
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && (
          recipes.length > 0 ? (
            <div className="recipe-grid">
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