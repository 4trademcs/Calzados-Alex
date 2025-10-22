// src/components/CustomizationShowcase.jsx
import { useState, useEffect, useRef } from "react";
import { BsWhatsapp } from "react-icons/bs";
import Tooltip from "./Tooltip";
import BussinesDetail from "./BussinesDetail"; // ← mismo folder

export default function CustomizationShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const steps = [
    {
      number: "01",
      title: "Elige el Modelo Base",
      description:
        "Selecciona entre nuestra colección de diseños exclusivos, Observalo en 3D! Ten una idea de como luce tu zapato incluso antes de tenerlo!",
      image: "/women-s-shoe-measurement-fitting-custom-size.jpg",
    },
    {
      number: "02",
      title: "Combina Estilos",
      description:
        "Siéntete libre: Mezcla la parte delantera de un modelo con la trasera de otro si lo deseas o quédate con el modelo original.",
      image: "/shoe-design-customization-parts.jpg",
    },
    {
      number: "03",
      title: "Selecciona tu Tacón y colores",
      description:
        "Bajo, medio o alto - tú decides la altura perfecta, observa siempre nuestros colores disponibles",
      image: "/different-heel-heights-shoes.jpg",
    },
    {
      number: "04",
      title: "Medidas Exactas",
      description:
        "Proporcionamos tu número de pie o usa nuestra plantilla personalizada para un ajuste perfecto",
      image: "/shoe-measurement-fitting.jpg",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible, steps.length]);

  // ✅ Solo la data necesaria desde BussinesDetail
  const whatsappNumber =
    BussinesDetail?.contact?.whatsappNumbers?.[0]?.number ?? "00000000";
  const whatsappMessage = encodeURIComponent(
    BussinesDetail?.contact?.wspInfo ??
      BussinesDetail?.contact?.whatsappMessage ??
      "Hola!"
  );

  return (
    <section
      id="customization"
      ref={sectionRef}
      className="py-24 bg-[var(--color-background)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-[var(--color-accent)]/20 px-4 py-2 rounded-full mb-4">
            <span className="text-sm text-[var(--color-secondary)] font-medium">
              Proceso de Personalización
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-primary)] mb-4 text-balance">
            Crea tu calzado ideal en 4 pasos
          </h2>
          <p className="text-lg text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
            Un proceso simple que te da control total sobre el diseño de tus
            zapatos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer p-6 rounded-2xl transition-all duration-500 ${
                  activeStep === index
                    ? "bg-[var(--color-surface)] shadow-lg scale-105"
                    : "bg-transparent hover:bg-[var(--color-surface)]/50"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg font-semibold transition-all duration-300 ${
                      activeStep === index
                        ? "bg-[var(--color-primary)] text-[var(--color-surface)]"
                        : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]"
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-serif text-xl mb-2 transition-colors ${
                        activeStep === index
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-muted-foreground)]"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {activeStep === index && (
                    <div className="flex-shrink-0">
                      <Tooltip content="Paso activo">
                        <div className="w-3 h-3 bg-[var(--color-secondary)] rounded-full animate-pulse"></div>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Image Showcase */}
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                    activeStep === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                >
                  <img
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-white font-serif text-2xl mb-2">
                      {step.title}
                    </p>
                    <p className="text-white/80 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeStep === index
                      ? "w-8 bg-[var(--color-secondary)]"
                      : "w-2 bg-[var(--color-muted)]"
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-[var(--color-primary)] text-[var(--color-surface)] px-8 py-4 rounded-full hover:bg-[var(--color-secondary)] transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <BsWhatsapp className="w-5 h-5" />
            <span className="font-medium">Comienza tu diseño ahora</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
