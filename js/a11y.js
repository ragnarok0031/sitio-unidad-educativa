// Utilidad para anuncios a lectores de pantalla
const Announcer = {
  element: document.getElementById('announcer'),
  announce(message, priority = 'polite') {
    this.element.textContent = message;
    this.element.setAttribute('aria-live', priority);
  }
};

// Sistema de ayuda contextual
class HelpSystem {
  constructor() {
    this.button = document.querySelector('.help-toggle');
    this.content = document.querySelector('.help-content');
    this.isOpen = false;
    this.init();
  }

  init() {
    this.button.addEventListener('click', () => this.toggle());
    document.addEventListener('click', (e) => {
      if (!this.button.contains(e.target) && !this.content.contains(e.target)) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.button.setAttribute('aria-expanded', this.isOpen);
    this.content.hidden = !this.isOpen;
  }

  close() {
    this.isOpen = false;
    this.button.setAttribute('aria-expanded', false);
    this.content.hidden = true;
  }
}

// Controles de accesibilidad
class AccessibilityControls {
  constructor() {
    this.fontToggle = document.querySelector('.font-size-toggle');
    this.contrastToggle = document.querySelector('.contrast-toggle');
    this.dyslexicToggle = document.querySelector('.dyslexic-toggle');
    this.init();
  }

  init() {
    this.loadPreferences();
    this.fontToggle.addEventListener('click', () => this.toggleFontSize());
    this.contrastToggle.addEventListener('click', () => this.toggleContrast());
    this.dyslexicToggle.addEventListener('click', () => this.toggleDyslexicMode());
  }

  loadPreferences() {
    if (localStorage.getItem('largeText') === 'true') this.toggleFontSize(true);
    if (localStorage.getItem('highContrast') === 'true') this.toggleContrast(true);
    if (localStorage.getItem('dyslexicMode') === 'true') this.toggleDyslexicMode(true);
  }

  toggleFontSize(init = false) {
    const isEnabled = document.body.classList.toggle('large-text');
    this.fontToggle.setAttribute('aria-pressed', isEnabled);
    localStorage.setItem('largeText', isEnabled);
    if (!init) {
      Announcer.announce(isEnabled ? 'Texto grande activado' : 'Texto normal activado');
    }
  }

  toggleContrast(init = false) {
    const isEnabled = document.body.classList.toggle('high-contrast');
    this.contrastToggle.setAttribute('aria-pressed', isEnabled);
    localStorage.setItem('highContrast', isEnabled);
    if (!init) {
      Announcer.announce(isEnabled ? 'Alto contraste activado' : 'Contraste normal activado');
    }
  }

  toggleDyslexicMode(init = false) {
    const isEnabled = document.body.classList.toggle('dyslexic-mode');
    this.dyslexicToggle.setAttribute('aria-pressed', isEnabled);
    localStorage.setItem('dyslexicMode', isEnabled);
    if (!init) {
      Announcer.announce(isEnabled ? 'Modo dislexia activado' : 'Modo dislexia desactivado');
    }
  }
}

// Inicializar sistemas
document.addEventListener('DOMContentLoaded', () => {
  new HelpSystem();
  new AccessibilityControls();
  
  // Mejorar navegación por teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
});
