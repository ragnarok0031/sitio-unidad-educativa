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
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuItems = document.querySelectorAll('.mobile-menu li');
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Animar items del menú
    menuItems.forEach((item, index) => {
      if (isMenuOpen) {
        item.style.transitionDelay = `${index * 0.1}s`;
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      } else {
        item.style.transitionDelay = '0s';
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
      }
    });

    // Prevenir scroll cuando el menú está abierto
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }

  menuToggle.addEventListener('click', toggleMenu);

  // Cerrar menú al hacer click en un enlace
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      if (isMenuOpen) toggleMenu();
    });
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (isMenuOpen && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      toggleMenu();
    }
  });

  // Cerrar menú al redimensionar la ventana
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMenuOpen) {
      toggleMenu();
    }
  });

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