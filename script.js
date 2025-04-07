// Menú hamburguesa
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
    document.getElementById('menuBtn').setAttribute('aria-expanded', !menu.classList.contains('hidden'));
}

// Menú responsive
document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);
document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-toggle') && !e.target.closest('#menu')) {
        const menu = document.getElementById('menu');
        menu.classList.add('hidden');
        menu.setAttribute('aria-expanded', 'false');
    }
});

// Modo oscuro
document.addEventListener('DOMContentLoaded', () => {
    const modoBtn = document.getElementById('modoOscuroBtn');
    const body = document.body;
    const MODO_OSCURO_KEY = 'modoOscuro';
    const ICONOS = {
        CLARO: 'images/modo_claro.png',
        OSCURO: 'images/modo_oscuro.png'
    };

    const toggleModoOscuro = () => {
        body.classList.toggle('oscuro');
        document.documentElement.style.setProperty('--color-header', body.classList.contains('oscuro') ? '#2d2d2d' : '#ffffff');
        localStorage.setItem(MODO_OSCURO_KEY, body.classList.contains('oscuro'));
        actualizarIcono();
    };

    const actualizarIcono = () => {
        const esOscuro = body.classList.contains('oscuro');
        modoBtn.innerHTML = `<img src="${esOscuro ? ICONOS.OSCURO : ICONOS.CLARO}" alt="${esOscuro ? 'Modo oscuro' : 'Modo claro'}">`;
        modoBtn.setAttribute('aria-pressed', esOscuro);
    };

    // Restaurar modo oscuro guardado
    const modoGuardado = localStorage.getItem(MODO_OSCURO_KEY) === 'true';
    if (modoGuardado) {
        body.classList.add('oscuro');
        document.documentElement.style.setProperty('--color-header', '#2d2d2d');
    }
    actualizarIcono();

    // Eventos
    modoBtn.addEventListener('click', toggleModoOscuro);
    document.getElementById('menuBtn').addEventListener('click', toggleMenu);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !document.getElementById('menu').classList.contains('hidden')) {
            toggleMenu();
        }
    });
});

// Función para mapa
function showMap() {
    window.open(
        "https://www.google.com/maps/place/UE+%22Guido+Arce+Pimentel%22/@-18.0653553,-64.1226254,1683m/data=!3m1!1e3!4m6!3m5!1s0x93f013006e9e0c51:0x5d3dfe25282e64aa!8m2!3d-18.0633661!4d-64.1212119!16s%2Fg%2F11ldr0xj4m?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoASAFQAw%3D%3D",
        "_blank"
    );
}

// Actualizar año en footer
document.querySelector('.copyright').textContent = 
    `© ${new Date().getFullYear()} Unidad Educativa Guido Arce Pimentel`;
