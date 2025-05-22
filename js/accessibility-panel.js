class AccessibilityPanel {
  constructor() {
    this.createPanel();
    this.init();
  }

  createPanel() {
    const panel = `
      <button id="btnAccesibilidad" class="a11y-trigger" aria-label="Opciones de accesibilidad" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-universal-access" aria-hidden="true"></i>
      </button>
      
      <div id="panelAccesibilidad" class="a11y-panel" role="dialog" aria-modal="true" hidden>
        <header class="panel-header">
          <h2>Opciones de accesibilidad</h2>
          <button class="close-panel" aria-label="Cerrar panel">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
        </header>

        <div class="panel-content">
          <div class="option-group">
            <h3>Tamaño del texto</h3>
            <div class="font-controls">
              <button class="font-btn" data-action="decrease" aria-label="Reducir texto">A-</button>
              <button class="font-btn" data-action="reset" aria-label="Tamaño normal">A</button>
              <button class="font-btn" data-action="increase" aria-label="Aumentar texto">A+</button>
            </div>
          </div>

          <div class="option-group">
            <h3>Modo de visualización</h3>
            <div class="mode-controls">
              <button class="mode-btn" data-mode="contrast" aria-pressed="false">
                <i class="fas fa-adjust" aria-hidden="true"></i>
                Alto contraste
              </button>
              <button class="mode-btn" data-mode="dyslexic" aria-pressed="false">
                <i class="fas fa-font" aria-hidden="true"></i>
                Modo dislexia
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', panel);
  }

  init() {
    this.panel = document.getElementById('panelAccesibilidad');
    this.trigger = document.getElementById('btnAccesibilidad');
    this.closeBtn = this.panel.querySelector('.close-panel');
    
    // Eventos del panel
    this.trigger.addEventListener('click', () => this.togglePanel());
    this.closeBtn.addEventListener('click', () => this.closePanel());
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.panel.hidden) {
        this.closePanel();
      }
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!this.panel.hidden && 
          !this.panel.contains(e.target) && 
          !this.trigger.contains(e.target)) {
        this.closePanel();
      }
    });

    // Mantener el foco dentro del panel
    this.panel.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusables = this.panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Inicializar controles
    this.initializeControls();
  }

  togglePanel() {
    const isHidden = this.panel.hidden;
    this.panel.hidden = !isHidden;
    this.trigger.setAttribute('aria-expanded', !isHidden);
    
    if (!isHidden) {
      this.closeBtn.focus();
    }
  }

  closePanel() {
    this.panel.hidden = true;
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.focus();
  }

  initializeControls() {
    // Controles de texto
    const fontButtons = this.panel.querySelectorAll('.font-btn');
    fontButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        document.dispatchEvent(new CustomEvent('a11y-font-change', { detail: action }));
      });
    });

    // Controles de modo
    const modeButtons = this.panel.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        const isActive = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', !isActive);
        document.dispatchEvent(new CustomEvent('a11y-mode-change', { 
          detail: { mode, active: !isActive }
        }));
      });
    });
  }
}

// Asegurar que se inicializa cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  new AccessibilityPanel();
});
