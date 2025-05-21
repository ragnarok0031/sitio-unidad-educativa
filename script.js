const { useState, useEffect, useCallback } = React;

function MainComponent() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [translations, setTranslations] = useState({
    es: {
      inicio: "Inicio",
      nosotros: "Nosotros",
      academico: "Académico",
      contacto: "Contacto",
      formandoLideres: "Formando Líderes del Mañana",
      excelenciaAcademica: "Excelencia académica y valores humanos",
      nombreCompleto: "Nombre completo",
      correoElectronico: "Correo electrónico",
      mensaje: "Mensaje",
      enviar: "Enviar",
      descargarBrochure: "Descargar Brochure",
      derechosReservados: "© 2025 U.E. Guido Arce Pimentel. Todos los derechos reservados.",
      biblioteca: "Biblioteca Digital",
      horarios: "Horarios de Clases",
      reglamento: "Reglamento de la UE",
      directivo: "Directivo Personal y Profesores",
      carreras: "Nuestras Carreras",
      sobreGAP: "Sobre Guido Arce Pimentel",
      redesSociales: "Redes Sociales",
      mas: "Más",
    },
    en: {},
  });

  // Cargar preferencia de tema
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");
  }, []);

  // Guardar preferencia de tema
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Traducción automática simulada (puedes conectar aquí tu API real)
  useEffect(() => {
    // Solo español por defecto
  }, [language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData({ name: "", email: "", message: "" });
      setFormStatus("success");
    } catch (error) {
      setFormStatus("error");
    }
  };

  const t = translations[language] || translations.es;

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Header */}
      <header className={`fixed w-full z-50 ${darkMode ? "bg-black border-[#333]" : "bg-white border-[#ddd]"} border-b`}>
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-shrink-0">
              <img
                src="https://ucarecdn.com/4de5d093-6ddb-4c91-91ad-119746dfdb1e/-/format/auto/"
                alt="Logo U.E. Guido Arce Pimentel"
                className="h-8 md:h-12 mr-2"
              />
              <h1 className="text-sm md:text-xl font-semibold">
                U.E. Guido Arce Pimentel
              </h1>
            </div>
            {/* Controles de escritorio */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? "bg-[#333] hover:bg-[#444]" : "bg-[#f0f0f0] hover:bg-[#e0e0e0]"}`}
              >
                <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"} text-[#ff0000]`}></i>
              </button>
              <a href="#biblioteca" className="hover:text-[#ff0000]">
                {t.biblioteca}
              </a>
              <a href="#horarios" className="hover:text-[#ff0000]">
                {t.horarios}
              </a>
              <a href="#reglamento" className="hover:text-[#ff0000]">
                {t.reglamento}
              </a>
              <a href="#directivo" className="hover:text-[#ff0000]">
                {t.directivo}
              </a>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`${darkMode ? "bg-black text-white border-[#333]" : "bg-white text-black border-[#ddd]"} border rounded px-2 py-1`}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
            {/* Botón menú hamburguesa */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex items-center p-2 rounded-lg hover:bg-[#f0f0f0] dark:hover:bg-[#333]"
              aria-label="Menú"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </nav>
      </header>
      {/* Menú móvil */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 menu-fade-in md:hidden">
          <div className={`fixed right-0 top-0 h-full w-4/5 ${darkMode ? "bg-black text-white" : "bg-white text-black"} p-6 shadow-lg menu-slide-in`}>
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-2xl"
              aria-label="Cerrar menú"
            >
              <i className="fas fa-times"></i>
            </button>
            <nav className="flex flex-col space-y-6 mt-12">
              <a href="#biblioteca" onClick={() => setMenuOpen(false)}>{t.biblioteca}</a>
              <a href="#horarios" onClick={() => setMenuOpen(false)}>{t.horarios}</a>
              <a href="#reglamento" onClick={() => setMenuOpen(false)}>{t.reglamento}</a>
              <a href="#directivo" onClick={() => setMenuOpen(false)}>{t.directivo}</a>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`${darkMode ? "bg-black text-white border-[#333]" : "bg-white text-black border-[#ddd]"} border rounded px-2 py-1`}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full mt-4 ${darkMode ? "bg-[#333] hover:bg-[#444]" : "bg-[#f0f0f0] hover:bg-[#e0e0e0]"}`}
              >
                <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"} text-[#ff0000]`}></i>
              </button>
            </nav>
          </div>
        </div>
      )}
      <main>
        <section id="inicio" className="relative h-screen pt-20">
          <img
            src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg"
            alt="Estudiantes en el campus"
            className="w-full h-full object-cover brightness-50"
          />
          <div className={`absolute inset-0 ${darkMode ? "bg-gradient-to-b from-black/80 to-black" : "bg-gradient-to-b from-black/60 to-black/80"} flex items-center justify-center`}>
            <div className="text-center text-white p-8">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                {t.formandoLideres}
              </h2>
              <p className="text-xl md:text-2xl mb-8">
                {t.excelenciaAcademica}
              </p>
              <button className="bg-[#ff0000] text-white px-8 py-3 rounded-full text-lg font-medium uppercase tracking-wide hover:bg-[#cc0000]">
                {t.descargarBrochure}
              </button>
            </div>
          </div>
        </section>
        <section id="contacto" className={`py-24 ${darkMode ? "bg-black" : "bg-white"}`}>
          <div className="max-w-3xl mx-auto px-4">
            <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? "text-white" : "text-black"}`}>
              {t.contacto}
            </h2>
            <div className={`p-8 rounded-3xl shadow-xl ${darkMode ? "bg-[#111] border-2 border-[#333]" : "bg-[#f5f5f5] border-2 border-[#ddd]"}`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 font-semibold">{t.nombreCompleto}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded border"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">{t.correoElectronico}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded border"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">{t.mensaje}</label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded border"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#ff0000] text-white px-6 py-3 rounded-full font-medium hover:bg-[#cc0000]"
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "sending" ? "Enviando..." : t.enviar}
                </button>
                {formStatus === "success" && (
                  <p className="text-green-600 mt-2">¡Mensaje enviado correctamente!</p>
                )}
                {formStatus === "error" && (
                  <p className="text-red-600 mt-2">Error al enviar. Intenta nuevamente.</p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className={`${darkMode ? "bg-[#111] border-t border-[#333] text-white" : "bg-[#f5f5f5] border-t border-[#ddd] text-black"} py-6 md:py-8`}>
        <div className="container mx-auto px-4 text-center">
          <p>{t.derechosReservados}</p>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.render(
  <MainComponent />,
  document.getElementById('root')
);
