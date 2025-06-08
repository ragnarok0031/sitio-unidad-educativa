document.addEventListener("DOMContentLoaded", function () {
  // const darkModeButton = document.querySelector(".toggle-dark-mode"); // Removed, handled by ThemeSwitcher
  // const menuToggleButton = document.querySelector(".menu-toggle"); // Removed, handled by HeaderController
  const menu = document.getElementById("main-menu"); // Kept for now, might be used by other logic or HeaderController

  // Guardar preferencias de usuario
  function saveUserPreferences() {
    if (CookieManager.getCookie('cookiesAccepted') === 'true') {
      // CookieManager.setCookie('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light', 30, 'preferences'); // Removed
      CookieManager.setCookie('lastVisit', new Date().toISOString(), 7, 'preferences');
    }
  }

  // Cargar preferencias guardadas
  function loadUserPreferences() {
    if (CookieManager.getCookie('cookiesAccepted') === 'true') {
      // Theme loading logic removed as it's handled by ThemeSwitcher
      // const savedTheme = CookieManager.getCookie('theme');
      // if (savedTheme) {
      //   document.body.classList.toggle('dark-mode', savedTheme === 'dark');
      // }
    }
  }

  // toggleDarkMode function removed

  // Animación del header al scroll (functionality to be handled by HeaderController)
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      // header.classList.add('scrolled'); // Commented out
    } else {
      // header.classList.remove('scrolled'); // Commented out
    }
  });

  // Animación de secciones al scroll (REMOVED - to be handled by js/animations.js or similar)

  // Animaciones suaves al scroll (REMOVED - to be handled by js/animations.js or similar)

  // Menú móvil con animaciones suaves - REMOVED (to be handled by HeaderController)
  // const menuToggle = document.querySelector('.menu-toggle');
  // const mobileMenu = document.querySelector('.mobile-menu');
  // const menuItems = document.querySelectorAll('.mobile-menu li');
  // let isMenuOpen = false;

  // function toggleMenu() { ... } // Removed

  // menuToggle.addEventListener('click', toggleMenu); // Removed
  // menuItems.forEach(item => { ... }); // Removed
  // document.addEventListener('click', (e) => { ... }); // Removed
  // window.addEventListener('resize', () => { ... }); // Removed

  // darkModeButton.addEventListener("click", toggleDarkMode); // Removed
  // menuToggleButton.addEventListener("click", toggleMenu); // Removed

  // Initialize dark mode based on local storage (ThemeSwitcher should handle this)
  // const darkModeEnabled = localStorage.getItem("darkMode") === "true";
  // document.body.classList.add(darkModeEnabled ? "dark-mode" : "light-mode");

  // Close menu on outside click (specific to old menu, HeaderController should manage its own)
  // window.addEventListener("click", function (e) {
  //   if (!menu.contains(e.target) && !menuToggleButton.contains(e.target)) {
  //     menu.classList.remove("menu-open");
  //     document.getElementById("menuIcon").classList.add("fa-bars");
  //     document.getElementById("menuIcon").classList.remove("fa-times");
  //   }
  // });

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

  // Scroll animations (REMOVED - to be handled by js/animations.js or similar)

  // Loading animation
  const loader = document.createElement('div');
  loader.className = 'loading-overlay';
  loader.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loader);

  window.addEventListener('load', () => {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  });


  loadUserPreferences(); // Loads only non-theme preferences now

  // initMenu function and its DOMContentLoaded listener removed

  // Optimización de rendimiento
  const optimizeAnimations = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowPowered = navigator.hardwareConcurrency <= 4;

    if (prefersReducedMotion || isLowPowered) {
      document.body.classList.add('reduce-motion');
    }
  };

  // Detección de capacidades del dispositivo
  const detectDeviceCapabilities = () => {
    const supports = {
      touch: 'ontouchstart' in window,
      hover: window.matchMedia('(hover: hover)').matches,
      pointer: window.matchMedia('(pointer: fine)').matches,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };

    Object.entries(supports).forEach(([feature, supported]) => {
      document.documentElement.classList.toggle(`supports-${feature}`, supported);
    });
  };

  // Llamar a las funciones de optimización y detección al cargar
  window.addEventListener('load', () => {
    optimizeAnimations();
    detectDeviceCapabilities();
  });

  // Añadir tracking para descargas del reglamento
  document.querySelector('.rules-download').addEventListener('click', function(e) {
    // Registrar el evento de descarga
    console.log('Reglamento descargado');

    // Opcional: Mostrar mensaje de confirmación
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      icon: 'success',
      title: 'Descarga iniciada'
    });
  });
});
