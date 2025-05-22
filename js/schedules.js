class ScheduleManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupAccessibility();
    }

    bindEvents() {
        // Selector de grado
        document.querySelectorAll('.grade-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchGrade(btn.dataset.grade);
                document.querySelectorAll('.grade-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Selector de paralelo
        document.querySelectorAll('.parallel-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchParallel(btn.dataset.parallel);
                document.querySelectorAll('.parallel-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    switchGrade(grade) {
        document.querySelectorAll('.schedule-grid').forEach(grid => {
            const isActive = grid.dataset.grade === grade && 
                           grid.dataset.parallel === document.querySelector('.parallel-btn.active').dataset.parallel;
            grid.classList.toggle('active', isActive);
        });
    }

    switchParallel(parallel) {
        document.querySelectorAll('.schedule-grid').forEach(grid => {
            const isActive = grid.dataset.parallel === parallel && 
                           grid.dataset.grade === document.querySelector('.grade-btn.active').dataset.grade;
            grid.classList.toggle('active', isActive);
        });
    }

    setupAccessibility() {
        // Añadir roles y atributos ARIA
        const navigation = document.querySelector('.schedule-navigation');
        navigation.setAttribute('role', 'tablist');
        navigation.setAttribute('aria-label', 'Selector de horarios');

        // Mejorar navegación por teclado
        this.setupKeyboardNavigation();
    }

    setupKeyboardNavigation() {
        const buttons = document.querySelectorAll('.grade-btn, .parallel-btn');
        buttons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        const next = button.nextElementSibling || buttons[0];
                        next.focus();
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        const prev = button.previousElementSibling || buttons[buttons.length - 1];
                        prev.focus();
                        break;
                }
            });
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ScheduleManager();
});
