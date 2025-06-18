import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

import SearchBar from './SearchBar';
import SearchSuggestions from './SearchSuggestions';
import MegaMenu from './MegaMenu';
import useDebounce from '../hooks/useDebounce';
import { searchRecipeByName, getCategories } from '../api/theMealDB';

import './Navbar.css';

const Navbar = ({ onSearchSubmit, onFilterNavigate }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [apiCategories, setApiCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);
  const megaMenuRef = useRef(null);
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      const fetchSuggestions = async () => {
        const results = await searchRecipeByName(debouncedSearchTerm);
        setSuggestions(results ? results.slice(0, 5) : []);
        setShowSuggestions(true);
      };
      fetchSuggestions();
    } else {
      setShowSuggestions(false);
    }
  }, [debouncedSearchTerm]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setApiCategories(data);
      } catch (e) { console.error("Error loading categories", e); }
    };
    fetchCategories();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(localSearchTerm);
    setShowSuggestions(false);
    setLocalSearchTerm('');
  };
  
  const handleSuggestionClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
    setShowSuggestions(false);
    setLocalSearchTerm('');
  };
  
  const handleCategoryClickFromMenu = (categoryName) => {
    onFilterNavigate(`/?category=${categoryName}`);
    setShowMegaMenu(false);
  };
  
  // --- NUEVA FUNCIÓN PARA EL LOGO ---
  const handleLogoClick = (e) => {
    e.preventDefault(); // Prevenimos la navegación por defecto del Link
    onFilterNavigate('/'); // Usamos la función del padre para navegar a la raíz
    setShowMegaMenu(false); // Cierra el menú si está abierto
  };

  return (
    <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <header className="main-header">
        <div className="container nav-container">
          {/* --- CAMBIO AQUÍ --- */}
          <Link to="/" className="nav-logo" onClick={handleLogoClick}>
            MyRecipeBook
          </Link>
          
          <div className="search-wrapper" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} autoComplete="off">
              <SearchBar searchTerm={localSearchTerm} setSearchTerm={setLocalSearchTerm} />
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <SearchSuggestions 
                suggestions={suggestions} 
                onSuggestionClick={handleSuggestionClick} 
              />
            )}
          </div>

          <button className="menu-toggle" onClick={() => setShowMegaMenu(!showMegaMenu)}>
            {showMegaMenu ? <FaTimes /> : <FaBars />}
            <span>Categories</span>
          </button>
        </div>
      </header>

      <CSSTransition
        in={showMegaMenu}
        timeout={300}
        classNames="mega-menu"
        unmountOnExit
        nodeRef={megaMenuRef}
      >
        <div ref={megaMenuRef} className="mega-menu-container">
          <MegaMenu onCategoryClick={handleCategoryClickFromMenu} allCategories={apiCategories} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default Navbar;