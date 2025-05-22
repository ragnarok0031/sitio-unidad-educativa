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

  // Animaciones suaves al scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.area-card, .activity-card');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Inicializar elementos con opacity 0
  document.querySelectorAll('.area-card, .activity-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Llamar una vez al inicio

  // Menú móvil con animaciones suaves
  const toggleMenu = () => {
    menu.classList.toggle("menu-open");
    const icon = document.getElementById("menuIcon");
    
    if (menu.classList.contains("menu-open")) {
      menu.style.maxHeight = menu.scrollHeight + "px";
      icon.className = "fas fa-times";
    } else {
      menu.style.maxHeight = "0";
      icon.className = "fas fa-bars";
    }
  };

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