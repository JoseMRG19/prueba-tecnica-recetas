import React from 'react';
import './SearchSuggestions.css';

const SearchSuggestions = ({ suggestions, onSuggestionClick }) => {
  return (
    <div className="suggestions-dropdown">
      <h4 className="suggestions-title">Sugerencias</h4>
      <ul className="suggestions-list">
        {suggestions.map(recipe => (
          <li key={recipe.idMeal} onClick={() => onSuggestionClick(recipe.idMeal)}>
            {recipe.strMeal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestions;