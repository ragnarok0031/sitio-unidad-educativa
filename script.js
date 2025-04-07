document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('modoOscuroBtn');
    const body = document.body;
  
    // Comprobar si el usuario ya eligió modo oscuro
    const modoGuardado = localStorage.getItem('modoOscuro');
    if (modoGuardado === 'true') {
      body.classList.add('oscuro');
    }
  
    btn.addEventListener('click', () => {
      body.classList.toggle('oscuro');
      localStorage.setItem('modoOscuro', body.classList.contains('oscuro'));
    });
  });

