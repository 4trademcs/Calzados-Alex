// src/components/ProductCard.jsx
import { useState, useMemo, useEffect } from "react";
import { FaRegStar, FaBasketShopping } from "react-icons/fa6";
import { GiHighHeel } from "react-icons/gi";
import { BsWhatsapp, BsX } from "react-icons/bs";
import { Link } from "react-router-dom";
import BussinesDetail from "../components/BussinesDetail";
import Tooltip from "./Tooltip";

/* ===================== Helpers locales ===================== */
function getModelNumber(name, id) {
  const m = String(name ?? "").match(/\d+/);
  if (m) return Number(m[0]);
  const idNum = Number(id);
  return Number.isFinite(idNum) ? idNum : null;
}

function normalizeTipo(value) {
  const v = String(value || "").toLowerCase();
  if (v.includes("alto")) return "alto";
  if (v.includes("bajo")) return "bajo";
  if (v.includes("sand")) return "sandalias";
  return "medio";
}

export default function ProductCard({
  id,
  name,
  url,
  isNew = false,
  isSeller = false,
  isOut = false,
  prioritize = false,
  initialType = "medio",
  onShoeClick = () => {},
  materials = ["Tela Durazno", "Charol"],
}) {
  const {
    BASE_PRICE,
    EXCEPTIONS_BASE_2500,
    TYPE_SURCHARGE,
    MATERIAL_SURCHARGE,
    CHAROL_BLOCKED,
    TIPO_BAJO_BLOCKED,
    TIPO_MEDIO_BLOCKED,
    TIPO_ALTO_BLOCKED,
    SANDALIAS_BLOCKED,
    UNAVAILABLE,
    NEW,
  } = BussinesDetail.rules;

  const src = url || "/placeholder.svg";

  const displayName = useMemo(() => {
    const pretty = String(name ?? "")
      .replace(/[-_]+/g, " ")
      .trim()
      .replace(/\s+/g, " ");
    return pretty.replace(/\b\w/g, (c) => c.toUpperCase());
  }, [name]);

  const modelVal = name || "Sandalia";
  const modelNumber = useMemo(() => getModelNumber(name, id), [name, id]);

  /* Bloqueos por modelo */
  const tipoBlocked = useMemo(() => {
    const num = modelNumber ?? -1;
    return {
      bajo: TIPO_BAJO_BLOCKED.includes(num),
      medio: TIPO_MEDIO_BLOCKED.includes(num),
      alto: TIPO_ALTO_BLOCKED.includes(num),
      sandalias: SANDALIAS_BLOCKED.includes(num),
    };
  }, [modelNumber, TIPO_BAJO_BLOCKED, TIPO_MEDIO_BLOCKED, TIPO_ALTO_BLOCKED, SANDALIAS_BLOCKED]);

  const blockedCharol =
    modelNumber != null && CHAROL_BLOCKED.includes(modelNumber);
  const isUnavailable =
    modelNumber != null && UNAVAILABLE.includes(modelNumber);
  const isNewModel =
    isNew || (modelNumber != null && NEW.includes(modelNumber));

  /* Opciones de tipo (deshabilita según bloqueos) */
  const TYPE_OPTIONS = [
    { value: "bajo", label: "Tacón bajo", disabled: tipoBlocked.bajo },
    { value: "medio", label: "Tacón medio", disabled: tipoBlocked.medio },
    { value: "alto", label: "Tacón alto", disabled: tipoBlocked.alto },
    { value: "sandalias", label: "Sandalias", disabled: tipoBlocked.sandalias },
  ];

  /* Colores */
  const COLORS_BY_MATERIAL = {
    "Tela Durazno": [
      "Negro",
      "Verde oscuro",
      "Verde Azúl",
      "Mostaza",
      "Rosa vieja",
      "Mamonsillo",
      "Beich",
      "Gris",
      "Carmelita",
      "Rojo",
    ],
    Charol: ["Negro", "Blanco", "Beich"],
  };

  const COLOR_HEX = {
    Negro: "#000000",
    "Verde oscuro": "#006400",
    "Verde Azúl": "#0E7490",
    Mostaza: "#D4A017",
    "Rosa vieja": "#C08081",
    Mamonsillo: "#B9C400",
    Beich: "#D9C3A3",
    Gris: "#7A7A7A",
    Carmelita: "#8B5A2B",
    Rojo: "#C00000",
    Blanco: "#FFFFFF",
  };

  /* Estado */
  const coerceTipo = (tipoActual) => {
    const order = ["medio", "bajo", "alto", "sandalias"];
    const t = normalizeTipo(tipoActual);
    if (!tipoBlocked[t]) return t;
    const next = order.find((k) => !tipoBlocked[k]) ?? "medio";
    return next;
  };

  const [tipo, setTipo] = useState(coerceTipo(initialType));
  const defaultMaterial = materials[0] || "Tela Durazno";
  const [material, setMaterial] = useState(
    blockedCharol && defaultMaterial === "Charol"
      ? "Tela Durazno"
      : defaultMaterial
  );

  const initialColor =
    COLORS_BY_MATERIAL[material]?.[0] ??
    Object.keys(COLOR_HEX)[0] ??
    "Negro";
  const [colorName, setColorName] = useState(initialColor);

  const [showColorModal, setShowColorModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);

  /* Correcciones al cambiar restricciones */
  useEffect(() => {
    setTipo((prev) => coerceTipo(prev));
  }, [tipoBlocked.bajo, tipoBlocked.medio, tipoBlocked.alto, tipoBlocked.sandalias]);

  useEffect(() => {
    if (blockedCharol && material === "Charol") {
      const fallback = materials.find((m) => m !== "Charol") || "Tela Durazno";
      setMaterial(fallback);
      const first = COLORS_BY_MATERIAL?.[fallback]?.[0];
      if (first) setColorName(first);
    }
  }, [blockedCharol, material, materials]);

  const availableColors = useMemo(
    () => COLORS_BY_MATERIAL[material] || [],
    [material]
  );
  const colorHex = COLOR_HEX[colorName] ?? "#000000";

  /* Precio dinámico */
  const computePrice = (num, t, mat) => {
    const base =
      num != null && EXCEPTIONS_BASE_2500.includes(num) ? 2500 : BASE_PRICE;
    const key = normalizeTipo(t);
    return base + (TYPE_SURCHARGE[key] ?? 0) + (MATERIAL_SURCHARGE[mat] ?? 0);
  };

  const price = useMemo(
    () => computePrice(modelNumber, tipo, material),
    [modelNumber, tipo, material]
  );

  /* Querystring */
  const search = useMemo(() => {
    const params = new URLSearchParams({
      model: modelVal || "",
      tipo: normalizeTipo(tipo) || "",
      color: colorName || "",
      material: material || "",
    });
    return `?${params.toString()}`;
  }, [modelVal, tipo, colorName, material]);

  const BTN_BASE =
    "z-[2] flex h-14 w-14 items-center justify-center rounded-full " +
    "border-4 border-[var(--color-item)] bg-brandGreen text-[#222] " +
    "transition duration-200 opacity-0 -translate-y-2 hover:scale-125 " +
    "group-hover:opacity-100 group-focus-within:opacity-100 " +
    "group-hover:bg-[#f5f5f5] group-focus-within:bg-[#f5f5f5] focus:outline-none " +
    "group-hover:animate-bounce group-focus-within:animate-bounce cursor-pointer";

  const whatsappNumber =
    BussinesDetail?.contact?.whatsappNumbers?.[0]?.number ?? "00000000";

  const TYPE_LABEL = useMemo(
    () =>
      TYPE_OPTIONS.find((t) => t.value === normalizeTipo(tipo))?.label ??
      "Tacón medio",
    [tipo, TYPE_OPTIONS]
  );

  const whatsappMessage = useMemo(() => {
    const msg = `Hola quiero hacer mi pedido del modelo: ${displayName} de tipo de suela: ${
      TYPE_OPTIONS.find((o) => o.value === normalizeTipo(tipo))?.label
    } y color: ${colorName} del material: ${material}.`;
    return encodeURIComponent(msg);
  }, [displayName, tipo, colorName, material]);

  return (
    <>
        <article
          tabIndex={0}
          className={`group relative w-[300px] rounded-[30px] bg-[var(--color-item)] transition ${
            isUnavailable ? "grayscale opacity-80" : ""
          }`}
          style={{ "--color-item": isSeller ? "#f26a5f" : "#2B2B2B" }}
          data-new={isNew || undefined}
          data-seller={isSeller || undefined}
          data-out={isOut || undefined}
          data-prioritize={prioritize || undefined}
        >
          {/* Badges absolutas */}
          {isNewModel && (
            <img
              src="/new.webp"
              alt="Nuevo"
              className="pointer-events-none select-none absolute top-2 right-2 w-12 h-12 z-20"
              loading="lazy"
            />
          )}
          {isUnavailable && (
            <img
              src="/unavailable.webp"
              alt="No disponible"
              className="pointer-events-none select-none absolute top-2 right-2 w-12 h-12 z-20"
              loading="lazy"
            />
          )}

          <div className="basicInfo relative rounded-[25px] bg-[#f5f5f5] p-5 pb-10 select-none">
            {/* Title */}
            <h3 className="name title mb-2 pb-[3px] text-lg font-bold text-zinc-900">
              Modelo {displayName || "Producto"}
            </h3>

            {/* Tipo + Material */}
            <div
              className="mb-4 flex flex-row justify-between opacity-0 transition duration-300 scale-25 group-focus-within:opacity-100 group-focus-within:scale-100 group-hover:opacity-100 group-hover:scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tipo */}
              <div className="flex flex-col items-start gap-2 z-10">
                <label
                  htmlFor={`tipo-${id}`}
                  className="text-sm font-bold text-zinc-700"
                >
                  Tipo de suela:
                </label>
                <select
                  id={`tipo-${id}`}
                  value={normalizeTipo(tipo)}
                  onChange={(e) => setTipo(e.target.value)}
                  aria-label="Seleccionar tipo de calzado"
                  className="rounded-md border-[1.5px] border-[var(--color-item)] bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-zinc-800 shadow-sm"
                >
                  {TYPE_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Material */}
              <div className="flex flex-col items-end gap-2 z-10">
                <label
                  htmlFor={`material-${id}`}
                  className="text-sm font-semibold text-zinc-700"
                >
                  Material:
                </label>
                <select
                  id={`material-${id}`}
                  value={material}
                  onChange={(e) => {
                    const next = e.target.value;
                    setMaterial(next);
                    const first = COLORS_BY_MATERIAL?.[next]?.[0];
                    if (first) setColorName(first);
                  }}
                  aria-label="Seleccionar material del calzado"
                  className="rounded-md border-[1.5px] border-[var(--color-item)] bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-zinc-800 shadow-sm"
                >
                  {materials.map((m) => (
                    <option
                      key={m}
                      value={m}
                      disabled={m === "Charol" && blockedCharol}
                    >
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Imagen */}
            <div className="images">
              <div className="img relative z-[1] text-center">
                <div className="item inline-block">
                  <img
                    src={src}
                    alt={displayName || "Producto"}
                    className="
                      h-[200px] transition drop-shadow-[10px_7px_3px_#2b2b2bb8]
                      group-hover:drop-shadow-[10px_7px_3px_#2b2b2b]
                      group-focus-within:drop-shadow-[10px_7px_3px_#2b2b2b]
                      [transform:scale(1)_rotate(20deg)] duration-400
                      group-hover:[transform:scale(1.2)_rotate(30deg)_translate(10px,-20px)]
                      group-focus-within:[transform:scale(1.2)_rotate(30deg)_translate(10px,-20px)]
                    "
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Botones flotantes */}
            <div className="addCard absolute bottom-3 left-0 w-full">
              {/* Carrito → WhatsApp */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSendModal(true);
                }}
                className={`absolute left-8 ${BTN_BASE}`}
                title="Agregar al carrito"
                aria-label="Agregar al carrito"
              >
                <FaBasketShopping size={25} />
              </button>

              {/* Color (modal) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColorModal(true);
                }}
                className={`absolute left-1/2 transform -translate-x-1/2 ${BTN_BASE} opacity-100 scale-125`}
                title={`Color: ${colorName}`}
                aria-label="Elegir color"
                style={{ background: colorHex }}
              />

              {/* Zapato → /model */}
              <Link
                to={{ pathname: "/model", search }}
                onClick={(e) => {
                  e.stopPropagation();
                  onShoeClick({
                    id,
                    name: modelVal,
                    src,
                    tipo: normalizeTipo(tipo),
                    color: colorName,
                    material,
                    price,
                  });
                }}
                className={`absolute right-6 ${BTN_BASE}`}
                title="Ver en 3D"
                aria-label="Ver en 3D"
              >
                <GiHighHeel size={30} />
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mores p-[25px]">
            <div className="stars inline-flex gap-1 text-[#9b9a9a]">
              <FaRegStar className="text-[rgb(209,209,6)]" />
              <FaRegStar className="text-[rgb(209,209,6)]" />
              <FaRegStar className="text-[rgb(209,209,6)]" />
              <FaRegStar className="text-[rgb(209,209,6)]" />
              <FaRegStar />
            </div>
            <div className="price float-right font-semibold tracking-[1px] text-[#eee]">
              ${price.toFixed(2)}
            </div>
          </div>
        </article>

      {/* Modal de colores */}
      {showColorModal && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowColorModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-zinc-900">
                Elegir color ({material})
              </h3>
              <p className="text-sm text-zinc-600">
                Toca un color para seleccionarlo. Cambia el material desde el
                selector superior.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {availableColors.map((n, i) => {
                const hex = COLOR_HEX[n] ?? "#000000";
                const active = n === colorName;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setColorName(n)}
                    className={`h-10 w-10 rounded-full border-2 transition ${
                      active
                        ? "scale-110 border-zinc-800"
                        : "border-zinc-300 hover:scale-105"
                    }`}
                    style={{ background: hex }}
                    title={n}
                    aria-label={`Elegir color ${n}`}
                  />
                );
              })}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowColorModal(false)}
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowColorModal(false)}
                className="rounded-full bg-zinc-900 text-white px-4 py-2 text-sm hover:bg-zinc-800"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {showSendModal && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowSendModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-6 pb-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-zinc-900">
                Orden de compra:
              </h3>
              <p className="text-sm text-zinc-600">
                Estás a punto de hacer una orden con las siguientes
                características: Modelo:{" "}
                <span className="text-black font-bold"> {displayName} </span>
                de tipo de suela:{" "}
                <span className="text-black font-bold">
                  {
                    TYPE_OPTIONS.find((o) => o.value === normalizeTipo(tipo))
                      ?.label
                  }
                </span>{" "}
                y color:{" "}
                <span className="text-black font-bold">{colorName}</span> del
                material:{" "}
                <span className="text-black font-bold">{material}</span>. ¿Estás
                seguro?
              </p>
            </div>
            <button
              onClick={() => setShowSendModal(false)}
              className="rounded-full absolute flex items-center top-1 right-1 p-1 bg-zinc-300 text-2xl text-black hover:bg-zinc-400"
            >
              <BsX />
            </button>

            <div className="mt-6 flex justify-end gap-3 relative">
              <Link
                to={{ pathname: "/model", search }}
                onClick={(e) => {
                  e.stopPropagation();
                  onShoeClick({
                    id,
                    name: modelVal,
                    src,
                    tipo: normalizeTipo(tipo),
                    color: colorName,
                    material,
                    price,
                  });
                }}
                className="rounded-full border flex flex-row items-center border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-100"
                title="Ver en 3D"
                aria-label="Ver en 3D"
              >
                <GiHighHeel size={30} /> Ver en 3D
              </Link>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full flex flex-row gap-1 items-center bg-zinc-900 text-white px-4 py-2 text-sm hover:bg-zinc-800"
                title="Enviar mensaje"
                aria-label="Enviar mensaje"
                onClick={() => setShowSendModal(false)}
              >
                <BsWhatsapp className="w-5 h-5 text-green-500" />
                <span className="font-medium">Sí, vamos</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
