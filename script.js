// Menú hamburguesa
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

const toggleMenu = () => {
    const isOpen = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
};

menuToggle.addEventListener('click', toggleMenu);

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
        menu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
    }
});

// Modo oscuro
const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkIcon = darkModeToggle.querySelector('.icon');

const updateDarkMode = () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', isDark);
    darkIcon.textContent = isDark ? '☀️' : '🌙';
};

if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
    darkIcon.textContent = '☀️';
}

darkModeToggle.addEventListener('click', updateDarkMode);

// Actualizar año del footer (CORREGIDO)
document.querySelector('.copyright').textContent = `© ${new Date().getFullYear()} Guido Arce Pimentel`;

// Cerrar menú con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
        toggleMenu();
    }
});

// ABRIRLOGÍA "G.A.P." EN MÓVILES (NUEVO)
document.querySelector('.logo').textContent = 
    window.innerWidth <= 767 ? 'G.A.P.' : 'Guido Arce Pimentel';

// Optimizar animaciones durante resize
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
        // Actualizar abreviatura del logo al cambiar el tamaño
        document.querySelector('.logo').textContent = 
            window.innerWidth <= 767 ? 'G.A.P.' : 'Guido Arce Pimentel';
    }, 400);
});
