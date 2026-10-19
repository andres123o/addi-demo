// Formatos en español de Colombia: "$300.000", "64,1 %", "Hace 4 min".
export const miles = (n: number) => n.toLocaleString("es-CO");

export const pesos = (n: number) => `$${n.toLocaleString("es-CO")}`;

// "$800 M" para cifras grandes.
export const millones = (n: number) => `$${(n / 1_000_000).toLocaleString("es-CO", { maximumFractionDigits: 0 })} M`;

export const pct = (x: number, dec = 1) => `${(x * 100).toLocaleString("es-CO", { minimumFractionDigits: dec, maximumFractionDigits: dec })} %`;

export function haceCuanto(min: number) {
  if (min < 1) return "Ahora";
  if (min < 60) return `Hace ${min} min`;
  const h = Math.round(min / 60);
  return h === 1 ? "Hace 1 h" : `Hace ${h} h`;
}
