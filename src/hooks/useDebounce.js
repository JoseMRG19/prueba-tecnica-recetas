// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

// Este hook toma un valor (como un término de búsqueda) y un delay (en ms)
function useDebounce(value, delay) {
  // Estado para guardar el valor "debounced" (retrasado)
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Configura un temporizador para actualizar el valor debounced después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Función de limpieza: se ejecuta si el valor o el delay cambian antes de que
    // el temporizador termine. Esto cancela el temporizador anterior.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Solo se vuelve a ejecutar si el valor o el delay cambian

  return debouncedValue;
}

export default useDebounce;