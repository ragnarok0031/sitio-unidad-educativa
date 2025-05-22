class AccessibilityOptions {
  constructor() {
    this.initializeSettings();
    this.setupPanel();
    this.setupControls();
    this.loadSavedPreferences();
  }

  initializeSettings() {
    this.settings = {
      fontSize: 1,
      highContrast: false,
      dyslexicMode: false,
      darkMode: false
    };
  }

  setupPanel() {
    const panel = `
      <button class="a11y-trigger" aria-label="Opciones de accesibilidad">
        <i class="fas fa-universal-access"></i>
      </button>
      <div class="a11y-panel" hidden>
        <div class="panel-header">
          <h2>Opciones de accesibilidad</h2>
          <button class="close-panel" aria-label="Cerrar">×</button>
        </div>
        <div class="panel-content">
          <div class="font-controls">
            <h3>Tamaño del texto</h3>
            <button data-size="decrease">A-</button>
            <button data-size="reset">A</button>
            <button data-size="increase">A+</button>
          </div>
          <div class="mode-toggles">
            <button class="mode-toggle" data-mode="contrast">Alto contraste</button>
            <button class="mode-toggle" data-mode="dyslexic">Modo dislexia</button>
            <button class="mode-toggle" data-mode="dark">Modo oscuro</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', panel);
  }

  setupControls() {
    // ... resto del código de inicialización ...
  }
}
