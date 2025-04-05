document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        // Animación de escala suave al hacer clic
        document.body.style.transition = 'transform 0.5s';
        document.body.style.transform = 'scale(0.9)';
        setTimeout(() => {
            document.body.style.transform = 'scale(1)';
        }, 500);
    });
});
