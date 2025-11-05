// src/pages/Model3D.jsx
import { useState, useMemo, useEffect } from "react";
import { BsWhatsapp, BsArrow90DegLeft, BsSearch, BsQuestion, BsList } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import BussinesDetail from "../components/BussinesDetail";
import ModelLoader from "../components/ModelLoader";
import { useList } from "../hooks/useList";

export default function Model3D() {
  const [params] = useSearchParams();
  const initialModel = params.get("model") || "sandalia";
  const tipo     = params.get("tipo")     || "sandalias";
  const color    = params.get("color")    || "negro";
  const material = params.get("material") || "charol";

  // WhatsApp
  const whatsappNumber = BussinesDetail?.contact?.whatsappNumbers?.[0]?.number ?? "00000000";

  // Búsqueda y modelo actual
  const [inputValue, setInputValue] = useState("");
  const [modelName, setModelName] = useState(initialModel);

  // ✅ Debounce: si el usuario deja de escribir 2s, aplicamos el valor
  useEffect(() => {
    if (!inputValue.trim()) return;
    const t = setTimeout(() => {
      setModelName(inputValue.trim());
    }, 2000);
    return () => clearTimeout(t);
  }, [inputValue]);

  // Modelo seleccionado final
  const selectedModel = useMemo(
    () => (modelName && modelName.trim() ? modelName.trim() : initialModel),
    [modelName, initialModel]
  );

  // Nota
  const [notaVisible, setNotaVisible] = useState(true);
  useEffect(() => {
    if (!notaVisible) return;
    const t = setTimeout(() => setNotaVisible(false), 15000);
    return () => clearTimeout(t);
  }, [notaVisible]);

  // Mensaje WhatsApp
  const whatsappMessage = useMemo(() => {
    const msg = tipo && selectedModel && color && material
      ? `Hola quiero hacer mi pedido del modelo: ${selectedModel} de tipo: ${tipo} y color: ${color} del material: ${material}.`
      : BussinesDetail?.contact?.wspDefault || "Hola!";
    return encodeURIComponent(msg);
  }, [tipo, selectedModel, color, material]);

  // Mensaje del modal
  const Message = useMemo(() => {
    const msg = tipo && selectedModel && color && material
      ? `Este es el modelo : ${selectedModel} con suela tipo: ${tipo} y le llega de color: ${color} con material: ${material}.`
      : "Upss, algo ha ido mal!";
    return msg;
  }, [tipo, selectedModel, color, material]);

  // Buscar al pulsar botón o Enter (inmediato, ignora debounce)
  const handleSearch = () => {
    const next = inputValue.trim();
    if (next) setModelName(next);
  };
  const handleKeyDown = (e) => { if (e.key === "Enter") handleSearch(); };

  // ======= Imagen del modelo (para el modal) =======
  const { list: images } = useList({ type: "images" });
  const matchedImage = useMemo(() => {
    if (!images?.length) return null;
    const target = (selectedModel || "").toLowerCase().trim();
    return images.find(({ name }) => String(name).toLowerCase().trim() === target) || null;
  }, [images, selectedModel]);

  // Estado del modal (imagen seleccionada)
  const [selectedImage, setSelectedImage] = useState(null);

  // Cuando cambia el modelo seleccionado, si el modal estaba abierto pero ya no hay imagen, lo cerramos
  useEffect(() => {
    if (selectedImage && !matchedImage) setSelectedImage(null);
  }, [matchedImage, selectedImage]);

  return (
    <section className="relative flex min-h-dvh items-center justify-center flex-col">
      {/* ← Volver */}
      <Link
        to="/products"
        className="fixed top-4 left-2 z-30 text-white border-2 border-amber-50 rounded-full bg-white/10 shadow backdrop-blur-md p-2 hover:bg-white hover:text-black transition"
        aria-label="Volver a productos"
        title="Volver a productos"
      >
        <BsArrow90DegLeft />
      </Link>

      {/* Botón para abrir modal con imagen */}
      <button
        onClick={() => {
          if (matchedImage) {
            setSelectedImage({ url: matchedImage.url, category: selectedModel, message: Message });
          } else {
            setSelectedImage({ url: "/placeholder.svg", category: selectedModel, message: "No se encontró una imagen para este modelo." });
          }
        }}
        className="fixed top-4 right-2 z-20 rounded-full p-1 text-sm bg-white/10 text-white border-2 border-amber-50 shadow backdrop-blur-md hover:bg-white hover:text-black transition"
        aria-label="Ver imagen original"
        title="Ver imagen original"
      >
        <BsList size={25} />
      </button>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
          aria-modal="true"
          role="dialog"
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Cerrar"
            title="Cerrar"
          >
            <FiX className="w-6 h-6 text-white" />
          </button>

          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url || "/placeholder.svg"}
              alt={selectedImage.category}
              className="w-full max-w-2xs m-auto h-auto rounded-2xl shadow-2xl"
              loading="lazy"
            />
            <div className="mt-6 text-center">
              <p className="text-white font-serif text-2xl mb-2">{selectedImage.category}</p>
              <p className="text-white/70">Datos del calzado:</p>
              {/* Mensaje adicional bajo la imagen (derivado del estado de la página) */}
              <p className="text-white/70 mt-2">{selectedImage.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nota (toggle) */}
      {notaVisible ? (
        <button
          onClick={() => setNotaVisible(false)}
          className="fixed top-32 right-4 z-20 max-w-xs text-left rounded-3xl rounded-tr-none border-2 border-amber-50 bg-white/10 shadow backdrop-blur-md p-3 text-white hover:bg-white/20 transition"
          aria-label="Ocultar nota"
          title="Ocultar nota"
        >
          <span className="font-bold text-xs leading-relaxed">
            NOTA:
            <p className="mt-1">
              Esto es solo una representación de lo que usted recibirá. El producto final vendrá acorde a la imagen y el modelo que seleccionó previamente.
            </p>
          </span>
        </button>
      ) : (
        <button
          onClick={() => setNotaVisible(true)}
          className="fixed bottom-6 left-2 z-20 rounded-full bg-white/10 text-white p-1 border-2 border-amber-50 shadow backdrop-blur-md hover:bg-white hover:text-black transition"
          aria-label="Mostrar nota"
          title="Mostrar nota"
        >
          <BsQuestion size={25} />
        </button>
      )}

      {/* 🔍 Barra de búsqueda */}
      <section className="fixed xl:top-10 top-14 left-1/2 -translate-x-1/2 z-10 w-full max-w-2xl flex flex-col items-center">
        <div className="flex w-full gap-2 p-2">
          <input
            type="text"
            placeholder="Buscar modelo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}   // ✅ sin setTimeout aquí
            onKeyDown={handleKeyDown}
            className="flex-1 bg-white/10 shadow backdrop-blur-md text-white placeholder-white/70 border-4 border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-full"
          />
          <button
            onClick={handleSearch}
            className="rounded-full bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700 transition"
            aria-label="Buscar modelo"
            title="Buscar modelo"
          >
            <BsSearch />
          </button>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="z-20 border-2 border-amber-50 text-white fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 p-4 animate-bounce rounded-full hover:bg-white transition-all duration-300 hover:scale-110 hover:text-black shadow-lg bg-white/10 backdrop-blur-md"
      >
        <BsWhatsapp className="w-5 h-5 text-green-500" />
        <span className="font-medium">Hacer pedido</span>
      </a>

      {/* ✅ Visor del modelo 3D con nombre pasado por URL */}
      <ModelLoader modelName={selectedModel} />
    </section>
  );
}
