class ThemeSwitcher {
    constructor() {
        this.init();
    }

    init() {
        // Detectar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');

        // Aplicar tema guardado o preferencia del sistema
        if (savedTheme) {
            document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        } else {
            document.body.classList.toggle('dark-mode', prefersDark);
        }

        // Escuchar cambios en preferencia del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.body.classList.toggle('dark-mode', e.matches);
            }
        });

        // Precargar imágenes
        this.preloadImages();
    }

    preloadImages() {
        const images = ['/images/logo-light.png', '/images/logo-dark.png'];
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    toggleTheme() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = new ThemeSwitcher();
});
