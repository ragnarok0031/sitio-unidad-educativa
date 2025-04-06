// MENÚ HAMBURGUESA
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
});

// MODO OSCURO
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

// ACTUALIZAR AÑO DEL FOOTER
document.getElementById('current-year').textContent = new Date().getFullYear();
