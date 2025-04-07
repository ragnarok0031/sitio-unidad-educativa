// script.js
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;

  // GESTIÓN DE MENÚ MÓVIL
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', 
      mobileMenu.classList.contains('active').toString());
  });

  // Cerrar menú al hacer clic fuera
  window.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // GESTIÓN DE TEMA
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('oscuro');
    themeToggle.querySelector('img').src = 
      body.classList.contains('oscuro') 
        ? 'images/modo_oscuro.png' 
        : 'images/modo_claro.png';
    
    themeToggle.setAttribute('aria-pressed', 
      body.classList.contains('oscuro').toString());
    
    // Almacenar preferencia
    localStorage.setItem('theme', body.classList.contains('oscuro') ? 'dark' : 'light');
  });

  // Recuperar tema guardado
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('oscuro');
    themeToggle.querySelector('img').src = 'images/modo_oscuro.png';
    themeToggle.setAttribute('aria-pressed', 'true');
  }
});
