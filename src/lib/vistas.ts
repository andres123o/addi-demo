export type Vista = "resumen" | "rescate" | "cotidiana" | "reglas" | "recorrido" | "experimentos";

// Arriba van cuatro pestañas. Las que tienen varias vistas las muestran en una sub-barra.
export type Grupo = { nombre: string; vistas: [Vista, string][] };

export const GRUPOS: Grupo[] = [
  { nombre: "Resumen", vistas: [["resumen", "Resumen"]] },
  {
    nombre: "Primera compra",
    vistas: [
      ["rescate", "Rescate en la caja"],
      ["cotidiana", "Compra cotidiana"],
      ["reglas", "Reglas"],
    ],
  },
  { nombre: "Primeros 30 días", vistas: [["recorrido", "Primeros 30 días"]] },
  { nombre: "Resultados", vistas: [["experimentos", "Resultados"]] },
];

export const VISTAS: [Vista, string][] = GRUPOS.flatMap((g) => g.vistas);

export const grupoDe = (v: Vista) => GRUPOS.find((g) => g.vistas.some(([k]) => k === v)) ?? GRUPOS[0];
