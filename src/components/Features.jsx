import { useState, useEffect, useRef } from "react"
import { FiScissors, FiTrendingUp, FiPackage, FiAward } from "react-icons/fi"
import { BsRulers, BsPalette } from "react-icons/bs"

export default function Features() {
  const [visibleCards, setVisibleCards] = useState([])
  const sectionRef = useRef(null)

  const features = [
    {
      icon: BsPalette,
      title: "Diseño Personalizado",
      description: "Combina la parte delantera de un modelo con la trasera de otro. Crea tu estilo único.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: FiTrendingUp,
      title: "3 Alturas  y + de 20 colores",
      description: "Elige entre tacón bajo, medio o alto para cada modelo y color. Tu comodidad, tu decisión.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: BsRulers,
      title: "Medidas Exactas",
      description: "Fabricamos según tu número de pie exacto. Ajuste perfecto garantizado.",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: FiScissors,
      title: "Remontes Disponibles",
      description: "Renovamos y reparamos tu calzado favorito con la misma calidad artesanal.",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: FiPackage,
      title: "Entrega a Domicilio",
      description: "Recibe tus zapatos personalizados directamente en tu puerta.",
      color: "bg-pink-50 text-pink-600",
    },
    {
      icon: FiAward,
      title: "100% Artesanal",
      description: "Cada par es una obra de arte hecha a mano con materiales de primera calidad.",
      color: "bg-yellow-50 text-yellow-600",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".feature-card")
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("visible")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-primary)] mb-4 text-balance">
            ¿Por qué elegir Alex Suárez?
          </h2>
          <p className="text-lg text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
            Más que zapatos, creamos experiencias únicas adaptadas a tu estilo y necesidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card opacity-0 translate-y-10 transition-all duration-700 group">
              <div className="bg-[var(--color-background)] p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full border border-[var(--color-border)]">
                <div
                  className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl text-[var(--color-primary)] mb-3">{feature.title}</h3>
                <p className="text-[var(--color-muted-foreground)] leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .feature-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}
