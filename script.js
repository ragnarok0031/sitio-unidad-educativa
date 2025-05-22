document.addEventListener("DOMContentLoaded", function () {
  const darkModeButton = document.querySelector(".toggle-dark-mode");
  const menuToggleButton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("main-menu");

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
    
    // Actualizar colores de fondo
    document.documentElement.style.setProperty('--color-background', isDarkMode ? '#000000' : '#1a1a1a');
    document.documentElement.style.setProperty('--color-surface', isDarkMode ? '#1a1a1a' : '#2d2d2d');
  }

  function toggleMenu() {
    menu.classList.toggle("menu-open");
    const menuIcon = document.getElementById("menuIcon").classList;
    menuIcon.toggle("fa-bars");
    menuIcon.toggle("fa-times");
  }

  darkModeButton.addEventListener("click", toggleDarkMode);
  menuToggleButton.addEventListener("click", toggleMenu);

  // Initialize dark mode based on local storage
  const darkModeEnabled = localStorage.getItem("darkMode") === "true";
  document.body.classList.add(darkModeEnabled ? "dark-mode" : "light-mode");

  // Close menu on outside click
  window.addEventListener("click", function (e) {
    if (!menu.contains(e.target) && !menuToggleButton.contains(e.target)) {
      menu.classList.remove("menu-open");
      document.getElementById("menuIcon").classList.add("fa-bars");
      document.getElementById("menuIcon").classList.remove("fa-times");
    }
  });
});