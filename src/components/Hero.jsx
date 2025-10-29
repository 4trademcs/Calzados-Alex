import { useState, useEffect } from "react";
import { BsWhatsapp, BsArrowDown } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import BussinesDetail from "./BussinesDetail"; // ← Importa los datos del negocio
import { Link } from "react-router-dom";
import { GiHighHeel } from "react-icons/gi";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setIsVisible(true);}, []);

  // ✅ Usa datos del negocio
  const whatsappNumber = BussinesDetail?.contact?.whatsappNumbers?.[0]?.number ?? "00000000";
  const whatsappMessage = encodeURIComponent(BussinesDetail?.contact?.whatsappMessage ??
    "Hola! Quiero diseñar mi calzado personalizado." );

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%232c2420' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="inline-flex items-center space-x-2 bg-[var(--color-accent)]/20 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[var(--color-secondary)] rounded-full animate-pulse"></span>
              <span className="text-sm text-[var(--color-secondary)] font-medium">
                Hecho a mano con pasión
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[var(--color-primary)] mb-6 leading-tight text-balance">
              Diseña tu calzado perfecto
            </h1>

            <p className="text-lg text-[var(--color-muted-foreground)] mb-8 leading-relaxed max-w-xl">
              Fundados por el creador Alexander Suárez bajo la idea inicial de
              emprender con su negocio, somos ahora una marca familiar que busca
              mostrar de manera única la selección del calzado ofreciendo
              personalización y visualidad que combina estilos, crea zapatos
              únicos. Artesanía de calidad con medidas exactas para tus pies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center space-x-3 bg-green-500 text-[var(--color-surface)] px-8 py-4 rounded-full hover:bg-[var(--color-secondary)] transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <BsWhatsapp className="w-5 h-5" />
                <span className="font-medium">Contactar x Whatsapp</span>
              </a>

              <Link
                to="/products"
                className="flex flex-row items-center  justify-center space-x-3 bg-[var(--color-primary)] text-[var(--color-surface)] border-2 border-[var(--color-primary)] px-8 py-4 rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-surface)] transition-all duration-300 hover:scale-105"
              >
                <GiHighHeel size={30}/>
                <span className="font-medium duration-200 transition-transform">Ver productos</span>
              </Link>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 text-sm text-[var(--color-muted-foreground)]">
              <div className="flex items-center space-x-2">
                <FiMapPin className="w-4 h-4 text-[var(--color-secondary)]" />
                <span>Entrega a domicilio</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-[var(--color-secondary)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span>Medidas personalizadas</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-[var(--color-secondary)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                </svg>
                <span>Remontes disponibles</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image Showcase */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
              }`}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/women-s-low-heel-elegant-sandals-black.webp"
                  alt="Zapatos artesanales Calzados Suárez"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Floating Cards */}
              <div className="absolute bottom-1 -left-3 bg-[var(--color-surface)] p-6 rounded-2xl shadow-xl max-w-xs animate-float">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[var(--color-secondary)]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-primary)]">
                      100% Artesanal
                    </p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">
                      Hecho a mano
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-6 -right-4 bg-[var(--color-primary)] text-[var(--color-surface)] p-6 rounded-2xl shadow-xl animate-float"
                style={{ animationDelay: "1s" }}
              >
                <p className="text-3xl font-serif font-bold mb-1">∞</p>
                <p className="text-sm">Combinaciones posibles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <BsArrowDown className="w-6 h-6 text-[var(--color-secondary)]" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%,100% {transform: translateY(0px);}
          50% {transform: translateY(-10px);}
        }
        .animate-float { animation: float 3s ease-in-out infinite; }`}
      </style>
    </section>
  );
}
