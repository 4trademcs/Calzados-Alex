import { useEffect, useRef } from "react";

export default function ScrollFrames() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const lastUpdateRef = useRef(0);
  const currentFrameRef = useRef(0);
  const totalFramesRef = useRef(154); // ajusta si cambia

  const getFrameSrc = (index) => encodeURI(`/frames/bg (${index + 1}).jpg`);

  const updateImage = (frame) => {
    if (!imgRef.current) return;
    imgRef.current.src = getFrameSrc(frame);
    currentFrameRef.current = frame;
  };

  // Recalcula geometría propia de la sección (300vh exactos) y setea listeners
  useEffect(() => {
    const recalc = () => {
      // Altura efectiva de la sección en px: 300vh exactos
      const sectionHeight = window.innerHeight * 3; // 300vh
      // Top absoluto de la sección (px desde el inicio del documento)
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;

      // Rango de scroll "jugable" mientras la imagen está sticky:
      // desde que entra el top de la sección al viewport, hasta que el bottom toca el bottom del viewport
      const playableScroll = Math.max(1, sectionHeight - window.innerHeight);

      // Guardamos en refs para uso del handler
      sectionRef.current.__geom = { sectionTop, playableScroll };
    };

    // init
    updateImage(0);
    recalc();

    // eventos
    const onResize = () => recalc();

    let lastTick = 0;
    const onScroll = () => {
      const now = Date.now();
      if (now - lastTick < 10) return; // throttle
      lastTick = now;

      const { sectionTop, playableScroll } = sectionRef.current.__geom || {};
      if (sectionTop == null) return;

      // Progreso SOLO dentro del tramo de la sección
      const raw = (window.scrollY - sectionTop) / playableScroll;
      const fraction = Math.min(1, Math.max(0, raw));

      const total = totalFramesRef.current;
      const frame = Math.min(total - 1, Math.max(0, Math.floor(fraction * total)));

      if (frame !== currentFrameRef.current) {
        updateImage(frame);
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Contenedor de 300vh exactos */}
      <section
        ref={sectionRef}
        className="relative w-[100vw] h-[300vh] bg-black"
      >
        {/* Wrapper sticky pegado arriba-derecha del contenedor */}
        <div className="sticky top-0">
          <img
            ref={imgRef}
            alt="scroll-frame"
            // block + ml-auto lo lleva visualmente a la esquina superior derecha
            className="block ml-auto max-w-[60vw] max-h-[90vh] object-contain"
          />
        </div>
      </section>

      {/* Contenido siguiente (la página continúa) */}
      <div className="bg-blue-500 h-screen w-screen" />
    </>
  );
}
