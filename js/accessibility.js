class AccessibilityManager {
  constructor() {
    this.init();
    this.loadPreferences();
  }

  init() {
    // Tamaño de texto
    this.fontSizeControls = {
      increase: document.querySelector('.increase-font'),
      decrease: document.querySelector('.decrease-font'),
      reset: document.querySelector('.reset-font')
    };

    // Controles de modo
    this.toggles = {
      contrast: document.querySelector('.toggle-contrast'),
      dyslexic: document.querySelector('.toggle-dyslexic'),
      darkMode: document.querySelector('.toggle-dark-mode')
    };

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Tamaño de texto
    this.fontSizeControls.increase?.addEventListener('click', () => this.changeFontSize(1));
    this.fontSizeControls.decrease?.addEventListener('click', () => this.changeFontSize(-1));
    this.fontSizeControls.reset?.addEventListener('click', () => this.resetFontSize());

    // Modos
    this.toggles.contrast?.addEventListener('click', () => this.toggleHighContrast());
    this.toggles.dyslexic?.addEventListener('click', () => this.toggleDyslexicMode());
    this.toggles.darkMode?.addEventListener('click', () => this.toggleDarkMode());

    // Detectar preferencia del sistema
    this.checkSystemPreferences();
  }

  loadPreferences() {
    const prefs = JSON.parse(localStorage.getItem('accessibility')) || {};
    
    if (prefs.fontSize) document.documentElement.style.setProperty('--base-font-size', prefs.fontSize);
    if (prefs.highContrast) this.toggleHighContrast(true);
    if (prefs.dyslexicMode) this.toggleDyslexicMode(true);
    if (prefs.darkMode) this.toggleDarkMode(true);
  }

  savePreferences() {
    const prefs = {
      fontSize: document.documentElement.style.getPropertyValue('--base-font-size'),
      highContrast: document.body.classList.contains('high-contrast'),
      dyslexicMode: document.body.classList.contains('dyslexic-mode'),
      darkMode: document.body.classList.contains('dark-mode')
    };
    
    localStorage.setItem('accessibility', JSON.stringify(prefs));
  }

  changeFontSize(step) {
    const root = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(root).fontSize);
    const newSize = currentSize + (step * 2);
    
    if (newSize >= 12 && newSize <= 24) {
      root.style.setProperty('--base-font-size', `${newSize}px`);
      this.savePreferences();
      this.announceChange(`Tamaño de texto ${step > 0 ? 'aumentado' : 'reducido'}`);
    }
  }

  resetFontSize() {
    document.documentElement.style.setProperty('--base-font-size', '16px');
    this.savePreferences();
    this.announceChange('Tamaño de texto restaurado');
  }

  toggleHighContrast(init = false) {
    document.body.classList.toggle('high-contrast');
    if (!init) {
      this.savePreferences();
      this.announceChange('Modo alto contraste ' + 
        (document.body.classList.contains('high-contrast') ? 'activado' : 'desactivado'));
    }
  }

  toggleDyslexicMode(init = false) {
    document.body.classList.toggle('dyslexic-mode');
    if (!init) {
      this.savePreferences();
      this.announceChange('Modo dislexia ' +
        (document.body.classList.contains('dyslexic-mode') ? 'activado' : 'desactivado'));
    }
  }

  toggleDarkMode(init = false) {
    const isDark = document.body.classList.toggle('dark-mode');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (!init) {
      this.savePreferences();
      this.announceChange('Modo ' + (isDark ? 'oscuro' : 'claro') + ' activado');
    }
  }

  checkSystemPreferences() {
    // Detectar preferencia de tema del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (e) => {
      if (!localStorage.getItem('accessibility')) {
        this.toggleDarkMode(e.matches);
      }
    });

    // Detectar preferencia de movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduce-motion');
    }
  }

  announceChange(message) {
    const announcer = document.getElementById('a11y-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new AccessibilityManager();
});
