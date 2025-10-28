// src/components/Preloader.jsx
import { useEffect, useRef, useState, cloneElement } from "react";
import { ImSpinner2 } from "react-icons/im";

/** Marca ready=true cuando el custom element emite alguno de los eventos.
 *  Se "rearma" cuando cambia resetKey.
 */
function useReady(elRef, events = ["load"], resetKey) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false); // 🔁 reinicia estado al cambiar resetKey
    const el = elRef.current;
    if (!el) return;
    const mark = () => setReady(true);

    events.forEach((ev) => el.addEventListener(ev, mark, { once: true }));
    return () => events.forEach((ev) => el.removeEventListener(ev, mark));
    // rearmamos al cambiar el ref, el set de eventos, o el resetKey
  }, [elRef, events.join("|"), resetKey]);

  return ready;
}

/**
 * Preloader:
 * - visible SIEMPRE mínimo `minDurationMs`
 * - si el modelo NO está listo tras ese mínimo, el overlay sigue visible
 * - se re-arma en cada cambio de `watchKey` (p.ej., el src del modelo)
 */
export default function Preloader({events = ["load"], minDurationMs = 3000, watchKey, children}) {
  const elRef = useRef(null);
  const domReady = useReady(elRef, events, watchKey);

  // reiniciar el “mínimo de 3s” cada vez que cambia watchKey
  const mountedAtRef = useRef(performance.now());
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    mountedAtRef.current = performance.now();
    setOverlayVisible(true); // vuelve a mostrar el overlay al cambiar de modelo
  }, [watchKey]);

  useEffect(() => {
    let t;
    if (domReady) {
      const elapsed = performance.now() - mountedAtRef.current;
      const remaining = Math.max(minDurationMs - elapsed, 0);
      t = remaining > 0
        ? setTimeout(() => setOverlayVisible(false), remaining)
        : (setOverlayVisible(false), null);
    } else { setOverlayVisible(true); }
    return () => t && clearTimeout(t);
  }, [domReady, minDurationMs]);

  return (
    <div className="relative w-full h-full" aria-busy={overlayVisible}>
      {overlayVisible && (
        <div className={`absolute inset-0 grid place-content-center bg-[#0d1224] z-10`}>
          <ImSpinner2 className="animate-spin m-auto" color="1d293d" size={100} />
          <h2 className="mt-4 animate-pulse text-slate-600 text-xl text-center">
            Cargando modelo 3D…
          </h2>
        </div>
      )}

      {/* Render siempre; fade-in cuando esté listo */}
      <div className={`w-full h-full transition-opacity ${domReady ? "opacity-100" : "opacity-0"}`}>
        {cloneElement(children, { ref: elRef })}
      </div>
    </div>
  );
}
