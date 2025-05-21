
// Translations
const translations = {
    es: {
        inicio: "Inicio",
        nosotros: "Nosotros",
        academico: "Académico",
        contacto: "Contacto",
        formandoLideres: "Formando Líderes del Mañana",
        excelenciaAcademica: "Excelencia académica y valores humanos",
        nombreCompleto: "Nombre completo",
        correoElectronico: "Correo electrónico",
        mensaje: "Mensaje",
        enviar: "Enviar",
        descargarBrochure: "Descargar Brochure",
        derechosReservados: "© 2025 U.E. Guido Arce Pimentel. Todos los derechos reservados."
    },
    en: {
        inicio: "Home",
        nosotros: "About Us",
        academico: "Academic",
        contacto: "Contact",
        formandoLideres: "Forming Tomorrow's Leaders",
        excelenciaAcademica: "Academic excellence and human values",
        nombreCompleto: "Full name",
        correoElectronico: "Email",
        mensaje: "Message",
        enviar: "Send",
        descargarBrochure: "Download Brochure",
        derechosReservados: "© 2025 U.E. Guido Arce Pimentel. All rights reserved."
    }
};

// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const languageSelect = document.getElementById('languageSelect');
const contactForm = document.getElementById('contactForm');
const pdfButton = document.getElementById('pdfButton');
const header = document.querySelector('header');

// Dark Mode
function initDarkMode() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setDarkMode(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        darkModeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('darkMode', isDark);
    }

    if (localStorage.getItem('darkMode') === null) {
        setDarkMode(prefersDarkScheme.matches);
    } else {
        setDarkMode(localStorage.getItem('darkMode') === 'true');
    }

    darkModeToggle.addEventListener('click', () => {
        setDarkMode(!document.body.classList.contains('dark-mode'));
    });
}

// Language Switcher
function initLanguage() {
    function updateLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = translations[lang][key];
        });

        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            element.placeholder = translations[lang][key];
        });
    }

    languageSelect.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });

    // Initialize with default language
    updateLanguage(languageSelect.value);
}

// Scroll Handler
function initScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Contact Form Handler
function initContactForm() {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        try {
            button.disabled = true;
            button.innerHTML = '<span class="loading">Enviando...</span>';
            
            // Simular envío (aquí irían las llamadas a tu API)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Mensaje enviado correctamente');
            contactForm.reset();
        } catch (error) {
            alert('Error al enviar el mensaje');
        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
    });
}

// PDF Generator
function initPDFButton() {
    pdfButton.addEventListener('click', async () => {
        const button = pdfButton;
        const originalText = button.textContent;
        
        try {
            button.disabled = true;
            button.innerHTML = '<span class="loading">Generando PDF...</span>';

            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: `
                        <h1>U.E. Guido Arce Pimentel</h1>
                        <p>Formando Líderes del Mañana</p>
                        <p>Excelencia académica y valores humanos</p>
                    `,
                    format: 'html'
                })
            });

            if (!response.ok) throw new Error('Error al generar el PDF');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'brochure-gap.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error(error);
            alert('Error al generar el PDF');
        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initLanguage();
    initScroll();
    initContactForm();
    initPDFButton();
});