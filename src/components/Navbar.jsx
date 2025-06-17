import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import SearchBar from './SearchBar';
import MegaMenu from './MegaMenu';
import { getCategories } from '../api/theMealDB';
import './Navbar.css';

const Navbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [apiCategories, setApiCategories] = useState([]);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const navigate = useNavigate();
  const nodeRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setApiCategories(categoriesData);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearchTerm.trim()) {
      navigate(`/?search=${localSearchTerm.trim()}`);
      setShowMegaMenu(false); // Cierra el menú si está abierto al buscar
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/?category=${categoryName}`);
    setShowMegaMenu(false); // Cierra el menú al seleccionar una categoría
  };

  return (
    <div className="header-wrapper">
      <header className="main-header">
        <div className="container nav-container">
          <Link to="/" className="nav-logo" onClick={() => setShowMegaMenu(false)}>
            MiRecetario
          </Link>
          <div className="search-wrapper">
            <form onSubmit={handleSearchSubmit}>
              <SearchBar searchTerm={localSearchTerm} setSearchTerm={setLocalSearchTerm} />
            </form>
          </div>
          <button className="menu-toggle" onClick={() => setShowMegaMenu(!showMegaMenu)}>
            {showMegaMenu ? <FaTimes /> : <FaBars />}
            <span>Categorías</span>
          </button>
        </div>
      </header>

      <CSSTransition
        in={showMegaMenu}
        timeout={300}
        classNames="mega-menu"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className="mega-menu-container">
          <MegaMenu onCategoryClick={handleCategoryClick} allCategories={apiCategories} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default Navbar;