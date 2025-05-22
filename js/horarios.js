document.addEventListener('DOMContentLoaded', function() {
    const gradeButtons = document.querySelectorAll('.grade-btn');
    const parallelButtons = document.querySelectorAll('.parallel-btn');
    const schedulesContainer = document.querySelector('.schedules-container');

    // Función para mostrar el horario seleccionado
    function showSchedule(grade, parallel) {
        // Ocultar todos los horarios
        const allSchedules = document.querySelectorAll('.schedule-grid');
        allSchedules.forEach(schedule => {
            schedule.style.display = 'none';
        });

        // Mostrar el horario seleccionado
        const selectedSchedule = document.querySelector(`.schedule-grid[data-grade="${grade}"][data-parallel="${parallel}"]`);
        if (selectedSchedule) {
            selectedSchedule.style.display = 'block';
            
            // Asegurarse de que la imagen esté cargada
            const img = selectedSchedule.querySelector('img');
            img.src = `images/${grade}${parallel}.jpg`;
            
            // Actualizar el botón de descarga
            const downloadBtn = selectedSchedule.querySelector('.download-btn');
            downloadBtn.href = `images/${grade}${parallel}.jpg`;
            downloadBtn.download = `Horario_${grade}${parallel}_Secundaria.jpg`;
        }
    }

    // Manejar clicks en botones de grado
    gradeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            gradeButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');
            
            const activeGrade = button.dataset.grade;
            const activeParallel = document.querySelector('.parallel-btn.active').dataset.parallel;
            showSchedule(activeGrade, activeParallel);
        });
    });

    // Manejar clicks en botones de paralelo
    parallelButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            parallelButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');
            
            const activeGrade = document.querySelector('.grade-btn.active').dataset.grade;
            const activeParallel = button.dataset.parallel;
            showSchedule(activeGrade, activeParallel);
        });
    });

    // Mostrar el horario inicial (1° A)
    showSchedule('1', 'A');
});
