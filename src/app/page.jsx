"use client";
import React from "react";

function MainComponent() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", darkMode);

      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMenuOpen(false);
        }
      };

      const handleEscKey = (event) => {
        if (event.key === "Escape") {
          setMenuOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [darkMode, menuOpen]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      } transition-colors duration-300`}
    >
      <header className="sticky top-0 z-50 bg-[#2C5530] text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="/logo.png"
              alt="Logo U.E. Guido Arce Pimentel"
              className="h-12 w-auto"
            />
            <h1 className="hidden md:block text-xl md:text-2xl font-crimson-text">
              U.E. Guido Arce Pimentel
            </h1>
            <h1 className="md:hidden text-xl font-crimson-text">G.A.P.</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-[#1A331D] transition-colors duration-300"
              aria-label={
                darkMode ? "Activar modo claro" : "Activar modo oscuro"
              }
            >
              <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
            </button>
            <button
              className="md:hidden p-2 rounded-full hover:bg-[#1A331D] transition-colors duration-300"
              onClick={toggleMenu}
              aria-label="Menú de navegación"
            >
              <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>
        <nav
          ref={menuRef}
          className={`${
            menuOpen ? "block" : "hidden"
          } md:block mt-4 md:mt-0 transition-all duration-300`}
        >
          <ul className="md:flex md:justify-center space-y-2 md:space-y-0 md:space-x-6">
            <li>
              <a
                href="#inicio"
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#sobre-nosotros"
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a
                href="#infraestructura"
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Infraestructura
              </a>
            </li>
            <li>
              <a
                href="#comunidad"
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Comunidad
              </a>
            </li>
            <li>
              <a
                href="#eventos"
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Eventos
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section id="inicio" className="bg-[#4A7856] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-crimson-text mb-6">
            Bienvenidos a la U.E. Guido Arce Pimentel
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Formando líderes y construyendo futuros en el corazón de Los Negros,
            Pampagrande
          </p>
        </div>
      </section>

      <section id="sobre-nosotros" className="py-16 bg-[#F5F7F4]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-crimson-text text-center mb-12">
            Sobre Nosotros
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-crimson-text mb-4">Misión</h3>
              <p>
                Brindar una educación integral de calidad, formando estudiantes
                con valores éticos, pensamiento crítico y compromiso con su
                comunidad.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-crimson-text mb-4">Visión</h3>
              <p>
                Ser una institución educativa líder en la región, reconocida por
                formar ciudadanos responsables, innovadores y comprometidos con
                el desarrollo sostenible.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-crimson-text mb-4">Valores</h3>
              <p>
                • Excelencia Académica
                <br />• Responsabilidad Social
                <br />• Integridad
                <br />• Respeto
                <br />• Innovación
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="infraestructura" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-crimson-text text-center mb-12">
            Infraestructura
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div
                className="aspect-ratio-container"
                style={{ paddingBottom: "56.25%", position: "relative" }}
              >
                <img
                  src="/aulas.jpg"
                  alt="Aulas modernas de la U.E. Guido Arce Pimentel"
                  className="absolute inset-0 w-full h-full object-contain rounded-lg"
                />
              </div>
              <h3 className="text-xl font-crimson-text">
                Instalaciones Educativas
              </h3>
              <ul className="list-disc pl-5">
                <li>Aulas espaciosas y ventiladas</li>
                <li>Laboratorio de computación</li>
                <li>Biblioteca actualizada</li>
                <li>Sala de profesores</li>
              </ul>
            </div>
            <div className="space-y-4">
              <div
                className="aspect-ratio-container"
                style={{ paddingBottom: "56.25%", position: "relative" }}
              >
                <img
                  src="/areas-recreativas.jpg"
                  alt="Áreas recreativas y deportivas"
                  className="absolute inset-0 w-full h-full object-contain rounded-lg"
                />
              </div>
              <h3 className="text-xl font-crimson-text">
                Espacios Recreativos
              </h3>
              <ul className="list-disc pl-5">
                <li>Cancha polideportiva</li>
                <li>Áreas verdes</li>
                <li>Zona de juegos</li>
                <li>Comedor estudiantil</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="comunidad" className="py-16 bg-[#F5F7F4]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-crimson-text text-center mb-12">
            Contexto Comunitario
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6">
              Ubicados en Los Negros, Pampagrande, nuestra institución está
              profundamente arraigada en una comunidad agrícola vibrante y
              productiva. Nos enorgullece ser parte de una región conocida por
              su producción agrícola y su rica cultura.
            </p>
            <p className="text-lg mb-6">
              Trabajamos en estrecha colaboración con las familias y
              organizaciones locales para:
            </p>
            <ul className="list-disc pl-5 mb-6">
              <li>Promover la educación ambiental y agrícola</li>
              <li>Desarrollar proyectos comunitarios sostenibles</li>
              <li>Preservar las tradiciones y cultura local</li>
              <li>Fomentar la participación activa en eventos comunitarios</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="eventos" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-crimson-text text-center mb-12">
            Eventos Próximos
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-[#2C5530] text-xl mb-2">ABRIL 15</div>
              <h3 className="font-crimson-text text-lg mb-2">
                Feria Científica
              </h3>
              <p>
                Exposición de proyectos innovadores de nuestros estudiantes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-[#2C5530] text-xl mb-2">MAYO 20</div>
              <h3 className="font-crimson-text text-lg mb-2">
                Día del Deporte
              </h3>
              <p>Competencias deportivas y actividades recreativas.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-[#2C5530] text-xl mb-2">JUNIO 05</div>
              <h3 className="font-crimson-text text-lg mb-2">
                Festival Cultural
              </h3>
              <p>Celebración de nuestras tradiciones y talentos artísticos.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-16 bg-[#F5F7F4]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-crimson-text text-center mb-12">
            Contáctanos
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mensaje" className="block mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    className="w-full p-2 border rounded"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-[#2C5530] text-white px-6 py-2 rounded hover:bg-[#1A331D] transition-colors duration-300"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-crimson-text mb-4">
                  Información de Contacto
                </h3>
                <p className="mb-2">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Los Negros, Pampagrande, Santa Cruz, Bolivia
                </p>
                <p className="mb-2">
                  <i className="fas fa-phone mr-2"></i>
                  +591 XXXXXXXX
                </p>
                <p className="mb-4">
                  <i className="fas fa-envelope mr-2"></i>
                  contacto@guidoarcepimentel.edu.bo
                </p>
                <div className="h-[300px] rounded overflow-hidden">
                  <iframe
                    title="Ubicación de la escuela"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15098.027169824492!2d-64.1166667!3d-18.0833333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93df99f7c5b8c2e5%3A0x9b2c5c5c5c5c5c5c!2sLos%20Negros%2C%20Bolivia!5e0!3m2!1ses!2s!4v1625162500000!5m2!1ses!2s"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#2C5530] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-crimson-text text-xl mb-4">Contacto</h3>
              <p>Los Negros, Pampagrande</p>
              <p>Santa Cruz, Bolivia</p>
              <p>Tel: +591 XXXXXXXX</p>
            </div>
            <div>
              <h3 className="font-crimson-text text-xl mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              </div>
            </div>
            <div>
              <p>&copy; {new Date().getFullYear()} U.E. Guido Arce Pimentel</p>
              <p>Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }

        .aspect-ratio-container img {
          transition: transform 0.3s ease;
        }

        .aspect-ratio-container:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default MainComponent;