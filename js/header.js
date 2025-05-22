class HeaderController {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.navList = document.querySelector('.nav-list');
    this.lastScroll = 0;
    
    this.init();
  }

  init() {
    this.setupMenuToggle();
    this.setupScrollBehavior();
    this.setupResizeHandler();
  }

  setupMenuToggle() {
    this.menuToggle?.addEventListener('click', () => {
      const isExpanded = this.menuToggle.getAttribute('aria-expanded') === 'true';
      this.menuToggle.setAttribute('aria-expanded', !isExpanded);
      this.navList.classList.toggle('active');
      
      // Prevenir scroll del body
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
  }

  setupScrollBehavior() {
    let scrollTimer = null;
    
    window.addEventListener('scroll', () => {
      if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
      }

      scrollTimer = setTimeout(() => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
          this.header.classList.add('scrolled');
        } else {
          this.header.classList.remove('scrolled');
        }

        if (currentScroll > this.lastScroll && currentScroll > 200) {
          this.header.classList.add('scroll-down');
          this.header.classList.remove('scroll-up');
        } else {
          this.header.classList.add('scroll-up');
          this.header.classList.remove('scroll-down');
        }

        this.lastScroll = currentScroll;
      }, 100);
    }, { passive: true });
  }

  setupResizeHandler() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.navList.classList.remove('active');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new HeaderController();
});
