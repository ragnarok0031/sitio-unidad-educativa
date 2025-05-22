class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.controls = {
      fontSize: document.querySelectorAll('.font-control-button'),
      contrast: document.querySelector('.toggle-contrast'),
      dyslexic: document.querySelector('.toggle-dyslexic'),
      darkMode: document.querySelector('.toggle-dark-mode')
    };

    this.announcer = document.getElementById('a11y-announcer');
    this.setupEventListeners();
    this.loadPreferences();
  }

  setupEventListeners() {
    // Control de tamaño de fuente
    this.controls.fontSize.forEach(button => {
      button.addEventListener('click', () => {
        const action = button.dataset.action;
        this.changeFontSize(action);
      });
    });

    // Toggles de modo
    this.controls.contrast?.addEventListener('click', () => this.toggleMode('high-contrast'));
    this.controls.dyslexic?.addEventListener('click', () => this.toggleMode('dyslexic-mode'));
    this.controls.darkMode?.addEventListener('click', () => this.toggleMode('dark-mode'));
  }

  changeFontSize(action) {
    const html = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(html).fontSize);
    
    let newSize;
    switch(action) {
      case 'increase':
        newSize = Math.min(currentSize * 1.1, 24);
        break;
      case 'decrease':
        newSize = Math.max(currentSize * 0.9, 14);
        break;
      default:
        newSize = 16;
    }

    html.style.fontSize = `${newSize}px`;
    this.savePreference('fontSize', newSize);
    this.announce(`Tamaño de texto ${action === 'reset' ? 'restaurado' : action === 'increase' ? 'aumentado' : 'reducido'}`);
  }

  toggleMode(mode) {
    const isEnabled = document.body.classList.toggle(mode);
    const button = this.controls[this.getControlKey(mode)];
    
    if (button) {
      button.setAttribute('aria-pressed', isEnabled);
    }

    this.savePreference(mode, isEnabled);
    this.announce(`${this.getModeLabel(mode)} ${isEnabled ? 'activado' : 'desactivado'}`);
  }

  getControlKey(mode) {
    const map = {
      'high-contrast': 'contrast',
      'dyslexic-mode': 'dyslexic',
      'dark-mode': 'darkMode'
    };
    return map[mode];
  }

  getModeLabel(mode) {
    const labels = {
      'high-contrast': 'Alto contraste',
      'dyslexic-mode': 'Modo dislexia',
      'dark-mode': 'Modo oscuro'
    };
    return labels[mode];
  }

  announce(message) {
    if (this.announcer) {
      this.announcer.textContent = message;
    }
  }

  savePreference(key, value) {
    try {
      const preferences = JSON.parse(localStorage.getItem('a11y-preferences') || '{}');
      preferences[key] = value;
      localStorage.setItem('a11y-preferences', JSON.stringify(preferences));
    } catch (e) {
      console.warn('Error saving accessibility preference:', e);
    }
  }

  loadPreferences() {
    try {
      const preferences = JSON.parse(localStorage.getItem('a11y-preferences') || '{}');
      
      // Restaurar tamaño de fuente
      if (preferences.fontSize) {
        document.documentElement.style.fontSize = `${preferences.fontSize}px`;
      }

      // Restaurar modos
      ['high-contrast', 'dyslexic-mode', 'dark-mode'].forEach(mode => {
        if (preferences[mode]) {
          document.body.classList.add(mode);
          const button = this.controls[this.getControlKey(mode)];
          if (button) {
            button.setAttribute('aria-pressed', 'true');
          }
        }
      });
    } catch (e) {
      console.warn('Error loading accessibility preferences:', e);
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new AccessibilityManager();
});
