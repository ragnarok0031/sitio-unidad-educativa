const CookieManager = {
  categories: {
    essential: {
      name: 'Cookies Esenciales',
      description: 'Necesarias para el funcionamiento básico del sitio',
      required: true
    },
    preferences: {
      name: 'Preferencias',
      description: 'Guardan configuraciones personalizadas del usuario',
      required: false
    },
    analytics: {
      name: 'Análisis',
      description: 'Nos ayudan a mejorar el sitio mediante datos anónimos',
      required: false
    },
    personalization: {
      name: 'Personalización',
      description: 'Permiten adaptar contenidos según tus intereses',
      required: false
    }
  },

  init() {
    if (!this.hasConsent()) {
      this.showCookieBanner();
    }
    this.loadPreferences();
  },

  setCookie(name, value, days = 365, category = 'essential') {
    if (!this.hasConsent(category) && !this.categories[category].required) {
      return false;
    }
    
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
    return true;
  },

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  },

  hasConsent(category = 'essential') {
    const consents = this.getConsents();
    return consents[category] || this.categories[category].required;
  },

  getConsents() {
    const consents = this.getCookie('cookie_consents');
    return consents ? JSON.parse(consents) : {};
  },

  saveConsents(consents) {
    this.setCookie('cookie_consents', JSON.stringify(consents));
    this.loadPreferences();
  },

  showCookieBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-content">
        <h3>Configuración de Cookies</h3>
        <p>Utilizamos cookies para mejorar tu experiencia educativa. Puedes personalizar tus preferencias:</p>
        <form id="cookieForm">
          ${Object.entries(this.categories).map(([key, value]) => `
            <div class="cookie-option">
              <label>
                <input type="checkbox" name="${key}" 
                  ${value.required ? 'checked disabled' : ''}
                  ${this.hasConsent(key) ? 'checked' : ''}>
                <strong>${value.name}</strong>
                <span>${value.description}</span>
              </label>
            </div>
          `).join('')}
          <div class="cookie-actions">
            <button type="button" class="btn-accept-all">Aceptar Todas</button>
            <button type="button" class="btn-save-preferences">Guardar Preferencias</button>
            <button type="button" class="btn-essential-only">Solo Esenciales</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(banner);

    // Event listeners
    banner.querySelector('.btn-accept-all').addEventListener('click', () => {
      const consents = Object.fromEntries(
        Object.keys(this.categories).map(key => [key, true])
      );
      this.saveConsents(consents);
      banner.remove();
    });

    banner.querySelector('.btn-save-preferences').addEventListener('click', () => {
      const form = document.getElementById('cookieForm');
      const consents = Object.fromEntries(
        Array.from(form.elements)
          .filter(el => el.type === 'checkbox')
          .map(el => [el.name, el.checked])
      );
      this.saveConsents(consents);
      banner.remove();
    });

    banner.querySelector('.btn-essential-only').addEventListener('click', () => {
      const consents = Object.fromEntries(
        Object.entries(this.categories)
          .map(([key, value]) => [key, value.required])
      );
      this.saveConsents(consents);
      banner.remove();
    });
  },

  loadPreferences() {
    const consents = this.getConsents();
    
    // Cargar tema
    if (this.hasConsent('preferences')) {
      const theme = this.getCookie('theme');
      if (theme) document.body.setAttribute('data-theme', theme);
    }

    // Cargar idioma
    if (this.hasConsent('preferences')) {
      const lang = this.getCookie('language');
      if (lang) document.documentElement.lang = lang;
    }

    // Inicializar analytics si está permitido
    if (this.hasConsent('analytics')) {
      this.initAnalytics();
    }

    // Cargar personalización
    if (this.hasConsent('personalization')) {
      this.loadPersonalization();
    }
  },

  initAnalytics() {
    // Código para inicializar analytics
  },

  loadPersonalization() {
    // Código para cargar preferencias personalizadas
  }
};

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  CookieManager.init();
});
