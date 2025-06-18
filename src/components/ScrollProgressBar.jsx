import React, { useState, useEffect } from 'react';
import './ScrollProgressBar.css'; // Importamos los estilos que crearemos a continuación

const ScrollProgressBar = () => {
  // Estado para almacenar el porcentaje de scroll
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Función que se ejecuta cada vez que el usuario hace scroll
  const handleScroll = () => {
    const scrollTop = window.scrollY; // Cuánto se ha bajado desde arriba
    // Altura total de la página menos la altura visible de la ventana
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Calculamos el porcentaje, asegurándonos de no dividir por cero si no hay scroll
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    setScrollPercentage(scrolled);
  };

  // Efecto para añadir y limpiar el listener de scroll
  useEffect(() => {
    // Añadimos el evento 'scroll' a la ventana cuando el componente se monta
    window.addEventListener('scroll', handleScroll);

    // Es muy importante limpiar el evento cuando el componente se desmonta
    // para evitar fugas de memoria.
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  return (
    <div className="scroll-progress-container">
      {/* El ancho de la barra se actualiza dinámicamente con el estado */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollPercentage}%` }}
      ></div>
    </div>
  );
};

export default ScrollProgressBar;