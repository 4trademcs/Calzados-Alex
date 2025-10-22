// src/pages/Model3D.jsx
import { useState, useMemo, useEffect, memo } from "react";
import { BsWhatsapp, BsArrow90DegLeft, BsSearch, BsQuestion } from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";
import BussinesDetail from "../components/BussinesDetail";
import ModelLoader from "../components/ModelLoader";
import { useList } from "../hooks/useList"; // ← para obtener la lista de imágenes

export default function Model3D() {
  const [params] = useSearchParams();
  const initialModel = params.get("model") || "sandalia"; // 👈 nombre del zapato pasado por URL
  const tipo     = params.get("tipo")     || "sandalias";
  const color    = params.get("color")    || "negro";
  const material = params.get("material") || "charol";

  // WhatsApp
  const whatsappNumber =
    BussinesDetail?.contact?.whatsappNumbers?.[0]?.number ?? "00000000";

  // Estados para búsqueda y modelo actual
  const [inputValue, setInputValue] = useState("");
  const [modelName, setModelName] = useState(initialModel); // 👈 carga inicial desde URL

  // Modelo actualmente seleccionado (URL o buscado)
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

  // Memo del visor 3D
  const ModelLoaderMemo = memo(ModelLoader);

  // Mensaje de WhatsApp
  const whatsappMessage = useMemo(() => {
    const msg =
      tipo && selectedModel && color && material
        ? `Hola quiero hacer mi pedido del modelo: ${selectedModel} de tipo: ${tipo} y color: ${color} del material: ${material}.`
        : BussinesDetail?.contact?.wspDefault || "Hola!";
    return encodeURIComponent(msg);
  }, [tipo, selectedModel, color, material]);

  // Buscar solo al pulsar botón/Enter
  const handleSearch = () => {
    const next = inputValue.trim();
    if (next) setModelName(next);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // ======= Menú lateral con la foto original del modelo =======
  const { list: images } = useList("images");
  const [menuOpen, setMenuOpen] = useState(false);

  const matchedImage = useMemo(() => {
    if (!images?.length) return null;
    const target = (selectedModel || "").toLowerCase().trim();
    return images.find(({ name }) => String(name).toLowerCase().trim() === target) || null;
  }, [images, selectedModel]);

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

      {/* Botón lateral de imagen */}
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-16 left-2 z-30 rounded-full px-3 py-2 text-sm bg-white/10 text-white border-2 border-amber-50 shadow backdrop-blur-md hover:bg-white hover:text-black transition"
        aria-label="Ver imagen original"
        title="Ver imagen original"
      >
        Ver imagen
      </button>

      {/* Panel lateral */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-20 bg-black/40 backdrop-blur-sm transition-opacity ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-80 sm:w-96 bg-white shadow-2xl
          transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
        `}
        aria-label="Menú de imagen del modelo"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-base font-semibold text-zinc-900">
            Imagen original
          </h3>
          <button
            onClick={() => setMenuOpen(false)}
            className="rounded-full px-3 py-1 text-sm bg-zinc-100 hover:bg-zinc-200"
            aria-label="Cerrar"
            title="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex-1 overflow-auto">
          <div className="mb-3">
            <p className="text-sm text-zinc-700">
              Modelo: <span className="font-medium">{selectedModel}</span>
            </p>
          </div>

          <div className="rounded-xl overflow-hidden border bg-zinc-50">
            {matchedImage ? (
              <img
                src={matchedImage.url}
                alt={`Foto original de ${selectedModel}`}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            ) : (
              <div className="p-6 text-sm text-zinc-600">
                No se encontró una imagen para <strong>{selectedModel}</strong>.
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={() => setMenuOpen(false)}
            className="w-full rounded-full bg-zinc-900 text-white py-2 text-sm hover:bg-zinc-800 transition"
          >
            Cerrar
          </button>
        </div>
      </aside>

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
          className="fixed top-4 right-2 z-20 rounded-full bg-white/10 text-white p-1 border-2 border-amber-50 shadow backdrop-blur-md hover:bg-white hover:text-black transition"
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
            onChange={(e) => setInputValue(e.target.value)}
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
      <ModelLoaderMemo modelName={selectedModel} />
    </section>
  );
}
