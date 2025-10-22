// src/components/Pricing.jsx
import { useState } from "react";
import { BsWhatsapp, BsCheck } from "react-icons/bs";
import Tooltip from "./Tooltip";
import BussinesDetail from "./BussinesDetail"; // ← datos del negocio

export default function Pricing() {
  // ✅ Datos desde BussinesDetail
  const whatsappNumber =
    BussinesDetail?.contact?.whatsappNumbers?.[0]?.number ?? "00000000";
  const categories = BussinesDetail?.categories ?? [];
  const pricingData = BussinesDetail?.pricingData ?? {};

  const [selectedCategory, setSelectedCategory] = useState(
    categories?.[0]?.id ?? "modelos"
  );

  const getWhatsAppMessage = (item) =>
    encodeURIComponent(
      `Hola! Me interesa el ${item.name}. ¿Podrían darme más información?`
    );

  return (
    <section id="pricing" className="py-24 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-primary)] mb-4 text-balance">
            Precios transparentes
          </h2>
          <p className="text-lg text-[var(--color-muted-foreground)] max-w-2xl mx-auto mb-8">
            Inversión en calidad artesanal que perdura en el tiempo
          </p>

          {/* Category Tabs */}
          <div className="inline-flex bg-[var(--color-surface)] p-1 rounded-full shadow-md">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-[var(--color-primary)] text-[var(--color-surface)] shadow-lg"
                    : "text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {(pricingData[selectedCategory] ?? []).map((item, index) => (
            <div
              key={index}
              className={`relative bg-[var(--color-surface)] rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                item.popular ? "ring-2 ring-[var(--color-secondary)] shadow-xl scale-105" : "shadow-lg"
              }`}
            >
              {item.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Tooltip content="Opción más elegida">
                    <div className="bg-[var(--color-secondary)] text-[var(--color-surface)] px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </div>
                  </Tooltip>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-serif text-2xl text-[var(--color-primary)] mb-2">{item.name}</h3>
                <p className="text-[var(--color-muted-foreground)] text-sm mb-4">{item.description}</p>
                <div className="flex items-baseline">
                  <span className="font-serif text-4xl font-bold text-[var(--color-primary)]">
                    {item.price.split(" ")[0]}
                  </span>
                  {item.price.includes("Desde") && (
                    <span className="ml-2 text-[var(--color-muted-foreground)] text-sm">
                      {item.price.split(" ").slice(1).join(" ")}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {item.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <BsCheck className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--color-muted-foreground)] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage(item)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center space-x-2 w-full py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  item.popular
                    ? "bg-[var(--color-primary)] text-[var(--color-surface)] hover:bg-[var(--color-secondary)]"
                    : "bg-[var(--color-muted)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-surface)]"
                }`}
              >
                <BsWhatsapp className="w-4 h-4" />
                <span>Consultar</span>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[var(--color-muted-foreground)] mb-4">
            ¿Tienes un proyecto especial en mente?
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Tengo un proyecto que quiero conversar con usted"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-[var(--color-secondary)] hover:text-[var(--color-primary)] font-medium transition-colors"
          >
            <span>Solicita una cotización personalizada</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
