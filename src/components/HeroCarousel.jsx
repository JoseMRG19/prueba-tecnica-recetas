import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel
import { getFeaturedRecipes } from '../api/theMealDB';
import './HeroCarousel.css';

const HeroCarousel = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const recipes = await getFeaturedRecipes();
      // Tomamos solo las primeras 5 para el carrusel
      setFeatured(recipes.slice(0, 5)); 
    };
    fetchFeatured();
  }, []);

  if (featured.length === 0) {
    return null; // No renderizar nada si aún no hay recetas
  }

  return (
    <div className="hero-carousel-wrapper">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3800}
        transitionTime={1250}
        className="presentation-mode"
      >
        {featured.map(recipe => (
          <div key={recipe.idMeal} className="slide-container">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <div className="legend-overlay">
              <div className="legend-content">
                <h2>{recipe.strMeal}</h2>
                <p>A delicious recipe to impress.</p>
                <Link to={`/recipe/${recipe.idMeal}`} className="legend-button">
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
