import { useState, useEffect, useRef } from "react"

export default function Process() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const benefits = [
    {
      stat: "100%",
      label: "Artesanal",
      description: "Cada zapato hecho a mano",
    },
    {
      stat: "∞",
      label: "Combinaciones infinitas",
      description: "Diseños únicos",
    },
    {
      stat: "3",
      label: "Alturas",
      description: "Opciones de tacón",
    },
    {
      stat: "24h",
      label: "Respuesta",
      description: "Atención personalizada",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[var(--color-primary)] text-[var(--color-surface)] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fillOpacity='1' fillRule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl mb-4 text-balance">Calidad que habla por sí misma</h2>
          <p className="text-lg text-[var(--color-surface)]/80 max-w-2xl mx-auto">
            Números que reflejan nuestro compromiso con la excelencia artesanal
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 delay-${index * 100} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-[var(--color-surface)]/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-[var(--color-surface)]/20 transition-all duration-300 hover:scale-105">
                <div className="font-serif text-5xl sm:text-6xl font-bold mb-2">{benefit.stat}</div>
                <div className="text-xl font-semibold mb-2 text-[var(--color-accent)]">{benefit.label}</div>
                <div className="text-sm text-[var(--color-surface)]/70">{benefit.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[var(--color-surface)]/10 backdrop-blur-sm rounded-3xl ">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 sm:p-12">
              <h3 className="font-serif text-3xl mb-4">Tu visión, nuestra artesanía</h3>
              <p className="text-[var(--color-surface)]/80 leading-relaxed mb-6">
                En Calzados Suárez, entendemos que cada pie es único y cada estilo es personal. Por eso ofrecemos la
                libertad de combinar elementos de diferentes modelos y colores de nuestro stock de disponibilidad, seleccionar la altura de tacón perfecta y ajustar
                cada detalle a tus medidas exactas.
              </p>
              <ul className="space-y-3">
                {[
                  "Materiales de primera calidad",
                  "Técnicas tradicionales",
                  "Atención al detalle",
                  "Garantía de satisfacción",
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex justify-end ">
              <img src="/artisan-crafting-leather-shoes-workshop.webp" alt="Proceso artesanal" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
