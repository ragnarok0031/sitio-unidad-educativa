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
      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} transition-colors duration-300`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#2C5530] text-white p-4 shadow-lg">
        {/* Header content */}
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">U.E. Guido Arce Pimentel</h1>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
            aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
          >
            <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
          </button>
        </div>
        <nav ref={menuRef} className={`${menuOpen ? "block" : "hidden"} md:block mt-4 md:mt-0 transition-all duration-300`}>
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
    </div>
  );
}

export default App;
