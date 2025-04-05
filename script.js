// script.js
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        // Agrega animación de transición suave
        document.body.style.transition = 'transform 0.5s';
        document.body.style.transform = 'scale(0.9)';
        setTimeout(() => {
            document.body.style.transform = 'scale(1)';
        }, 500);
    });
});