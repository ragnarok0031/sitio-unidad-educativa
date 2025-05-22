document.addEventListener('DOMContentLoaded', function() {
    const gradeButtons = document.querySelectorAll('.grade-btn');
    const parallelButtons = document.querySelectorAll('.parallel-btn');
    const scheduleGrids = document.querySelectorAll('.schedule-grid');

    function updateScheduleDisplay() {
        const activeGrade = document.querySelector('.grade-btn.active').dataset.grade;
        const activeParallel = document.querySelector('.parallel-btn.active').dataset.parallel;

        scheduleGrids.forEach(grid => {
            if (grid.dataset.grade === activeGrade && grid.dataset.parallel === activeParallel) {
                grid.style.display = 'block';
            } else {
                grid.style.display = 'none';
            }
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
