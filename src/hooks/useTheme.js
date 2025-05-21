import { useState, useEffect } from 'react';

export function useTheme() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Verificar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Obtener preferencia guardada o usar preferencia del sistema
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme ? storedTheme === 'dark' : prefersDark;
    
    setDarkMode(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme ? 'dark' : 'light');
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  return { darkMode, toggleDarkMode };
}
