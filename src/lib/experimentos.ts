// Un experimento por semana, cada uno con su grupo de control. Datos simulados.
// La lectura decide sola: si la diferencia puede ser ruido, si paga lo que cuesta y qué hacer.

export type Experimento = {
  semana: number;
  nombre: string;
  grupo: string;
  metrica: "Primera compra" | "Segunda compra";
  incentivo: number; // pesos por cada compra con incentivo; 0 si no hay descuento
  variante: { n: number; compran: number };
  control: { n: number; compran: number };
};

export const EXPERIMENTOS: Experimento[] = [
  {
    semana: 1,
    nombre: "$50.000 en la primera compra del Marketplace",
    grupo: "Cupo preaprobado sin compra",
    metrica: "Primera compra",
    incentivo: 50_000,
    variante: { n: 12_000, compran: 1_500 },
    control: { n: 3_000, compran: 360 },
  },
  {
    semana: 1,
    nombre: "Pago inicial cuando el cupo no alcanza",
    grupo: "Rechazados al pagar",
    metrica: "Primera compra",
    incentivo: 0,
    variante: { n: 7_000, compran: 3_150 },
    control: { n: 1_750, compran: 35 },
  },
  {
    semana: 2,
    nombre: "Costo total visible antes de pagar",
    grupo: "Aprobados nuevos",
    metrica: "Segunda compra",
    incentivo: 0,
    variante: { n: 8_000, compran: 3_200 },
    control: { n: 2_000, compran: 680 },
  },
  {
    semana: 3,
    nombre: "WhatsApp en vez de push el día 1",
    grupo: "Sin intento de compra",
    metrica: "Primera compra",
    incentivo: 0,
    variante: { n: 9_000, compran: 990 },
    control: { n: 3_000, compran: 300 },
  },
  {
    semana: 4,
    nombre: "$25.000 en la segunda compra",
    grupo: "Una compra y 20 días sin volver",
    metrica: "Segunda compra",
    incentivo: 25_000,
    variante: { n: 6_000, compran: 1_260 },
    control: { n: 1_500, compran: 255 },
  },
  {
    semana: 4,
    nombre: "QR en el datáfono para la primera compra",
    grupo: "Sin compra y comercio aliado cerca",
    metrica: "Primera compra",
    incentivo: 0,
    variante: { n: 11_200, compran: 3_448 },
    control: { n: 2_800, compran: 112 },
  },
];

// Lo máximo que vale la pena pagar por una compra que no habría pasado sin el incentivo.
export const TOPE_POR_INCREMENTAL = 100_000;

export type Decision = "Escalar" | "Ajustar" | "Parar";

export function leer(e: Experimento) {
  const tv = e.variante.compran / e.variante.n;
  const tc = e.control.compran / e.control.n;
  // Prueba de diferencia de proporciones: |z| > 1,96 es una diferencia real con 95 % de confianza.
  const p = (e.variante.compran + e.control.compran) / (e.variante.n + e.control.n);
  const z = (tv - tc) / Math.sqrt(p * (1 - p) * (1 / e.variante.n + 1 / e.control.n));
  const real = z > 1.96;
  const incrementales = Math.round((tv - tc) * e.variante.n);
  const costo = e.incentivo * e.variante.compran;
  const porIncremental = incrementales > 0 ? costo / incrementales : Infinity;

  const decision: Decision = !real
    ? costo > 0 ? "Parar" : "Ajustar" // puede ser ruido: si cuesta, se para; si no, se prueba otra versión
    : costo > 0 && porIncremental > TOPE_POR_INCREMENTAL
      ? "Ajustar" // funciona, pero cada compra extra cuesta más de lo que vale
      : "Escalar";
  return { tv, tc, real, incrementales, costo, porIncremental, decision };
}
