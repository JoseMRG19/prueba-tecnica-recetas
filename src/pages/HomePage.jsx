import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  getRecipesByCategory, 
  searchRecipeByName, 
  getFeaturedRecipes, 
  getFullRecipesDetails,
  getRecipesByArea
} from '../api/theMealDB';
import useDebounce from '../hooks/useDebounce';

import HeroCarousel from '../components/HeroCarousel';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CategoryFilter from '../components/CategoryFilter';
import CountryFilter from '../components/CountryFilter';
import Footer from '../components/Footer';

import './HomePage.css';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const urlCategory = queryParams.get('category');
  const urlSearch = queryParams.get('search');
  const urlArea = queryParams.get('area');

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeFilter = urlCategory || urlArea || 'All';
  const debouncedSearchTerm = useDebounce(urlSearch, 300);

  useEffect(() => {
    const fetchRecipesLogic = async () => {
      setLoading(true);
      setError(null);
      try {
        let basicData;
        if (debouncedSearchTerm) {
          basicData = await searchRecipeByName(debouncedSearchTerm);
        } else if (urlArea) {
          basicData = await getRecipesByArea(urlArea);
        } else {
          const categoryToFetch = urlCategory || 'All';
          if (categoryToFetch === 'All') {
            basicData = await getFeaturedRecipes();
          } else {
            basicData = await getRecipesByCategory(categoryToFetch);
          }
        }
        if (basicData && basicData.length > 0) {
          const dataToProcess = debouncedSearchTerm ? basicData : basicData.slice(0, 20);
          const fullData = await getFullRecipesDetails(dataToProcess);
          setRecipes(fullData);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        setError("Sorry, there was a problem loading the recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipesLogic();
  }, [urlCategory, debouncedSearchTerm, urlArea]);

  // --- FUNCIÓN DE SCROLL ---
  const scrollToResults = () => {
    // Usamos un pequeño delay para asegurar que el DOM se haya actualizado
    setTimeout(() => {
      const resultsSection = document.getElementById('results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCategoryChange = (newCategory) => {
    navigate(`/?category=${newCategory}`);
    scrollToResults(); // Llamamos a la función de scroll
  };

  const handleCountrySelect = (countryName) => {
    navigate(`/?area=${countryName}`);
    scrollToResults(); // Llamamos a la función de scroll
  };

  const getPageTitle = () => {
    if (urlSearch) return `Results for "${urlSearch}"`;
    if (urlArea) return `Recipes from ${urlArea}`;
    if (activeFilter === 'All') return 'Popular Recipes';
    return `Recipes from ${activeFilter}`;
  };

  return (
    <>
      <HeroCarousel />
      <div className="page-content">
        <section className="explore-section">
          <h2 className="section-title">Explore by Country</h2>
          <div className="container">
            <CountryFilter onCountrySelect={handleCountrySelect} selectedArea={urlArea} />
          </div>
        </section>
        <section className="filter-section">
          <div className="container">
            <h2 className="section-title">View Recipes By Category</h2>
            <CategoryFilter selectedCategory={activeFilter} onCategoryChange={handleCategoryChange} />
          </div>
        </section>
        {/* --- AÑADIMOS EL ID AQUÍ --- */}
        <section id="results" className="results-section">
          <div className="container">
            <h3 className="results-title">{getPageTitle()}</h3>
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
                <p className="no-results-message">No recipes found for this selection...</p>
              )
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;