// 🔹InfiniteSlider.jsx
import { useState, useEffect } from "react";
import { MousePointer2, Layers, Eye } from "lucide-react";

const slides = [
  {
    src: "/3d.webp",
    alt: "Visualización 3D de sandalia con selector de colores",
    topRight: { icon: "mouse", text: "Rota 360°" },
    bottomTitle: "Rotación Interactiva",
    bottomSub: "Examina cada detalle desde cualquier ángulo",
  },
  {
    src: "/3d1.webp",
    alt: "Previsualización alternativa 3D con enfoque en detalles",
    topRight: { icon: "mouse", text: "Vista 360°" },
    bottomTitle: "Vista Cinemática",
    bottomSub: "Mira el volumen y las proporciones en 3D",
  },
  {
    src: "/3d2.webp",
    alt: "Selector de materiales y tipos de suela en 3D",
    topRight: { icon: "layers", text: "Personalizar" },
    bottomTitle: "Materiales y Suelas",
    bottomSub: "Visualiza en tiempo real",
  },
  {
    src: "/3d4.webp",
    alt: "Visualización de texturas en alta resolución",
    topRight: { icon: "eye", text: "Detalles" },
    bottomTitle: "Texturas",
    bottomSub: "Descubre como lo hacemos",
  },
];

function SlideTopRight({ icon, text }) {
  const Icon = icon === "layers" ? Layers : icon === "eye" ? Eye : MousePointer2;
  return (
    <div className="absolute top-4 bg-white/95 backdrop-blur-sm py-2 rounded-full shadow-lg flex items-center p-4 mx-auto">
      <Icon className="w-4 h-4 text-[#8B6F47] animate-pulse" />
      <span className="text-sm font-medium text-[#2C2416]">{text}</span>
    </div>
  );
}

export default function InfiniteSlider() {
  const [index, setIndex] = useState(0);

  // Auto-avanza cada 4s (loop infinito)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full overflow-hidden mb-12 mx-auto md:max-w-[1200px] rounded-2xl">
      <div
        className="flex transition-transform duration-700 ease-in-out rounded-2xl"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="min-w-full px-0 rounded-2xl flex">
            <div className="relative group transition-all duration-1000 mx-auto opacity-100 translate-x-0 rounded-2xl">
              {/* Contenedor con relación de aspecto responsiva:
                  - mobile: 16:9
                  - md+: vertical (más alto que ancho) */}
              <div className="relative mx-auto flex flex-row overflow-hidden rounded-2xl aspect-[16/9] md:h-[75vh] md:max-h-[820px]">
                <img
                  src={s.src}
                  alt={s.alt}
                  className="
                    relative mx-auto inset-0 w-full h-full object-cover rounded-2xl
                    transition-transform duration-500
                    group-hover:scale-105 group-focus-within:scale-105
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                {/* Indicador superior derecho */}
                <SlideTopRight icon={s.topRight.icon} text={s.topRight.text} />

                {/* Etiquetas inferiores */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2C2416] to-transparent p-6 rounded-b-2xl">
                  <p className="text-white font-semibold text-lg">{s.bottomTitle}</p>
                  <p className="text-white/80 text-sm">{s.bottomSub}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots de navegación */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              i === index ? "bg-[#8B6F47] w-6" : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
