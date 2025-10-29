// src/pages/Products.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BsArrow90DegLeft,BsSearch } from "react-icons/bs";
import ProductCard from "../components/ProductCard";
import { useList } from "../hooks/useList";

export default function Products() {
  // Fuente de verdad: [{ name (sin extensión), url }]
  const { list } = useList({ type: "images" }); // por defecto ya es "images"; explícito por claridad

  // UI state
  const [inputValue, setInputValue] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [keywords, setKeywords] = useState([]); // se actualiza SOLO al pulsar "Buscar"

  // Filtros fijos
  const fixedFilters = ["nuevos", "en venta"];

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const handleSearch = () => {
    const typed = inputValue
      .split(",")
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    setKeywords([...typed, ...activeFilters]);
  };

  // Filtrado derivado por keywords contra item.name (sin extensión)
  const displayed = useMemo(() => {
    if (!keywords.length) return list;
    const needles = keywords.map((k) => k.toLowerCase());
    return list.filter((item) => {
      const name = (item?.name ?? "").toLowerCase();
      return needles.every((k) => name.includes(k));
    });
  }, [list, keywords]);

  const handleShoeClick = ({ id, name, src, tipo, price }) => {
    // Acción del botón "zapato" (modal, 3D, etc.)
    console.debug("Shoe action:", { id, name, src, tipo, price });
  };

  return (
    <main className="mx-auto flex min-h-dvh flex-col items-center justify-start px-4 py-20 pt-52 gap-8">
      {/* ← Ir atrás */}
      <Link
        to="/"
        className="fixed text-black border-2 border-black rounded-full animate-pulse bg-white/10 shadow backdrop-blur-md p-2 top-4 left-2 z-20"
        aria-label="Volver al inicio"
        title="Volver al inicio"
      >
        <BsArrow90DegLeft />
      </Link>

      {/* 🔍 Barra de búsqueda */}
      <section className="fixed w-full xl:top-10 top-14 max-w-2xl flex flex-col items-center z-60">
        <div className="flex w-full gap-2 p-2">
          <input
            type="text"
            placeholder="Buscar palabras separadas por comas..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 rounded-full border-2 border-black bg-white/10 shadow backdrop-blur-md px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="rounded-full bg-blue-600 px-2.5 py-1 text-white text-sm hover:bg-blue-700 transition"
          >
           <BsSearch size={20}/>
          </button>
        </div>

        {/* 🟢 Filtros fijos */}
        <div className="flex gap-3 mt-2">
          {fixedFilters.map((f) => {
            const active = activeFilters.includes(f);
            return (
              <button
                key={f}
                onClick={() => toggleFilter(f)}
                className={`
                  rounded-full px-4 py-1 text-sm font-medium border transition
                  ${
                    active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white/10 shadow backdrop-blur-md text-black hover:bg-gray-100 border-2 border-black"
                  }
                `}
              >
                {f}
              </button>
            );
          })}
        </div>
      </section>

      {/* 🖼️ Grid de productos */}
      <section className="list flex flex-wrap justify-center gap-4">
        {displayed.map((item, index) => (
          <ProductCard
            key={item.name ?? index}
            id={index + 1}
            name={item.name}   
            url={item.url}     
            onShoeClick={handleShoeClick}
          />
        ))}
      </section>
    </main>
  );
}
