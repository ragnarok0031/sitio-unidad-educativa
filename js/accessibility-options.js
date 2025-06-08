class AccessibilityOptions {
  constructor() {
    this.init();
  }

  init() {
    this.createControls();
    this.setupListeners();
    this.loadSavedPreferences();
  }

  createControls() {
    const controls = `
      <button class="accessibility-toggle" aria-label="Opciones de accesibilidad">
        <i class="fas fa-universal-access"></i>
      </button>
      <div class="accessibility-panel" hidden>
        <h2>Accesibilidad</h2>
        <div class="font-controls">
          <button id="disminuirTexto">A-</button>
          <button id="restaurarTexto">A</button>
          <button id="aumentarTexto">A+</button>
        </div>
        <div class="mode-controls">
          <button id="altoContraste">Alto contraste</button>
          <button id="modoDislexia">Modo dislexia</button>
          <button id="modoOscuro">Modo oscuro</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', controls);
  }

  setupListeners() {
    // Font size controls
    document.getElementById('aumentarTexto').onclick = () => this.setFontSize(1.2);
    document.getElementById('disminuirTexto').onclick = () => this.setFontSize(0.9);
    document.getElementById('restaurarTexto').onclick = () => this.setFontSize(1);

    // Mode toggles
    document.getElementById('altoContraste').onclick = () => this.toggleMode('alto-contraste');
    document.getElementById('modoDislexia').onclick = () => this.toggleMode('modo-dislexia');
    document.getElementById('modoOscuro').onclick = () => { if (window.themeSwitcher document.getElementById('modoOscuro').onclick = () => this.toggleMode('modo-oscuro');document.getElementById('modoOscuro').onclick = () => this.toggleMode('modo-oscuro'); typeof window.themeSwitcher.toggleTheme === 'function') window.themeSwitcher.toggleTheme(); };
  }

  setFontSize(size) {
    document.documentElement.style.setProperty('--texto-base', size + 'rem');
    localStorage.setItem('fontSize', size);
  }

  toggleMode(mode) {
    document.body.classList.toggle(mode);
    localStorage.setItem(mode, document.body.classList.contains(mode));
  }

  loadSavedPreferences() {
    // Load font size
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize) this.setFontSize(Number(fontSize));

    // Load modes
    ['alto-contraste', 'modo-dislexia', 'modo-oscuro'].forEach(mode => {
      if (localStorage.getItem(mode) === 'true') {
        document.body.classList.add(mode);
      }
    });
  }
}

// Initialize
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    new AccessibilityOptions();
  });
}
