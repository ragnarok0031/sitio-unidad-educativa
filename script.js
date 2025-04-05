// Botón de modo oscuro
const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

// Verificar modo almacenado
if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
    toggleButton.querySelector('.icon').textContent = '☀️'; // Cambiar a sol
}

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark);
    
    // Cambiar ícono
    const icon = toggleButton.querySelector('.icon');
    icon.textContent = isDark ? '☀️' : '🌙';
});

// ... Resto de tu código (animación de botones) ...
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.style.transition = 'transform 0.5s';
        document.body.style.transform = 'scale(0.9)';
        setTimeout(() => {
            document.body.style.transform = 'scale(1)';
        }, 500);
    });
});
