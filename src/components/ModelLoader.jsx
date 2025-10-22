// src/components/ModelLoader.jsx
import { useEffect, useMemo } from "react";
import { useList } from "../hooks/useList";
import { useSubList } from "../hooks/useSubList";
import localModelViewer from "../vendor/model-viewer.min.js?url";
import defaultModelUrl from "../models/default.glb?url";

export default function ModelLoader({
  modelName = "",
  alt = "Modelo 3D",
  poster,
  ar = false,
}) {
  // 1) Lista de modelos [{ name (sin ext), url }]
  const { list } = useList({ type: "models" });

  // 2) Cargar <model-viewer> local (offline) una sola vez
  useEffect(() => {
    const alreadyDefined = window.customElements?.get("model-viewer");
    if (alreadyDefined) return;
    const script = document.createElement("script");
    script.type = "module";
    script.src = localModelViewer;
    document.head.appendChild(script);
  }, []);

  // 3) Normalizador
  const norm = (s = "") => String(s).trim().toLowerCase().replace(/\s+/g, " ");

  // 4) keywords desde modelName
  const keywords = useMemo(() => {
    const q = norm(modelName);
    if (!q) return [];
    return q.split(/[,\s]+/).filter(Boolean);
  }, [modelName]);

  // 5) Lista “lowercased” para filtrar con includes case-sensitive
  const loweredItems = useMemo(
    () => list.map(({ name, url }) => ({ name: norm(name), url })),
    [list]
  );

  // 6) Coincidencia exacta por nombre normalizado (preferida)
  const exactMatch = useMemo(() => {
    const target = norm(modelName);
    if (!target) return null;
    return loweredItems.find((it) => it.name === target) || null;
  }, [loweredItems, modelName]);

  // 7) Si no hay exacta, usar filtro AND por keywords
  const filtered = useMemo(() => {
    if (exactMatch) return [exactMatch];
    if (!keywords.length) return loweredItems;
    const { sublist } = useSubList(loweredItems, keywords); // AND
    return sublist;
  }, [loweredItems, keywords, exactMatch]);

  // 8) URL final: exacta/primer match → “default.glb” si existe → import fallback
  const computedSrc = useMemo(() => {
    const candidate =
      filtered?.[0]?.url ||
      list.find((it) => norm(it.name) === "default")?.url ||
      defaultModelUrl;
    return candidate;
  }, [filtered, list]);

  return (
    <div className="fixed inset-0 w-screen h-dvh bg-black">
      {/* @ts-ignore */}
      <model-viewer
        src={computedSrc}
        alt={alt}
        style={{ width: "100%", height: "100%" }}
        poster={poster}
        exposure="1"
        environment-image="neutral"
        camera-controls
        touch-action="pan-y"
        interaction-prompt="auto"
        auto-rotate
        auto-rotate-delay="3000"
        rotation-per-second="20deg"
        min-camera-orbit="auto auto 0.5m"
        max-camera-orbit="auto auto 5m"
        interpolation-decay="200"
        ar={ar ? true : undefined}
        ar-modes={ar ? "webxr scene-viewer quick-look" : undefined}
        ar-scale={ar ? "auto" : undefined}
        shadow-intensity="0.6"
        disable-zoom={false}
        ios-src={computedSrc}
      />
    </div>
  );
}
