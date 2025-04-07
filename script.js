document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('modoOscuroBtn');
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    const body = document.body;
    const MODO_OSCURO_KEY = 'modoOscuro';
    const ICONOS = {
        OSCURO: 'images/modo_oscuro.png', // Ruta del icono de noche
        CLARO: 'images/modo_claro.png'   // Ruta del icono de día
    };

    const toggleModoOscuro = () => {
        body.classList.toggle('oscuro');
        const esOscuro = body.classList.contains('oscuro');
        localStorage.setItem(MODO_OSCURO_KEY, esOscuro);
        actualizarIcono(esOscuro);
    };

    const actualizarIcono = (esOscuro) => {
        btn.innerHTML = `<img src="${esOscuro ? ICONOS.OSCURO : ICONOS.CLARO}" alt="${esOscuro ? 'Modo oscuro' : 'Modo claro'}">`;
        btn.setAttribute('aria-pressed', esOscuro);
        btn.setAttribute('title', esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    };

    const toggleMenu = () => {
        const isHidden = menu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', !isHidden);
    };

    // Inicialización
    const modoGuardado = localStorage.getItem(MODO_OSCURO_KEY) === 'true';
    if (modoGuardado) {
        body.classList.add('oscuro');
    }
    actualizarIcono(modoGuardado);

    // Event listeners
    btn.addEventListener('click', toggleModoOscuro);
    menuBtn.addEventListener('click', toggleMenu);
    // Agregar soporte para tecla espaciadora
    btn.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            toggleModoOscuro();
        }
    });
});
