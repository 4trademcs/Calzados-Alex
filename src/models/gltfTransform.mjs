// optimize.mjs  (Node ESM)
// Optimiza todos los .glb que estén junto a este archivo (o en la carpeta pasada por CLI)
// Salida: ./optimized/<nombre>_optimized.glb

import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, resolve, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { resample, prune, dedup, draco as dracoFn, textureCompress } from '@gltf-transform/functions';
import draco3d from 'draco3dgltf';
import sharp from 'sharp';

// ---------- Configuración de IO (según docs) ----------
const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(), // Opcional.
    'draco3d.encoder': await draco3d.createEncoderModule(), // Opcional.
  });

// ---------- Transform personalizado: Backface Culling ----------
function backfaceCulling({ cull = true } = {}) {
  return (document) => {
    for (const material of document.getRoot().listMaterials()) {
      material.setDoubleSided(!cull);
    }
  };
}

// ---------- Optimiza un archivo ----------
async function optimizeOne(inputPath, outputPath) {
  console.log(`\n📦 Cargando: ${inputPath}`);
  const document = await io.read(inputPath);

  await document.transform(
    resample(),            // re-muestrea animación (lossless)
    prune(),               // limpia recursos no usados
    dedup(),               // deduplica buffers/materiales/texturas
    dracoFn(),             // comprime geometría Draco
    textureCompress({      // WebP con sharp (Node.js)
      encoder: sharp,
      targetFormat: 'webp',
      resize: [1024, 1024], // ajusta según tu caso (512/768/1024)
    }),
    backfaceCulling({ cull: true }),
  );

  await io.write(outputPath, document);
  console.log(`✅ Guardado: ${outputPath}`);
}

// ---------- Main: mapea .glb y optimiza ----------
async function main() {
  // Directorio donde está este script.
  const scriptDir = dirname(fileURLToPath(import.meta.url));

  // Si pasas una carpeta por CLI, se resuelve respecto al script; si no, usa el scriptDir.
  // Uso: node optimize.mjs            -> procesa los .glb junto al .mjs
  //      node optimize.mjs ./modelos  -> procesa ./modelos (relativo al .mjs)
  const argDir = process.argv[2] ?? '.';
  const rootDir = resolve(scriptDir, argDir);

  const outDir = join(rootDir, 'optimized');
  await mkdir(outDir, { recursive: true });

  console.log(`\n📂 Directorio de entrada: ${rootDir}`);
  console.log(`📁 Directorio de salida:   ${outDir}`);

  const entries = await readdir(rootDir, { withFileTypes: true });

  let count = 0;
  for (const e of entries) {
    if (!e.isFile()) continue;
    if (e.name.toLowerCase().endsWith('.glb') === false) continue;

    const inPath  = join(rootDir, e.name);
    const base    = basename(e.name, extname(e.name));
    const outPath = join(outDir, `${base}.glb`);

    // opcional: si ya existe, saltar
    try { await stat(outPath); console.log(`↪️  Ya existe, salto: ${outPath}`); continue; } catch {}

    await optimizeOne(inPath, outPath);
    count++;
  }

  if (count === 0) {
    console.log('\n⚠️ No se encontraron .glb en el directorio indicado.');
  } else {
    console.log(`\n✨ Completado. Archivos optimizados: ${count}.`);
  }
}

main().catch((err) => {
  console.error('❌ Error crítico:', err?.message || err);
  process.exit(1);
});
