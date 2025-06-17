import React, { useState, useEffect } from 'react';
import { getRecipesByCategory, searchRecipeByName } from '../api/theMealDB';
import useDebounce from '../hooks/useDebounce';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import './HomePage.css';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('Dessert');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;
        if (debouncedSearchTerm) {
          data = await searchRecipeByName(debouncedSearchTerm);
        } else {
          data = await getRecipesByCategory(category);
        }
        setRecipes(data);
      } catch (err) {
        setError("Lo sentimos, no pudimos cargar las recetas.");
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [category, debouncedSearchTerm]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearchTerm('');
  };

  return (
    <div className="container">
      <header className="home-header">
        <h1>Todas las Recetas</h1>
        <p>Encuentra tu próxima comida favorita entre cientos de recetas.</p>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter selectedCategory={category} onCategoryChange={handleCategoryChange} />
      </header>
      <main>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div className="recipe-grid">
            {recipes.length > 0 ? (
              recipes.map(recipe => <RecipeCard key={recipe.idMeal} recipe={recipe} />)
            ) : (
              <p>No se encontraron recetas.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;