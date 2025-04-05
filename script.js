// Menú hamburguesa
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
});

// Modo oscuro
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const icon = darkModeToggle.querySelector('.icon');

if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
    icon.textContent = '☀️';
} else {
    icon.textContent = '🌙';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark);
    icon.textContent = isDark ? '☀️' : '🌙';
});

// Animación suave en botones
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('touchstart', () => {
        btn.style.transform = 'scale(0.95)';
    });
    btn.addEventListener('touchend', () => {
        btn.style.transform = 'scale(1)';
    });
});
