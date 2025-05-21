import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useTranslation } from './hooks/useTranslation';
import { useTheme } from './hooks/useTheme';

function App() {
  const { t, setLanguage } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : 'light'}`}>
      <Header 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        setLanguage={setLanguage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        t={t}
      />
      <main>
        <Hero t={t} />
        <Contact t={t} darkMode={darkMode} />
      </main>
      <Footer t={t} darkMode={darkMode} />
    </div>
  );
}

export default App;
