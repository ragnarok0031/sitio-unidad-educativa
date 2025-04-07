// Menú hamburguesa
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
}

// Menú responsive
document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);
document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-toggle') && !e.target.closest('.menu')) {
        document.querySelector('.menu').classList.remove('open');
    }
});

// Modo oscuro
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('modoOscuroBtn');
    const body = document.body;

    // Verificar modo oscuro guardado
    const modoGuardado = localStorage.getItem('modoOscuro');
    if (modoGuardado === 'true') {
        body.classList.add('oscuro');
    }

    btn.addEventListener('click', () => {
        body.classList.toggle('oscuro');
        localStorage.setItem('modoOscuro', body.classList.contains('oscuro'));
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
