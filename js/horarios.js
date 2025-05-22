document.addEventListener('DOMContentLoaded', function() {
    const gradeButtons = document.querySelectorAll('.grade-btn');
    const parallelButtons = document.querySelectorAll('.parallel-btn');
    const scheduleGrids = document.querySelectorAll('.schedule-grid');

    function updateScheduleDisplay() {
        const activeGrade = document.querySelector('.grade-btn.active').dataset.grade;
        const activeParallel = document.querySelector('.parallel-btn.active').dataset.parallel;
        
        // Construir la ruta de la imagen
        const imagePath = `images/${activeGrade}${activeParallel}.jpg`;
        
        // Actualizar la imagen y el botón de descarga
        const scheduleContainer = document.querySelector('.schedules-container');
        scheduleContainer.innerHTML = `
            <div class="schedule-grid active">
                <div class="schedule-img-container">
                    <div class="schedule-header">
                        <h3>${activeGrade}° de Secundaria - Paralelo ${activeParallel}</h3>
                    </div>
                    <img src="${imagePath}" 
                         alt="Horario ${activeGrade}° Secundaria Paralelo ${activeParallel}" 
                         class="schedule-img" 
                         loading="lazy">
                    <a href="${imagePath}" 
                       class="download-btn" 
                       download="Horario_${activeGrade}${activeParallel}_Secundaria.jpg">
                        <i class="fas fa-download"></i> Descargar Horario
                    </a>
                </div>
            </div>
        `;

        // Añadir evento para vista previa
        const scheduleImg = scheduleContainer.querySelector('.schedule-img');
        scheduleImg.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'schedule-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imagePath}" alt="Vista previa del horario">
                </div>
            `;
            document.body.appendChild(modal);

            modal.querySelector('.close-modal').onclick = function() {
                modal.remove();
            };

            modal.onclick = function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            };
        });
    }

    gradeButtons.forEach(button => {
        button.addEventListener('click', function() {
            gradeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateScheduleDisplay();
        });
    });

    parallelButtons.forEach(button => {
        button.addEventListener('click', function() {
            parallelButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateScheduleDisplay();
        });
    });

    // Inicializar la visualización
    updateScheduleDisplay();
});
