import React, { useState, useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
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
  const { handleFilterNavigate } = useOutletContext(); // Recibe la función de App.jsx

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
      setLoading(true); setError(null);
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
        if (basicData?.length > 0) {
          const dataToProcess = debouncedSearchTerm ? basicData : basicData.slice(0, 20);
          const fullData = await getFullRecipesDetails(dataToProcess);
          setRecipes(fullData);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        setError("Sorry, a problem occurred while loading recipes.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipesLogic();
  }, [urlCategory, debouncedSearchTerm, urlArea]);

  const handleCategoryChange = (newCategory) => {
    handleFilterNavigate(`/?category=${newCategory}`);
  };

  const handleCountrySelect = (countryName) => {
    handleFilterNavigate(`/?area=${countryName}`);
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
        <section id="results" className="results-section">
          <div className="container">
            <h3 className="results-title">{getPageTitle()}</h3>
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && (
              recipes.length > 0 ? (
                <div className="recipe-grid">
                  {recipes.map((recipe) => (<RecipeCard key={recipe.idMeal} recipe={recipe} />))}
                </div>
              ) : (
                <p className="no-results-message">No recipes found...</p>
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