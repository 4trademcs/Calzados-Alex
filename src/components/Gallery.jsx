import { useState, useEffect, useRef } from "react"
import { FiX } from "react-icons/fi"

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [visibleImages, setVisibleImages] = useState([])
  const sectionRef = useRef(null)

  const images = [
    { id: 1, url: "/elegant-brown-leather-heels.webp", category: "" },
    { id: 2, url: "/women-s-wedge-sandals-medium-heel-cork.webp", category: "Remonte y pegado" },
    { id: 3, url: "/women-s-shoes-with-different-heel-heights-low-medi.webp", category: "Tiras Finas" },
    { id: 4, url: "/artisan-red-leather-pumps.webp", category: "Tacones medios" },
    { id: 5, url: "/elegant-women-s-high-heel-sandals-handmade-artisan.webp", category: "Tiras" },
    { id: 6, url: "/collection-of-women-s-elegant-sandals-different-st.webp", category: "Modelos" },
    { id: 7, url: "/elegant-women-s-high-heel-sandals-beige.webp", category: "Tacon Medio" },
    { id: 8, url: "/elegant-women-s-mule-sandals-low-heel.webp", category: " Estilo Hermes" },
    { id: 9, url: "/custom-leather-wedges.webp", category: "Sandalias" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          images.forEach((_, index) => {
            setTimeout(() => {
              setVisibleImages((prev) => [...prev, index])
            }, index * 100)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="gallery" ref={sectionRef} className="py-24 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-primary)] mb-4 text-balance">
            Galería de creaciones
          </h2>
          <p className="text-lg text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
            Explora algunos de nuestros diseños más destacados. Cada par cuenta una historia única.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
                visibleImages.includes(index) ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url || "/placeholder.svg"}
                alt={`Calzado ${image.category}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-serif text-xl mb-1">{image.category}</p>
                  <p className="text-white/80 text-sm">Ver detalles →</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-[var(--color-surface)] px-3 py-1 rounded-full text-xs font-medium text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <FiX className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url || "/placeholder.svg"}
              alt={selectedImage.category}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="mt-6 text-center">
              <p className="text-white font-serif text-2xl mb-2">{selectedImage.category}</p>
              <p className="text-white/70">Diseño personalizable disponible</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}
