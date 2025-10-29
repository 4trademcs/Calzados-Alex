// src/components/ModelLoader.jsx
import { useEffect, useMemo } from "react";
import { useList } from "../hooks/useList";
import { useSubList } from "../hooks/useSubList";
import localModelViewer from "../vendor/model-viewer.min.js?url";

import defaultImage from "../models/default.webp?url";
import Preloader from "./Preloader";

export default function ModelLoader({ modelName = "", alt = "Modelo 3D", poster, ar = false }) {
  const { list } = useList({ type: "models" });

  const norm = (s = "") => String(s).trim().toLowerCase().replace(/\s+/g, " ");

  const keywords = useMemo(() => {
    const q = norm(modelName);
    return q ? q.split(/[,\s]+/).filter(Boolean) : [];
  }, [modelName]);

  const lowered = useMemo(
    () => list.map(({ name, url }) => ({ name: norm(name), url })),
    [list]
  );

  const exact = useMemo(() => {
    const target = norm(modelName);
    if (!target) return null;
    return lowered.find((it) => it.name === target) || null;
  }, [lowered, modelName]);

  const { sublist } = useSubList(lowered, keywords);
  const filtered = exact ? [exact] : (keywords.length ? sublist : lowered);

  // Si hay match o existe un "default.glb" en la carpeta /src/models, úsalo.
  // Si NO hay ninguno, devolvemos null para activar la imagen fallback.
  const computedSrc = useMemo(() => {
    return (
      filtered?.[0]?.url ||
      list.find((it) => norm(it.name) === "default")?.url ||
      null
    );
  }, [filtered, list]);

  // Cargar model-viewer (local) SOLO si vamos a renderizar el <model-viewer>
  useEffect(() => {
    if (!computedSrc) return; // no hay modelo → no cargamos el script
    if (window.customElements?.get("model-viewer")) return;
    const script = document.createElement("script");
    script.type = "module";
    script.src = localModelViewer;
    document.head.appendChild(script);
  }, [computedSrc]);

  return (
    <div
      className="fixed inset-0 w-screen h-dvh flex items-center justify-center
                 bg-[radial-gradient(circle_at_center,#18223c_0%,#0d1224_70%,#060810_100%)]"
    >
      {/* Pequeños glows para iluminación */}
      <div className="absolute top-[20%] left-[30%] w-40 h-40 bg-white rounded-full blur-[120px]" />
      <div className="absolute bottom-[15%] right-[25%] w-56 h-56 bg-blue-500 rounded-full blur-[150px]" />

      {computedSrc ? (
        // ✅ Hay modelo: usamos <model-viewer> con preloader
        <Preloader events={["load"]} minDurationMs={3000} watchKey={computedSrc}>
          {/* @ts-ignore */}
          <model-viewer
            src={computedSrc}
            alt={alt}
            style={{ width: "100%", height: "100%" }}
            poster={poster}
            camera-controls
            touch-action="pan-y"
            interaction-prompt="auto"
            auto-rotate
            auto-rotate-delay="3000"
            rotation-per-second="20deg"
            min-camera-orbit="auto auto 0.5m"
            max-camera-orbit="auto auto 5m"
            interpolation-decay="200"
            /* 💡 Iluminación "Studio Pure Light" */
            environment-image="neutral"
            exposure="1.4"
            shadow-intensity="0.9"
            shadow-softness="1"
            tone-mapping="aces"
            /* 💫 Ajuste AR opcional */
            ar={ar ? true : undefined}
            ar-modes={ar ? "webxr scene-viewer quick-look" : undefined}
            ar-scale={ar ? "auto" : undefined}
            disable-zoom={false}
            ios-src={computedSrc}
          />
        </Preloader>
      ) : (
        // ❌ No hay modelo disponible: mostramos imagen fallback default.webp
        <div className="relative z-10 px-4">
          <img
            src={defaultImage}
            alt="Vista previa no disponible"
            className="max-w-[min(90vw,900px)] w-full h-auto rounded-xl drop-shadow-[-1px_-1px_1px_white] bg-transparent"
            loading="eager"
          />
        </div>
      )}
    </div>
  );
}
