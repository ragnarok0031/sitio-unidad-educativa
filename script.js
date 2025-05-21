// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Formulario de contacto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);
    
    try {
        // Aquí iría la lógica de envío del formulario
        console.log('Datos del formulario:', formObject);
        alert('¡Mensaje enviado con éxito!');
        contactForm.reset();
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Error al enviar el mensaje. Por favor, intente nuevamente.');
    }
});

// Animación suave del scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});