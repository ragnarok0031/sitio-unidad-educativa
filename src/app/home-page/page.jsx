"use client";
import React from "react";

function MainComponent() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLocationSearch = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/integrations/google-place-autocomplete/autocomplete/json?input=${input}&radius=500`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch location suggestions");
      }
      const data = await response.json();
      setSuggestions(data.predictions);
    } catch (err) {
      setError("Error fetching locations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <header className="sticky top-0 z-50 bg-[#2C5530] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="/logo.png"
              alt="Guido Arce Pimentel School Logo"
              className="h-12 w-auto"
            />
            <h1 className="text-xl md:text-2xl font-crimson-text">
              U.E. Guido Arce Pimentel
            </h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-[#1A331D]"
          >
            <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
          </button>
        </div>
      </header>

      <section className="bg-[#4A7856] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-crimson-text mb-6">
            Welcome to Our School
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Nurturing minds, building futures, and creating leaders for
            tomorrow.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F5F7F4]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-crimson-text text-center mb-12">
            About Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-crimson-text mb-4">Mission</h3>
              <p>
                To provide excellent education while fostering values and
                critical thinking in our students.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-crimson-text mb-4">Vision</h3>
              <p>
                To be a leading educational institution that shapes responsible
                and innovative citizens.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-crimson-text mb-4">Values</h3>
              <p>
                Excellence, Integrity, Respect, Innovation, and Community
                Service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-crimson-text text-center mb-12">
            Infrastructure
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <img
                src="/campus.jpg"
                alt="Modern school campus with green areas"
                className="rounded-lg w-full h-[300px] object-cover"
              />
              <h3 className="text-xl font-crimson-text">Modern Facilities</h3>
              <p>
                State-of-the-art classrooms, laboratories, and recreational
                areas.
              </p>
            </div>
            <div className="space-y-4">
              <img
                src="/library.jpg"
                alt="Well-equipped school library"
                className="rounded-lg w-full h-[300px] object-cover"
              />
              <h3 className="text-xl font-crimson-text">Learning Spaces</h3>
              <p>Well-equipped library, computer labs, and study areas.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5F7F4]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-crimson-text text-center mb-12">
            Community Context
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6">
              Our school is deeply rooted in the local community, fostering
              strong relationships with families and local organizations.
            </p>
            <p className="text-lg">
              We actively participate in community service projects and cultural
              events that enrich both our students and the surrounding
              neighborhood.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-crimson-text text-center mb-12">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-[#2C5530] text-xl mb-2">MAR 15</div>
              <h3 className="font-crimson-text text-lg mb-2">Science Fair</h3>
              <p>Annual exhibition of student projects and innovations.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-[#2C5530] text-xl mb-2">APR 20</div>
              <h3 className="font-crimson-text text-lg mb-2">Sports Day</h3>
              <p>A day of athletic competitions and team activities.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-[#2C5530] text-xl mb-2">MAY 05</div>
              <h3 className="font-crimson-text text-lg mb-2">Art Exhibition</h3>
              <p>Showcase of student artwork and performances.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5F7F4]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-crimson-text text-center mb-12">
            Contact Us
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  className="w-full p-2 border rounded"
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#2C5530] text-white px-6 py-2 rounded hover:bg-[#1A331D]"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search location"
                  onChange={(e) => handleLocationSearch(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border rounded mt-1">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          setSelectedLocation(suggestion.description)
                        }
                      >
                        {suggestion.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="h-[300px] bg-gray-200 rounded">
                {selectedLocation && (
                  <iframe
                    title="School Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                      selectedLocation
                    )}`}
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#2C5530] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-crimson-text text-xl mb-4">Contact Info</h3>
              <p>123 Education Street</p>
              <p>City, Country</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div>
              <h3 className="font-crimson-text text-xl mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div>
              <p>&copy; {new Date().getFullYear()} U.E. Guido Arce Pimentel</p>
              <p>All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;