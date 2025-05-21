const { useState, useEffect } = React;

// Componente principal
function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Cargar preferencia de tema
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        setDarkMode(storedTheme === "dark");
    }, []);

    // Guardar preferencia de tema
    useEffect(() => {
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
            {/* Header */}
            <header className="fixed w-full z-50 bg-white border-b">
                <nav className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">U.E. Guido Arce Pimentel</h1>
                        <button 
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full bg-gray-100"
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>
                    </div>
                </nav>
            </header>

            <main className="pt-20">
                <section className="hero-section">
                    <h2 className="text-4xl text-center py-12">
                        Formando Líderes del Mañana
                    </h2>
                </section>
            </main>
        </div>
    );
}

// Renderizar la aplicación
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
