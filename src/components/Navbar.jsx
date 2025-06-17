import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

// Importación de componentes y lógica de API
import SearchBar from './SearchBar';
import MegaMenu from './MegaMenu';
import { getCategories } from '../api/theMealDB';

// Importación de estilos
import './Navbar.css';

const Navbar = () => {
  // Estado para controlar la visibilidad del megamenú
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  // Estado para almacenar las categorías de la API
  const [apiCategories, setApiCategories] = useState([]);
  // Estado local para el input de búsqueda, no afecta a la URL hasta que se envía
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  
  const navigate = useNavigate();
  const nodeRef = useRef(null); // Referencia para la animación con CSSTransition

  // Efecto para obtener las categorías de la API una sola vez, al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setApiCategories(categoriesData);
      } catch (error) {
        console.error("Error al cargar categorías para el MegaMenu:", error);
      }
    };
    fetchCategories();
  }, []);

  // Maneja el envío del formulario de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    if (localSearchTerm.trim()) {
      navigate(`/?search=${localSearchTerm.trim()}`);
      setShowMegaMenu(false); // Cierra el menú si estaba abierto
    }
  };

  // Maneja el clic en una categoría del megamenú
  const handleCategoryClick = (categoryName) => {
    navigate(`/?category=${categoryName}`);
    setShowMegaMenu(false); // Cierra el menú después de la selección
  };

  return (
    <div className="header-wrapper">
      <header className="main-header">
        {/* El .container centra el contenido de la barra */}
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

      {/* Componente de animación que envuelve el menú */}
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