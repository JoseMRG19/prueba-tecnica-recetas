// src/components/NavigationLoader.jsx
import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Importa los estilos por defecto
import { useNavigation } from 'react-router-dom';

const NavigationLoader = () => {
  const navigation = useNavigation(); // Hook de React Router que nos da el estado de la navegación

  useEffect(() => {
    // Cuando la navegación está en estado 'loading' o 'submitting', la nueva página está cargando.
    if (navigation.state === 'loading' || navigation.state === 'submitting') {
      NProgress.start(); // Inicia la barra de progreso
    } else {
      NProgress.done(); // Cuando termina, completa y oculta la barra
    }

    // Función de limpieza para asegurar que la barra siempre se oculte si el componente se desmonta
    return () => {
      NProgress.done();
    };
  }, [navigation.state]); // El efecto se ejecuta cada vez que el estado de la navegación cambia

  return null; // Este componente no renderiza nada visible, solo controla la barra
};

export default NavigationLoader;