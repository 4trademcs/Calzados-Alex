// src/pages/Products.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BsArrow90DegLeft, BsSearch } from "react-icons/bs";
import ProductCard from "../components/ProductCard";
import { useList } from "../hooks/useList";
import BussinesDetail from "../components/BussinesDetail";
import ScrollIndicator from "../components/ScrollIndicator";

function getModelNumber(name, idx) {
  const m = String(name ?? "").match(/\d+/);
  if (m) return Number(m[0]);
  const n = Number(idx);
  return Number.isFinite(n) ? n : null;
}

export default function Products() {
  // Fuente de verdad: [{ name (sin extensión), url }]
  const { list } = useList({ type: "images" });

  // UI state
  const [inputValue, setInputValue] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [keywords, setKeywords] = useState([]); // solo para búsqueda por texto

  // Filtros fijos
  const fixedFilters = ["nuevos", "en venta"];

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleSearch = () => {
    const typed = inputValue
      .split(",")
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);
    setKeywords(typed);
  };

  // === Reglas globales ===
  const { NEW, UNAVAILABLE } = BussinesDetail.rules;

  // 1) Aplico filtros “nuevos” / “en venta” con las listas globales
  const filteredByFlags = useMemo(() => {
    return list.filter((item, index) => {
      const num = getModelNumber(item?.name, index + 1);

      // Si está activo "nuevos", solo mostrar los pertenecientes a NEW
      if (activeFilters.includes("nuevos")) {
        if (!(num != null && NEW.includes(num))) return false;
      }

      // Si está activo "en venta", excluir los UNAVAILABLE
      if (activeFilters.includes("en venta")) {
        if (num != null && UNAVAILABLE.includes(num)) return false;
      }

      return true;
    });
  }, [list, activeFilters, NEW, UNAVAILABLE]);

  // 2) Aplico búsqueda textual por nombre (keywords)
  const displayed = useMemo(() => {
    if (!keywords.length) return filteredByFlags;
    const needles = keywords.map((k) => k.toLowerCase());
    return filteredByFlags.filter((item) => {
      const name = (item?.name ?? "").toLowerCase();
      return needles.every((k) => name.includes(k));
    });
  }, [filteredByFlags, keywords]);

  const handleShoeClick = ({ id, name, src, tipo, price }) => {
    console.debug("Shoe action:", { id, name, src, tipo, price });
  };

  return (
    <main className="mx-auto flex min-h-dvh flex-col items-center justify-start px-4 py-20 pt-52 gap-8">
      <ScrollIndicator />

      {/* Background Pattern */}
    
        <div
          className="fixed inset-0 z-0 blur-[1px]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' opacity='25%' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%232c2420' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />


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
            <BsSearch size={20} />
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
