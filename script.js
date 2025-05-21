function MainComponent() {
      function MainComponent() {
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState("es");
    const [menuOpen, setMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
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
            mas: "Más"
        },
        en: {}
    });
    // Load theme preference
    useEffect(()=>{
        const storedTheme = localStorage.getItem("theme");
        setDarkMode(storedTheme === "dark");
    }, []);
    // Save theme preference
    useEffect(()=>{
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [
        darkMode
    ]);
    // Translate content when language changes
    useEffect(()=>{
        const translateContent = async ()=>{
            if (language === "es") return; // Spanish is our base language
            const keys = Object.keys(translations.es);
            const textsToTranslate = Object.values(translations.es);
            try {
                const response = await fetch("/integrations/google-translate/language/translate/v2", {
                    method: "POST",
                    body: new URLSearchParams({
                        q: textsToTranslate.join("\n"),
                        source: "es",
                        target: language
                    })
                });
                if (!response.ok) throw new Error("Translation failed");
                const data = await response.json();
                const translatedTexts = data.data.translations[0].translatedText.split("\n");
                const newTranslations = {};
                keys.forEach((key, index)=>{
                    newTranslations[key] = translatedTexts[index];
                });
                setTranslations((prev)=>({
                        ...prev,
                        [language]: newTranslations
                    }));
            } catch (error) {
                console.error("Translation error:", error);
            }
        };
        translateContent();
    }, [
        language
    ]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setFormStatus("sending");
        try {
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            setFormData({
                name: "",
                email: "",
                message: ""
            });
            setFormStatus("success");
        } catch (error) {
            console.error(error);
            setFormStatus("error");
        }
    };
    const t = translations[language] || translations.es;
    // Updated download functionality
    const downloadSourceCode = useCallback(()=>{
        // HTML content
        const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>U.E. Guido Arce Pimentel</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="main.js"></script>
</body>
</html>`;
        // JavaScript content (React component)
        const jsContent = `function MainComponent() {
      ${MainComponent.toString()}
    }
    
    // Render the component
    ReactDOM.render(
      <MainComponent />,
      document.getElementById('root')
    );`;
        // CSS content (extracted from style tag and classes)
        const cssContent = `
/* Global styles */
* {
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

/* Animations */
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.menu-slide-in {
  animation: slideIn 0.3s ease-out;
}

.menu-fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Dark mode styles */
.dark {
  background-color: #000000;
  color: #ffffff;
}

.light {
  background-color: #ffffff;
  color: #000000;
}

/* Other custom styles */
.header {
  position: fixed;
  width: 100%;
  z-index: 50;
  border-bottom-width: 1px;
}

/* ... rest of the CSS styles extracted from the component ... */`;
        const downloadFile = (filename, content, type)=>{
            const blob = new Blob([
                content
            ], {
                type
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        };
        // Download all three files
        downloadFile("index.html", htmlContent, "text/html");
        downloadFile("main.js", jsContent, "text/javascript");
        downloadFile("styles.css", cssContent, "text/css");
    }, []);
    return /*#__PURE__*/ React.createElement("div", {
        className: `min-h-screen ${darkMode ? "bg-[#000000] text-[#ffffff]" : "bg-[#ffffff] text-[#000000]"}`,
        __source: {
            fileName: "<anon>",
            lineNumber: 205,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("style", {
        jsx: true,
        global: true,
        __source: {
            fileName: "<anon>",
            lineNumber: 208,
            columnNumber: 7
        },
        __self: this
    }, `
        * {
          transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }
        
        .menu-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        .menu-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `), /*#__PURE__*/ React.createElement("header", {
        className: `fixed w-full z-50 ${darkMode ? "bg-[#000000] border-[#333333]" : "bg-[#ffffff] border-[#dddddd]"} border-b`,
        __source: {
            fileName: "<anon>",
            lineNumber: 233,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("nav", {
        className: "max-w-7xl mx-auto px-4 py-4",
        __source: {
            fileName: "<anon>",
            lineNumber: 236,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between items-center",
        __source: {
            fileName: "<anon>",
            lineNumber: 237,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center flex-shrink-0",
        __source: {
            fileName: "<anon>",
            lineNumber: 238,
            columnNumber: 13
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("img", {
        src: "https://ucarecdn.com/4de5d093-6ddb-4c91-91ad-119746dfdb1e/-/format/auto/",
        alt: "Logo U.E. Guido Arce Pimentel",
        className: "h-8 md:h-12 mr-2",
        __source: {
            fileName: "<anon>",
            lineNumber: 239,
            columnNumber: 15
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("h1", {
        className: "text-sm md:text-xl font-semibold",
        __source: {
            fileName: "<anon>",
            lineNumber: 244,
            columnNumber: 15
        },
        __self: this
    }, "U.E. Guido Arce Pimentel")), /*#__PURE__*/ React.createElement("div", {
        className: "hidden md:flex items-center space-x-6",
        __source: {
            fileName: "<anon>",
            lineNumber: 250,
            columnNumber: 13
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: ()=>setDarkMode(!darkMode),
        className: `p-2 rounded-full ${darkMode ? "bg-[#333333] hover:bg-[#444444]" : "bg-[#f0f0f0] hover:bg-[#e0e0e0]"}`,
        __source: {
            fileName: "<anon>",
            lineNumber: 251,
            columnNumber: 15
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("i", {
        className: `fas ${darkMode ? "fa-sun" : "fa-moon"} text-[#ff0000]`,
        __source: {
            fileName: "<anon>",
            lineNumber: 255,
            columnNumber: 17
        },
        __self: this
    })), /*#__PURE__*/ React.createElement("a", {
        href: "#biblioteca",
        className: "hover:text-[#ff0000]",
        __source: {
            fileName: "<anon>",
            lineNumber: 259,
            columnNumber: 15
        },
        __self: this
    }, translations[language].biblioteca), /*#__PURE__*/ React.createElement("a", {
        href: "#horarios",
        className: "hover:text-[#ff0000]",
        __source: {
            fileName: "<anon>",
            lineNumber: 262,
            columnNumber: 15
        },
        __self: this
    }, translations[language].horarios), /*#__PURE__*/ React.createElement("a", {
        href: "#reglamento",
        className: "hover:text-[#ff0000]",
        __source: {
            fileName: "<anon>",
            lineNumber: 265,
            columnNumber: 15
        },
        __self: this
    }, translations[language].reglamento), /*#__PURE__*/ React.createElement("a", {
        href: "#directivo",
        className: "hover:text-[#ff0000]",
        __source: {
            fileName: "<anon>",
            lineNumber: 268,
            columnNumber: 15
        },
        __self: this
    }, translations[language].directivo), /*#__PURE__*/ React.createElement("select", {
        value: language,
        onChange: (e)=>setLanguage(e.target.value),
        className: `${darkMode ? "bg-[#000000] text-[#ffffff] border-[#333333]" : "bg-[#ffffff] text-[#000000] border-[#dddddd]"} border rounded px-2 py-1`,
        __source: {
            fileName: "<anon>",
            lineNumber: 271,
            columnNumber: 15
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("option", {
        value: "es",
        __source: {
            fileName: "<anon>",
            lineNumber: 276,
            columnNumber: 17
        },
        __self: this
    }, "Español"), /*#__PURE__*/ React.createElement("option", {
        value: "en",
        __source: {
            fileName: "<anon>",
            lineNumber: 277,
            columnNumber: 17
        },
        __self: this
    }, "English"))), /*#__PURE__*/ React.createElement("button", {
        onClick: ()=>setMenuOpen(true),
        className: "md:hidden flex items-center p-2 rounded-lg hover:bg-[#f0f0f0] dark:hover:bg-[#333333]",
        "aria-label": "Menú",
        __source: {
            fileName: "<anon>",
            lineNumber: 282,
            columnNumber: 13
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("i", {
        className: "fas fa-bars text-2xl",
        __source: {
            fileName: "<anon>",
            lineNumber: 287,
            columnNumber: 15
        },
        __self: this
    }))))), menuOpen && /*#__PURE__*/ React.createElement("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 z-50 menu-fade-in md:hidden",
        __source: {
            fileName: "<anon>",
            lineNumber: 295,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("div", {
        className: `fixed right-0 top-0 h-full w-4/5 ${darkMode ? "bg-[#000000] text-[#ffffff]" : "bg-[#ffffff] text-[#000000]"} p-6 shadow-lg menu-slide-in`,
        __source: {
            fileName: "<anon>",
            lineNumber: 296,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end mb-6",
        __source: {
            fileName: "<anon>",
            lineNumber: 299,
            columnNumber: 13
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: ()=>setMenuOpen(false),
        className: "p-2 rounded-full hover:bg-[#f0f0f0] dark:hover:bg-[#333333]",
        __source: {
            fileName: "<anon>",
            lineNumber: 300,
            columnNumber: 15
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("i", {
        className: "fas fa-times text-2xl",
        __source: {
            fileName: "<anon>",
            lineNumber: 304,
            columnNumber: 17
        },
        __self: this
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "flex flex-col space-y-6",
        __source: {
            fileName: "<anon>",
            lineNumber: 308,
            columnNumber: 13
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#biblioteca",
        className: "text-lg py-2 px-4 rounded-lg hover:bg-[#f0f0f0] dark:hover:bg-[#333333]",
        onClick: ()=>setMenuOpen(false),
        __source: {
            fileName: "<anon>",
            lineNumber: 309,
            columnNumber: 15
        },
        __self: this
    }, translations[language].biblioteca), /*#__PURE__*/ React.createElement("a", {
        href: "#horarios",
        className: "text-lg py-2 px-4 rounded-lg hover:bg-[#f0f0f0] dark:hover:bg-[#333333]",
        onClick: ()=>setMenuOpen(false),
        __source: {
            fileName: "<anon>",
            lineNumber: 316,
            columnNumber: 15
        },
        __self: this
    }, translations[language].horarios), /*#__PURE__*/ React.createElement("a", {
        href: "#reglamento",
        className: "text-lg py-2 px-4 rounded-lg hover:bg-[#f0f0f0] dark:hover:bg-[#333333]",
        onClick: ()=>setMenuOpen(false),
        __source: {
            fileName: "<anon>",
            lineNumber: 323,
            columnNumber: 15
        },
        __self: this
    }, translations[language].reglamento), /*#__PURE__*/ React.createElement("a", {
        href: "#directivo",
        className: "text-lg py-2 px-4 rounded-lg hover:bg-[#f0f0f0] dark:hover:bg-[#333333]",
        onClick: ()=>setMenuOpen(false),
        __source: {
            fileName: "<anon>",
            lineNumber: 330,
            columnNumber: 15
        },
        __self: this
    }, translations[language].directivo), /*#__PURE__*/ React.createElement("div", {
        className: "pt-6 border-t border-[#dddddd] dark:border-[#333333]",
        __source: {
            fileName: "<anon>",
            lineNumber: 338,
            columnNumber: 15
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: ()=>{
            setDarkMode(!darkMode);
        },
        className: `w-full py-2 px-4 rounded-lg mb-4 ${darkMode ? "bg-[#333333]" : "bg-[#f0f0f0]"}`,
        __source: {
            fileName: "<anon>",
            lineNumber: 339,
            columnNumber: 17
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("i", {
        className: `fas ${darkMode ? "fa-sun" : "fa-moon"} mr-2`,
        __source: {
            fileName: "<anon>",
            lineNumber: 345,
            columnNumber: 19
        },
        __self: this
    }), darkMode ? "Modo claro" : "Modo oscuro"), /*#__PURE__*/ React.createElement("select", {
        value: language,
        onChange: (e)=>setLanguage(e.target.value),
        className: `w-full p-2 rounded-lg ${darkMode ? "bg-[#333333] text-[#ffffff]" : "bg-[#f0f0f0] text-[#000000]"}`,
        __source: {
            fileName: "<anon>",
            lineNumber: 351,
            columnNumber: 17
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("option", {
        value: "es",
        __source: {
            fileName: "<anon>",
            lineNumber: 356,
            columnNumber: 19
        },
        __self: this
    }, "Español"), /*#__PURE__*/ React.createElement("option", {
        value: "en",
        __source: {
            fileName: "<anon>",
            lineNumber: 357,
            columnNumber: 19
        },
        __self: this
    }, "English")))))), /*#__PURE__*/ React.createElement("main", {
        __source: {
            fileName: "<anon>",
            lineNumber: 365,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("section", {
        id: "inicio",
        className: "relative h-screen pt-20",
        __source: {
            fileName: "<anon>",
            lineNumber: 366,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("img", {
        src: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg",
        alt: "Estudiantes en el campus",
        className: "w-full h-full object-cover brightness-50",
        __source: {
            fileName: "<anon>",
            lineNumber: 367,
            columnNumber: 11
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("div", {
        className: `absolute inset-0 ${darkMode ? "bg-gradient-to-b from-black/80 to-black" : "bg-gradient-to-b from-black/60 to-black/80"} flex items-center justify-center`,
        __source: {
            fileName: "<anon>",
            lineNumber: 372,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-center text-white p-8",
        __source: {
            fileName: "<anon>",
            lineNumber: 375,
            columnNumber: 13
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("h2", {
        className: "text-4xl md:text-6xl font-bold mb-4",
        __source: {
            fileName: "<anon>",
            lineNumber: 376,
            columnNumber: 15
        },
        __self: this
    }, t.formandoLideres), /*#__PURE__*/ React.createElement("p", {
        className: "text-xl md:text-2xl mb-8",
        __source: {
            fileName: "<anon>",
            lineNumber: 379,
            columnNumber: 15
        },
        __self: this
    }, t.excelenciaAcademica), /*#__PURE__*/ React.createElement("button", {
        className: "bg-[#ff0000] text-white px-8 py-3 rounded-full text-lg font-medium uppercase tracking-wide hover:bg-[#cc0000]",
        __source: {
            fileName: "<anon>",
            lineNumber: 382,
            columnNumber: 15
        },
        __self: this
    }, t.descargarBrochure)))), /*#__PURE__*/ React.createElement("section", {
        id: "contacto",
        className: `py-24 ${darkMode ? "bg-[#000000]" : "bg-[#ffffff]"}`,
        __source: {
            fileName: "<anon>",
            lineNumber: 389,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("div", {
        className: "max-w-3xl mx-auto px-4",
        __source: {
            fileName: "<anon>",
            lineNumber: 393,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("h2", {
        className: `text-3xl font-bold text-center mb-12 ${darkMode ? "text-white" : "text-black"}`,
        __source: {
            fileName: "<anon>",
            lineNumber: 394,
            columnNumber: 13
        },
        __self: this
    }, t.contacto), /*#__PURE__*/ React.createElement("div", {
        className: `p-8 rounded-3xl shadow-xl ${darkMode ? "bg-[#111111] border-2 border-[#333333]" : "bg-[#f5f5f5] border-2 border-[#dddddd]"}`,
        __source: {
            fileName: "<anon>",
            lineNumber: 399,
            columnNumber: 13
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("form", {
        onSubmit: handleSubmit,
        className: "space-y-6",
        __source: {
            fileName: "<anon>",
            lineNumber: 402,
            columnNumber: 15
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("input", {
        type: "text",
        placeholder: t.nombreCompleto,
        value: formData.name,
        onChange: (e)=>setFormData({
                ...formData,
                name: e.target.value
            }),
        className: `w-full p-4 rounded-lg border-2 ${darkMode ? "bg-[#000000] border-[#333333] text-[#ffffff]" : "bg-[#ffffff] border-[#dddddd] text-[#000000]"} placeholder-gray-400 focus:border-[#ff0000]`,
        required: true,
        __source: {
            fileName: "<anon>",
            lineNumber: 403,
            columnNumber: 17
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("input", {
        type: "email",
        placeholder: t.correoElectronico,
        value: formData.email,
        onChange: (e)=>setFormData({
                ...formData,
                email: e.target.value
            }),
        className: `w-full p-4 rounded-lg border-2 ${darkMode ? "bg-[#000000] border-[#333333] text-[#ffffff]" : "bg-[#ffffff] border-[#dddddd] text-[#000000]"} placeholder-gray-400 focus:border-[#ff0000]`,
        required: true,
        __source: {
            fileName: "<anon>",
            lineNumber: 413,
            columnNumber: 17
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("textarea", {
        placeholder: t.mensaje,
        value: formData.message,
        onChange: (e)=>setFormData({
                ...formData,
                message: e.target.value
            }),
        className: `w-full p-4 rounded-lg border-2 h-32 ${darkMode ? "bg-[#000000] border-[#333333] text-[#ffffff]" : "bg-[#ffffff] border-[#dddddd] text-[#000000]"} placeholder-gray-400 focus:border-[#ff0000]`,
        required: true,
        __source: {
            fileName: "<anon>",
            lineNumber: 423,
            columnNumber: 17
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("button", {
        type: "submit",
        disabled: formStatus === "sending",
        className: "w-full bg-[#ff0000] text-white py-4 rounded-lg text-lg font-medium uppercase tracking-wide hover:bg-[#cc0000] disabled:opacity-50",
        __source: {
            fileName: "<anon>",
            lineNumber: 432,
            columnNumber: 17
        },
        __self: this
    }, formStatus === "sending" ? "..." : t.enviar), formStatus === "success" && /*#__PURE__*/ React.createElement("p", {
        className: "text-[#ff3333] text-center",
        __source: {
            fileName: "<anon>",
            lineNumber: 440,
            columnNumber: 19
        },
        __self: this
    }, "✅ Mensaje enviado"), formStatus === "error" && /*#__PURE__*/ React.createElement("p", {
        className: "text-[#ff0000] text-center",
        __source: {
            fileName: "<anon>",
            lineNumber: 445,
            columnNumber: 19
        },
        __self: this
    }, "❌ Error al enviar")))))), /*#__PURE__*/ React.createElement("footer", {
        className: `${darkMode ? "bg-[#111111] border-t border-[#333333] text-[#ffffff]" : "bg-[#f5f5f5] border-t border-[#dddddd] text-[#000000]"} py-6 md:py-8`,
        __source: {
            fileName: "<anon>",
            lineNumber: 455,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("div", {
        className: "container mx-auto px-4 text-center",
        __source: {
            fileName: "<anon>",
            lineNumber: 458,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("p", {
        __source: {
            fileName: "<anon>",
            lineNumber: 459,
            columnNumber: 11
        },
        __self: this
    }, t.derechosReservados), /*#__PURE__*/ React.createElement("div", {
        className: "mt-8 p-6 rounded-lg border-2 border-[#ff0000]/20",
        __source: {
            fileName: "<anon>",
            lineNumber: 462,
            columnNumber: 11
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("p", {
        className: "italic text-base mb-4 opacity-80",
        __source: {
            fileName: "<anon>",
            lineNumber: 463,
            columnNumber: 13
        },
        __self: this
    }, "Descarga estos archivos con fines educativos para estudiar su estructura y funcionamiento."), /*#__PURE__*/ React.createElement("button", {
        id: "download-code-btn",
        onClick: downloadSourceCode,
        className: "bg-[#ff0000] text-white px-6 py-3 rounded-lg  hover:bg-[#cc0000] transition-colors duration-200 flex items-center justify-center gap-2 mx-auto",
        __source: {
            fileName: "<anon>",
            lineNumber: 467,
            columnNumber: 13
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("span", {
        __source: {
            fileName: "<anon>",
            lineNumber: 474,
            columnNumber: 15
        },
        __self: this
    }, "📥"), /*#__PURE__*/ React.createElement("span", {
        __source: {
            fileName: "<anon>",
            lineNumber: 475,
            columnNumber: 15
        },
        __self: this
    }, "Descargar código fuente (motivos educativos)"))))));
}
    }
    
    // Render the component
    ReactDOM.render(
      <MainComponent />,
      document.getElementById('root')
    );