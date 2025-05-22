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

  // Animación del header al scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Animación de secciones al scroll
  const sections = document.querySelectorAll('.section');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Menú móvil con animaciones suaves
  function toggleMenu() {
    menu.classList.toggle("menu-open");
    const menuItems = menu.querySelectorAll('li');
    
    if (menu.classList.contains('menu-open')) {
      menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
      });
      setTimeout(() => {
        menuItems.forEach(item => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        });
      }, 100);
    }
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