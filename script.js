// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const modoOscuroBtn = document.getElementById('modoOscuroBtn');
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  const body = document.body;

  // Función para alternar modo oscuro
  modoOscuroBtn.addEventListener('click', () => {
    body.classList.toggle('oscuro');
    // Guardar preferencia en localStorage
    localStorage.setItem('modoOscuro', body.classList.contains('oscuro'));
  });

  // Cargar preferencia de modo oscuro al iniciar
  if (localStorage.getItem('modoOscuro') === 'true') {
    body.classList.add('oscuro');
  }

  // Función para alternar menú hamburguesa
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Manejo del formulario (ejemplo básico)
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Formulario enviado');
  });
});