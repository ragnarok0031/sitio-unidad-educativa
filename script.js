document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('modoOscuroBtn');
    const body = document.body;
    const MODO_OSCURO_KEY = 'modoOscuro';
    const ICONOS = {
        OSCURO: '&#9790;',
        CLARO: '&#9728;'
    };

    const toggleModoOscuro = () => {
        body.classList.toggle('oscuro');
        const esOscuro = body.classList.contains('oscuro');
        localStorage.setItem(MODO_OSCURO_KEY, esOscuro);
        actualizarIcono(esOscuro);
    };

    const actualizarIcono = (esOscuro) => {
        btn.innerHTML = esOscuro ? ICONOS.OSCURO : ICONOS.CLARO;
        btn.setAttribute('aria-pressed', esOscuro);
        btn.setAttribute('title', esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    };

    // Inicialización
    const modoGuardado = localStorage.getItem(MODO_OSCURO_KEY) === 'true';
    if (modoGuardado) {
        body.classList.add('oscuro');
    }
    actualizarIcono(modoGuardado);

    // Event listeners
    btn.addEventListener('click', toggleModoOscuro);
    // Agregar soporte para tecla espaciadora
    btn.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            toggleModoOscuro();
        }
    });
});
