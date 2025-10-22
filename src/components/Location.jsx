// src/components/Location.jsx
import { BsWhatsapp, BsClock, BsGeoAlt, BsPhone } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import BussinesDetail from "./BussinesDetail";
import { Link } from "react-router-dom";

export default function Location() {
  // ✅ Datos desde BussinesDetail
  const whatsappNumber =
    BussinesDetail?.contact?.whatsappNumbers?.[0]?.number ?? "00000000";

  const address =
    BussinesDetail?.contact?.address ?? "Dirección no disponible";

  const phone = `+53 ${whatsappNumber}`;
  const schedule =
    BussinesDetail?.schedule ?? [
      { day: "Lunes - Viernes", hours: "9:00 AM - 6:00 PM" },
      { day: "Sábados", hours: "10:00 AM - 4:00 PM" },
      { day: "Domingos", hours: "Cerrado" },
    ];

  // 🔗 Enlace corto provisto (abrir en nueva pestaña)
  const mapsUrl = "https://maps.app.goo.gl/XNCcwQAA2A48WmtNA";

  // 🗺️ Preview con coordenadas (sin API key)
  // Coords: 22.969003, -82.151186
  const mapsEmbedSrc = `https://www.google.com/maps?q=22.969003,-82.151186&z=17&output=embed`;

  const handleGetDirections = () => {
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="location" className="py-24 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-primary)] mb-4 text-balance">
            Visítanos o contáctanos
          </h2>
          <p className="text-lg text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
            Estamos aquí para ayudarte a crear el calzado perfecto
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-[var(--color-background)] p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BsGeoAlt className="w-6 h-6 text-[var(--color-secondary)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-[var(--color-primary)] mb-2">
                    Dirección
                  </h3>
                  <p className="text-[var(--color-muted-foreground)] mb-4">
                    {address}
                  </p>
                  <div className="flex gap-1">
                    <button
                      onClick={handleGetDirections}
                      className="inline-flex items-center space-x-2 text-[var(--color-secondary)] hover:text-[var(--color-primary)] font-medium transition-colors"
                    >
                      <FiMapPin className="w-4 h-4" />
                      <span>Abrir en Google Maps</span>
                      <span>→</span>
                    </button>
                    <p>Cerca de la primaria Victor Mestre</p>
                  </div>
                  <span className="text-xl font-bold">
                    Pregunta por nosotros asere!
                  </span>
                  <p>todo el mundo nos conoce</p>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-[var(--color-background)] p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BsClock className="w-6 h-6 text-[var(--color-secondary)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-[var(--color-primary)] mb-4">
                    Horario de atención
                  </h3>
                  <div className="space-y-3">
                    {schedule.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-[var(--color-muted-foreground)]">
                          {item.day}
                        </span>
                        <span className="font-medium text-[var(--color-primary)]">
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="bg-[var(--color-background)] p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BsPhone className="w-6 h-6 text-[var(--color-secondary)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-[var(--color-primary)] mb-4">
                    Contacto
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-[var(--color-muted-foreground)] mb-1">
                        Teléfono
                      </p>
                      <a
                        href={`tel:${phone}`}
                        className="text-[var(--color-primary)] font-medium hover:text-[var(--color-secondary)] transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-[var(--color-muted-foreground)] mb-2">
                        WhatsApp
                      </p>
                      <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-[var(--color-primary)] text-[var(--color-surface)] px-6 py-3 rounded-full hover:bg-[var(--color-secondary)] transition-all duration-300 hover:scale-105"
                      >
                        <BsWhatsapp className="w-4 h-4" />
                        <span className="font-medium">Enviar mensaje</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Preview (embed) */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="rounded-2xl overflow-hidden shadow-xl h-[600px] relative bg-[var(--color-muted)]">
                <iframe
                  title="Ubicación Calzados Suárez"
                  src={mapsEmbedSrc}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 flex items-end justify-center p-4 pointer-events-none">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto bg-[var(--color-surface)] text-[var(--color-primary)] px-6 py-3 rounded-full font-medium shadow-lg hover:bg-[var(--color-primary)] hover:text-[var(--color-surface)] transition-all duration-300"
                  >
                    Abrir en Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-3xl p-12 text-center text-[var(--color-surface)]">
          <h3 className="font-serif text-3xl sm:text-4xl mb-4">
            ¿Listo para crear tu calzado perfecto?
          </h3>
          <p className="text-lg mb-8 text-[var(--color-surface)]/90 max-w-2xl mx-auto">
            Contáctanos hoy y comienza el viaje hacia tus zapatos soñados
          </p>
          <Link
            to="/products"
            className="flex flex-row w-40 m-auto h-10 items-center justify-center space-x-3 bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] p-4 rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-surface)] hover:scale-125 transition-all duration-300"
          >
            <span className="font-medium">Comenzar Ahora</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
