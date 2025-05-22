class HeaderController {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.navList = document.querySelector('.nav-list');
    this.init();
  }

  init() {
    this.setupMenuToggle();
    this.setupScrollBehavior();
    this.setupKeyboardNav();
    this.setupResizeHandler();
  }

  setupMenuToggle() {
    this.menuToggle?.addEventListener('click', () => {
      const isExpanded = this.menuToggle.getAttribute('aria-expanded') === 'true';
      
      // Mejorar toggle del menú
      if (!isExpanded) {
        // Antes de abrir, scrollear al inicio
        this.navList.scrollLeft = 0;
      }
      
      this.toggleMenu(!isExpanded);
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!this.navList.contains(e.target) && !this.menuToggle.contains(e.target)) {
        this.toggleMenu(false);
      }
    });
  }

  toggleMenu(open) {
    this.menuToggle.setAttribute('aria-expanded', open);
    this.navList.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
    
    if (open) {
      this.trapFocus();
    }
  }

  trapFocus() {
    const focusables = this.navList.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    this.navList.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }

  setupScrollBehavior() {
    let lastScroll = 0;
    let scrollTimer = null;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
      if (scrollTimer !== null) clearTimeout(scrollTimer);

      scrollTimer = setTimeout(() => {
        const currentScroll = window.pageYOffset;
        
        if (Math.abs(currentScroll - lastScroll) < scrollThreshold) return;
        
        // Mejorar comportamiento del header
        if (currentScroll > lastScroll && currentScroll > 100) {
          this.header.classList.add('scroll-down');
          this.header.classList.remove('scroll-up');
          
          // Cerrar menú al hacer scroll hacia abajo
          if (this.menuToggle.getAttribute('aria-expanded') === 'true') {
            this.toggleMenu(false);
          }
        } else {
          this.header.classList.add('scroll-up');
          this.header.classList.remove('scroll-down');
        }
        
        lastScroll = currentScroll;
      }, 100);
    }, { passive: true });
  }

  setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navList.classList.contains('active')) {
        this.toggleMenu(false);
      }
    });
  }

  setupResizeHandler() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.toggleMenu(false);
      }
    });
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new HeaderController();
});
