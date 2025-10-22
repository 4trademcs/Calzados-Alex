// Filtra una lista [{ name, url }] por palabras clave dentro del nombre.
// Si no se pasa ningún keyword, devuelve todos.
// Usa comparación AND (todas las palabras deben aparecer).

export function useSubList(items = [], keywords = []) {
  if (!keywords.length) return { sublist: items };

  const sublist = items.filter(({ name }) =>
    keywords.every(k => name.includes(k))
  );
  console.log("mir",sublist)
  return { sublist };
}
