:\Users\HP\Documents\proyecto magui\GitHub\v6\styles.css */
/* Estilos para la barra de inicio en móviles */
@media (max-width: 768px) {
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        background-color: var(--color-principal);
        position: sticky;
        top: 0;
        z-index: 1000;
    }

    #gapMobile {
        display: block;
        font-size: 1.2rem;
        font-weight: bold;
        color: white;
    }

    h1 {
        display: none; /* Ocultar título largo en móviles */
    }

    #menuBtn {
        font-size: 1.5rem;
        background: none;
        border: none;
        color: white;
        cursor: pointer;
    }

    #menu {
        display: none; /* Ocultar menú por defecto */
        flex-direction: column;
        background-color: var(--color-secundario);
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    #menu.hidden {
        display: none; /* Ocultar menú cuando tenga la clase hidden */
    }

    #menu ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    #menu li {
        margin: 0;
    }

    #menu a {
        display: block;
        padding: 1rem;
        text-decoration: none;
        color: var(--color-texto);
        font-weight: bold;
        text-align: center;
        transition: background-color var(--transicion-default);
    }

    #menu a:hover {
        background-color: var(--color-enlace-hover);
        color: white;
    }
}
