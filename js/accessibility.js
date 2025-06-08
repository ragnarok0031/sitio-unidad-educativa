class AccessibilityManager {
  constructor() {
    this.controls = {
      fontSize: document.querySelectorAll('.font-controls button'),
      contrast: document.querySelector('.toggle-contrast'),
      dyslexic: document.querySelector('.toggle-dyslexic'),
      dark: document.querySelector('.toggle-dark')
    };

    this.announcer = document.getElementById('a11y-announcer');
    this.preferences = this.loadPreferences();

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.applyPreferences();
    this.setupKeyboardNavigation();
  }

  setupEventListeners() {
    // Control de fuente
    this.controls.fontSize.forEach(button => {
      button.addEventListener('click', () => {
        const action = button.classList.contains('increase-font') ? 'increase' :
                      button.classList.contains('decrease-font') ? 'decrease' : 'reset';
        this.changeFontSize(action);
      });
    });

    // Controles de modo
    Object.entries({
      contrast: 'high-contrast',
      dyslexic: 'dyslexic-mode',
      dark: 'dark-mode'
    }).forEach(([control, className]) => {
      this.controls[control]?.addEventListener('click', () => this.toggleMode(className));
    });

    // Detectar preferencias del sistema
    this.watchSystemPreferences();
  }

  setupKeyboardNavigation() {
    // Añadir indicadores visuales para navegación por teclado
    document.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('using-keyboard');
    });

    // Atajos de teclado
    document.addEventListener('keydown', e => {
      if (e.altKey) {
        switch(e.key) {
          case '1': this.navigateTo('#inicio'); break;
          case '2': this.navigateTo('#recursos'); break;
          case 'a': this.focusAccessibilityControls(); break;
        }
      }
    });
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
    if (mode === 'dark-mode') {
      if (window.themeSwitcher && typeof window.themeSwitcher.toggleTheme === 'function') {
        window.themeSwitcher.toggleTheme();
      }
      // ThemeSwitcher handles class toggling and storage for dark mode
      const isActuallyEnabled = document.body.classList.contains('dark-mode');
      const button = this.controls[this.getControlKey(mode)];
      if (button) {
        button.setAttribute('aria-pressed', isActuallyEnabled);
      }
      this.announce(`${this.getModeLabel(mode)} ${isActuallyEnabled ? 'activado' : 'desactivado'}`);
      // Dark mode state is saved by ThemeSwitcher via localStorage['theme']
    } else {
      // Original logic for other modes (e.g., high-contrast, dyslexic-mode)
      const isEnabled = document.body.classList.toggle(mode);
      const button = this.controls[this.getControlKey(mode)];
      if (button) {
        button.setAttribute('aria-pressed', isEnabled);
      }
      this.savePreference(mode, isEnabled);
      this.announce(`${this.getModeLabel(mode)} ${isEnabled ? 'activado' : 'desactivado'}`);
    }
  }

  getControlKey(mode) {
    const map = {
      'high-contrast': 'contrast',
      'dyslexic-mode': 'dyslexic',
      'dark-mode': 'dark'
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

  announce(message, priority = 'polite') {
    if (this.announcer) {
      const announcement = document.createElement('div');
      announcement.textContent = message;

      this.announcer.textContent = ''; // Limpiar anuncios anteriores
      this.announcer.appendChild(announcement);
      this.announcer.setAttribute('aria-live', priority);
    }
  }

  navigateTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.announce(`Navegando a ${element.textContent || 'sección solicitada'}`);
    }
  }

  focusAccessibilityControls() {
    const controls = document.querySelector('.a11y-controls');
    if (controls) {
      controls.focus();
      this.announce('Controles de accesibilidad activados');
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

      // Restaurar modos (excepto dark-mode, que es manejado por ThemeSwitcher)
      ['high-contrast', 'dyslexic-mode'].forEach(mode => {
        if (preferences[mode]) {
          document.body.classList.add(mode);
          const button = this.controls[this.getControlKey(mode)];
          if (button) {
            button.setAttribute('aria-pressed', 'true');
          }
        }
      });
      // Dark mode es aplicado por ThemeSwitcher, pero actualizamos el botón aquí si es necesario
      // basado en el estado que ThemeSwitcher haya aplicado.
      if (this.controls.dark) {
          const isDarkModeActive = document.body.classList.contains('dark-mode');
          this.controls.dark.setAttribute('aria-pressed', isDarkModeActive);
      }

    } catch (e) {
      console.warn('Error loading accessibility preferences:', e);
    }
  }

  watchSystemPreferences() {
    // Escuchar cambios en preferencia de alto contraste del sistema
    const highContrastMediaQuery = window.matchMedia('(forced-colors: active)');
    highContrastMediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.add('high-contrast');
            // Actualizar estado del botón si es necesario
            if (this.controls.contrast) {
                this.controls.contrast.setAttribute('aria-pressed', 'true');
            }
            this.announce('Alto contraste activado por preferencia del sistema.');
        } else {
            // Solo desactivar si no fue activado manualmente por el usuario
            const prefs = JSON.parse(localStorage.getItem('a11y-preferences') || '{}');
            if (!prefs['high-contrast']) {
                document.body.classList.remove('high-contrast');
                if (this.controls.contrast) {
                    this.controls.contrast.setAttribute('aria-pressed', 'false');
                }
                this.announce('Alto contraste desactivado por preferencia del sistema.');
            }
        }
    });
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new AccessibilityManager();
});
