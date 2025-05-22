"use client";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", darkMode);

      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMenuOpen(false);
        }
      };

      const handleEscKey = (event) => {
        if (event.key === "Escape") {
          setMenuOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [darkMode, menuOpen]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} transition-colors duration-300`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#2C5530] text-white p-4 shadow-lg">
        {/* Header content */}
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Logo U.E. Guido Arce Pimentel" className="h-12 w-auto" />
            <h1 className="hidden md:block text-xl md:text-2xl font-crimson-text">
              U.E. Guido Arce Pimentel
            </h1>
            <h1 className="md:hidden text-xl font-crimson-text">G.A.P.</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-[#1A331D] transition-colors duration-300"
              aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
            >
              <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
            </button>
            <button
              className="md:hidden p-2 rounded-full hover:bg-[#1A331D] transition-colors duration-300"
              onClick={toggleMenu}
              aria-label="Menú de navegación"
            >
              <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>
        
        <nav
          ref={menuRef}
          className={`${menuOpen ? "block" : "hidden"} md:block mt-4 md:mt-0 transition-all duration-300`}
        >
          {/* Navigation content */}
        </nav>
      </header>

      {/* Sections */}
      <section id="inicio" className="bg-[#4A7856] text-white py-20">
        {/* Existing inicio section content */}
      </section>

      {/* Remaining sections */}

      {/* Footer */}
      <footer className="bg-[#2C5530] text-white py-8">
        {/* Existing footer content */}
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }

        .aspect-ratio-container img {
          transition: transform 0.3s ease;
        }

        .aspect-ratio-container:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default App;
