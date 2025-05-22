document.addEventListener("DOMContentLoaded", function () {
  const darkModeButton = document.querySelector(".toggle-dark-mode");
  const menuToggleButton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("main-menu");

  // Utilidades para cookies
  const Cookies = {
    set: function(name, value, days) {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
      }
      document.cookie = name + '=' + value + expires + '; path=/; SameSite=Strict';
    },
    
    get: function(name) {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    
    delete: function(name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }
  };

  // Función para mostrar el banner de cookies
  function showCookieBanner() {
    if (!Cookies.get('cookiesAccepted')) {
      const banner = document.createElement('div');
      banner.className = 'cookie-banner';
      banner.innerHTML = `
        <p>Utilizamos cookies para mejorar tu experiencia. 
           <button class="accept-cookies">Aceptar</button>
           <button class="reject-cookies">Rechazar</button>
        </p>
      `;
      document.body.appendChild(banner);

      banner.querySelector('.accept-cookies').addEventListener('click', () => {
        Cookies.set('cookiesAccepted', 'true', 365);
        banner.remove();
      });

      banner.querySelector('.reject-cookies').addEventListener('click', () => {
        Cookies.set('cookiesAccepted', 'false', 365);
        banner.remove();
      });
    }
  }

  // Guardar preferencias de usuario
  function saveUserPreferences() {
    if (Cookies.get('cookiesAccepted') === 'true') {
      Cookies.set('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light', 30);
      Cookies.set('lastVisit', new Date().toISOString(), 7);
    }
  }

  // Cargar preferencias guardadas
  function loadUserPreferences() {
    if (Cookies.get('cookiesAccepted') === 'true') {
      const savedTheme = Cookies.get('theme');
      if (savedTheme) {
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
      }
    }
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    
    saveUserPreferences();
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

  // Utilidad para detectar características de la pantalla
  const ScreenDetector = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight,
    orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
    pixelRatio: window.devicePixelRatio || 1,
    isTouch: 'ontouchstart' in window,
    
    getDeviceType() {
      const width = this.width;
      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';
      if (width < 1440) return 'laptop';
      return 'desktop';
    },

    updateMetrics() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspectRatio = this.width / this.height;
      this.orientation = this.width > this.height ? 'landscape' : 'portrait';
      document.documentElement.style.setProperty('--vh', `${this.height * 0.01}px`);
      document.body.setAttribute('data-device', this.getDeviceType());
      document.body.setAttribute('data-orientation', this.orientation);
    }
  };

  // Inicializar detección de pantalla
  ScreenDetector.updateMetrics();

  // Actualizar métricas al redimensionar o rotar
  window.addEventListener('resize', () => {
    ScreenDetector.updateMetrics();
    adjustLayoutForScreen();
  });

  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      ScreenDetector.updateMetrics();
      adjustLayoutForScreen();
    }, 100);
  });

  // Ajustar layout según la pantalla
  function adjustLayoutForScreen() {
    const deviceType = ScreenDetector.getDeviceType();
    const orientation = ScreenDetector.orientation;

    // Ajustar grid columns según el dispositivo
    const areasGrid = document.querySelector('.areas-grid');
    if (areasGrid) {
      switch(deviceType) {
        case 'mobile':
          areasGrid.style.gridTemplateColumns = '1fr';
          break;
        case 'tablet':
          areasGrid.style.gridTemplateColumns = orientation === 'landscape' ? 
            'repeat(2, 1fr)' : 'repeat(1, 1fr)';
          break;
        default:
          areasGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
      }
    }

    // Ajustar tamaño de fuente base según el ancho de pantalla
    const baseFontSize = Math.min(16 * (ScreenDetector.width / 1440), 16);
    document.documentElement.style.fontSize = `${baseFontSize}px`;
  }

  // Llamar al ajuste inicial
  adjustLayoutForScreen();

  // Parallax effect
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // Scroll animations
  const scrollElements = document.querySelectorAll('.scroll-animate');
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  scrollElements.forEach(element => {
    scrollObserver.observe(element);
  });

  // Loading animation
  const loader = document.createElement('div');
  loader.className = 'loading-overlay';
  loader.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loader);

  window.addEventListener('load', () => {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  });

  showCookieBanner();
  loadUserPreferences();

  // Manejo del menú mejorado
  const menuItems = document.querySelectorAll('.has-dropdown, .has-mega');
  const menuToggle = document.querySelector('.menu-toggle');
  const mainMenu = document.querySelector('.main-menu');

  // Toggle menú móvil
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Manejo de dropdowns en móvil
  menuItems.forEach(item => {
    const link = item.querySelector('.menu-link');
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1023) {
        e.preventDefault();
        item.classList.toggle('active');
      }
    });
  });

  // Cerrar menú al cambiar tamaño de ventana
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1023) {
      menuToggle.classList.remove('active');
      mainMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('active');
      mainMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
});