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

class KeyboardNavigation {
  constructor() {
    this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.init();
  }

  init() {
    this.setupFocusManagement();
    this.setupKeyboardShortcuts();
    this.setupSkipLinks();
    this.setupFocusTrap();
  }

  setupFocusManagement() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-user');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-user');
    });
  }

  setupKeyboardShortcuts() {
    const shortcuts = {
      'Alt+1': () => document.querySelector('#inicio').focus(),
      'Alt+2': () => document.querySelector('#recursos').focus(),
      'Alt+3': () => document.querySelector('#sobre-gap').focus(),
      'Alt+A': () => document.querySelector('.accessibility-controls').focus(),
      'Alt+M': () => document.querySelector('.menu-toggle').focus()
    };

    document.addEventListener('keydown', (e) => {
      const shortcut = `${e.altKey ? 'Alt+' : ''}${e.key}`;
      if (shortcuts[shortcut]) {
        e.preventDefault();
        shortcuts[shortcut]();
        Announcer.announce(`Navegado a ${e.target.textContent}`);
      }
    });
  }

  setupSkipLinks() {
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        target.tabIndex = -1;
        target.focus();
        Announcer.announce('Saltado al contenido principal');
      });
    });
  }

  setupFocusTrap() {
    const modals = document.querySelectorAll('[role="dialog"]');
    modals.forEach(modal => {
      const focusables = modal.querySelectorAll(this.focusableElements);
      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];

      modal.addEventListener('keydown', (e) => {
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
    });
  }
}

class MediaAccessibility {
  constructor() {
    this.init();
  }

  init() {
    this.setupImageAlts();
    this.setupVideoAccessibility();
    this.setupAudioDescriptions();
  }

  setupImageAlts() {
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
      console.warn('Imagen sin atributo alt:', img.src);
      img.alt = img.src.split('/').pop() || 'Imagen sin descripción';
    });
  }

  setupVideoAccessibility() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      if (!video.hasAttribute('controls')) {
        video.setAttribute('controls', '');
      }
      
      if (!video.querySelector('track[kind="captions"]')) {
        console.warn('Video sin subtítulos:', video.src);
      }

      video.addEventListener('play', () => {
        Announcer.announce('Video iniciado');
      });

      video.addEventListener('pause', () => {
        Announcer.announce('Video pausado');
      });
    });
  }

  setupAudioDescriptions() {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      if (!audio.hasAttribute('controls')) {
        audio.setAttribute('controls', '');
      }

      const description = audio.getAttribute('aria-label') || 
                         audio.getAttribute('title');
      
      if (!description) {
        console.warn('Audio sin descripción:', audio.src);
      }
    });
  }
}

class FormAccessibility {
  constructor() {
    this.init();
  }

  init() {
    this.setupFormValidation();
    this.setupErrorHandling();
    this.setupFormAnnouncements();
  }

  setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, select, textarea');
      
      inputs.forEach(input => {
        if (!input.getAttribute('aria-required') && input.required) {
          input.setAttribute('aria-required', 'true');
        }

        input.addEventListener('invalid', (e) => {
          e.preventDefault();
          this.showError(input);
        });
      });
    });
  }

  setupErrorHandling() {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-summary';
    errorContainer.setAttribute('role', 'alert');
    errorContainer.setAttribute('aria-live', 'assertive');
    document.body.appendChild(errorContainer);
  }

  showError(input) {
    const errorId = `error-${input.id || Math.random().toString(36).substr(2, 9)}`;
    const errorMessage = input.validationMessage || 'Por favor, complete este campo correctamente';
    
    const errorElement = document.createElement('div');
    errorElement.id = errorId;
    errorElement.className = 'form-error';
    errorElement.textContent = errorMessage;
    
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorId);
    
    input.parentNode.appendChild(errorElement);
    Announcer.announce(errorMessage);
  }

  setupFormAnnouncements() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', () => {
        Announcer.announce('Formulario enviado con éxito');
      });
    });
  }
}

// Inicializar sistemas
document.addEventListener('DOMContentLoaded', () => {
  new HelpSystem();
  new AccessibilityControls();
  new KeyboardNavigation();
  new MediaAccessibility();
  new FormAccessibility();
});
