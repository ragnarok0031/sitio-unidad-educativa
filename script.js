document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidad existente
    const btn = document.getElementById('modoOscuroBtn');
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    const body = document.body;
    const MODO_OSCURO_KEY = 'modoOscuro';
    const ICONOS = {
        OSCURO: 'images/modo_oscuro.png',
        CLARO: 'images/modo_claro.png'
    };

    // Configuración de idioma
    const LANG_ES = 'es';
    const LANG_EN = 'en';
    let idiomaActual = Cookies.get('idioma') || LANG_ES;

    // Traducciones
    const traducciones = {
        [LANG_ES]: {
            tituloHero: "Formando Líderes del Mañana",
            subtítuloHero: "Excelencia académica en un entorno natural y comunitario",
            btnConoceMas: "Conoce más",
            nosotros: "Nosotros",
            sobreNosotros: "Sobre Nosotros",
            excelencia: "Excelencia Académica",
            comunidad: "Comunidad",
            valores: "Valores",
            brochure: "Descargar Brochure (PDF)",
            contacto: "Contacto",
            nombre: "Nombre completo:",
            email: "Correo electrónico:",
            mensaje: "Mensaje:",
            enviar: "Enviar Mensaje",
            contactoFooter: "¡Contáctanos para más información!",
            derechos: "Todos los derechos reservados"
        },
        [LANG_EN]: {
            tituloHero: "Training Future Leaders",
            subtítuloHero: "Academic excellence in a natural and community environment",
            btnConoceMas: "Learn More",
            nosotros: "About Us",
            sobreNosotros: "About Us",
            excelencia: "Academic Excellence",
            comunidad: "Community",
            valores: "Values",
            brochure: "Download Brochure (PDF)",
            contacto: "Contact",
            nombre: "Full Name:",
            email: "Email Address:",
            mensaje: "Message:",
            enviar: "Send Message",
            contactoFooter: "Contact us for more information!",
            derechos: "All rights reserved"
        }
    };

    // Función para actualizar el idioma
    function actualizarIdioma(idioma) {
        document.querySelectorAll('[data-traducir]').forEach(element => {
            const clave = element.getAttribute('data-traducir');
            if (traducciones[idioma] && traducciones[idioma][clave]) {
                element.textContent = traducciones[idioma][clave];
            }
        });
        
        // Actualizar atributos que necesitan traducción
        document.querySelectorAll('[data-traducir-placeholder]').forEach(element => {
            const clave = element.getAttribute('data-traducir-placeholder');
            if (traducciones[idioma] && traducciones[idioma][clave]) {
                element.setAttribute('placeholder', traducciones[idioma][clave]);
            }
        });
        
        // Actualizar botones de idioma
        document.getElementById('lang-es').classList.toggle('active', idioma === LANG_ES);
        document.getElementById('lang-en').classList.toggle('active', idioma === LANG_EN);
        
        Cookies.set('idioma', idioma, { expires: 365 });
        idiomaActual = idioma;
    }

    // Manejador de cambio de idioma
    document.getElementById('lang-es')?.addEventListener('click', () => {
        actualizarIdioma(LANG_ES);
    });
    
    document.getElementById('lang-en')?.addEventListener('click', () => {
        actualizarIdioma(LANG_EN);
    });

    // Función para inicializar el sistema de traducción
    function inicializarTraduccion() {
        actualizarIdioma(idiomaActual);
        
        // Agregar atributos de traducción a elementos importantes
        document.querySelector('.hero-title')?.setAttribute('data-traducir', 'tituloHero');
        document.querySelector('.hero-subtitle')?.setAttribute('data-traducir', 'subtítuloHero');
        document.querySelector('.btn-conoce-mas')?.setAttribute('data-traducir', 'btnConoceMas');
        document.querySelector('#nosotros h2')?.setAttribute('data-traducir', 'nosotros');
        document.querySelector('#nosotros .card:nth-child(1) h3')?.setAttribute('data-traducir', 'excelencia');
        document.querySelector('#nosotros .card:nth-child(2) h3')?.setAttribute('data-traducir', 'comunidad');
        document.querySelector('#nosotros .card:nth-child(3) h3')?.setAttribute('data-traducir', 'valores');
        document.querySelector('.btn-descargar')?.setAttribute('data-traducir', 'brochure');
        document.querySelector('#contacto h2')?.setAttribute('data-traducir', 'contacto');
        document.querySelector('#contactForm label[for="nombre"]')?.setAttribute('data-traducir', 'nombre');
        document.querySelector('#contactForm label[for="email"]')?.setAttribute('data-traducir', 'email');
        document.querySelector('#contactForm label[for="mensaje"]')?.setAttribute('data-traducir', 'mensaje');
        document.querySelector('.btn-enviar')?.setAttribute('data-traducir', 'enviar');
        document.querySelector('.footer-bottom p')?.textContent = `© 2025 Unidad Educativa Guido Arce Pimentel. ${traducciones[idiomaActual].derechos}`;
    }

    // Funcionalidad para el modo oscuro
    function toggleModoOscuro() {
        body.classList.toggle('oscuro');
        const esOscuro = body.classList.contains('oscuro');
        localStorage.setItem(MODO_OSCURO_KEY, esOscuro);
        actualizarIcono(esOscuro);
    }

    function actualizarIcono(esOscuro) {
        btn.innerHTML = `<img src="${esOscuro ? ICONOS.OSCURO : ICONOS.CLARO}" alt="${esOscuro ? 'Modo oscuro' : 'Modo claro'}">`;
        btn.setAttribute('aria-pressed', esOscuro);
        btn.setAttribute('title', esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }

    // Funcionalidad para el menú
    function toggleMenu() {
        const isHidden = menu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', !isHidden);
    }

    // API del clima
    const getWeather = async () => {
        const WEATHER_API_KEY = 'YOUR_API_KEY';
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Pampagrande,BO`);
            const data = await response.json();
            
            const weatherWidget = document.getElementById('weatherWidget');
            weatherWidget.innerHTML = `
                <i class="fas fa-temperature-high"></i>
                ${data.current.temp_c}°C
                <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
            `;
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    };

    // Generador de PDF
    const generatePDF = async () => {
        const { PDFDocument, rgb } = PDFLib;
        const doc = await PDFDocument.create();
        const page = doc.addPage();
        
        // Agregar contenido al PDF
        page.drawText('Unidad Educativa Guido Arce Pimentel', {
            x: 50,
            y: page.getHeight() - 50,
            size: 20,
            color: rgb(0, 0, 0),
        });
        
        const pdfBytes = await doc.save();
        download(pdfBytes, "brochure.pdf", "application/pdf");
    };

    // Funcionalidad para la búsqueda
    function inicializarBusqueda() {
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const termino = e.target.value.toLowerCase();
                // Aquí iría la lógica de búsqueda en el sitio
                console.log('Búsqueda:', termino);
            });
        }
    }

    // Funcionalidad para formularios
    function inicializarFormulario() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Aquí iría la lógica para enviar el formulario
                alert('Mensaje enviado con éxito');
                form.reset();
            });
        }
    }

    // Inicialización
    function inicializar() {
        // Modo oscuro
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

        // Inicializar otras funcionalidades
        inicializarTraduccion();
        inicializarBusqueda();
        inicializarFormulario();
        
        // Obtener clima si hay conexión
        if (navigator.onLine) {
            getWeather();
        }
    }

    // Ejecutar inicialización cuando el DOM esté cargado
    inicializar();
});