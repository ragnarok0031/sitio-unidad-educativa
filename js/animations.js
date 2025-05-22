class AnimationController {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupHoverAnimations();
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.dataset.animateChildren) {
              this.animateChildren(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach(element => {
      element.classList.add('will-animate');
      observer.observe(element);
    });
  }

  setupHoverAnimations() {
    document.querySelectorAll('[data-hover]').forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.classList.add('hover-active');
      });
      
      element.addEventListener('mouseleave', () => {
        element.classList.remove('hover-active');
      });
    });
  }

  animateChildren(parent) {
    const children = parent.children;
    Array.from(children).forEach((child, index) => {
      child.style.animationDelay = `${index * 0.1}s`;
      child.classList.add('animate-child');
    });
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new AnimationController();
});
