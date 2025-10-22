// src/hooks/useList.js

// — Patrones precompilados (Vite solo permite rutas literales dentro de /src) —
const modulesImages = import.meta.glob("/src/assets/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

const modulesModels = import.meta.glob("/src/models/*.glb", {
  eager: true,
  query: "?url",
  import: "default",
});

/** Convierte el objeto retornado por import.meta.glob a una lista limpia: */
function toList(modules, { sort = "asc" } = {}) {
  const entries = Object.entries(modules).sort((a, b) =>
    sort === "desc" ? b[0].localeCompare(a[0]) : a[0].localeCompare(b[0])
  );

  return entries.map(([path, url]) => {
    const file = path.split("/").pop();
    const name = file.replace(/\.[^.]+$/, ""); // elimina extensión
    return { name, url };
  });
}

/**
 * useList
 * Devuelve una lista de archivos (imágenes o modelos 3D) según el tipo.
 * @returns {{ list: Array<{ name: string, url: string }> }}
 */
export function useList({ type = "images", sort = "asc" } = {}) {
  const modules = type === "models" ? modulesModels : modulesImages;
  const list = toList(modules, { sort });
  console.log(list)
  return { list };
}
