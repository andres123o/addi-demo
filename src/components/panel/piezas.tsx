"use client";

// Piezas del panel. Todo se lee de un vistazo: color + palabra, nunca solo color.
import type { ReactNode } from "react";
import { Check, Clock, ShieldCheck, X, type LucideIcon } from "lucide-react";
import type { Estado } from "@/lib/datos";

export function Tarjeta({ titulo, derecha, children, className = "" }: { titulo?: ReactNode; derecha?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={"rounded-tarjeta border border-linea bg-fondo p-5 shadow-xs sm:p-6 " + className}>
      {titulo && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-titulo text-[17px] font-medium tracking-[-0.02em]">{titulo}</h2>
          {derecha}
        </div>
      )}
      {children}
    </section>
  );
}

export function Cifra({ titulo, n, nota, tono = "tenue", children }: { titulo: string; n: string; nota?: ReactNode; tono?: "tenue" | "exito"; children?: ReactNode }) {
  return (
    <section className="flex flex-col rounded-tarjeta border border-linea bg-fondo p-5 shadow-xs">
      <h3 className="text-[14px] text-tenue">{titulo}</h3>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="cifra text-[34px]">{n}</p>
        {children}
      </div>
      {nota && <p className={"mt-3 text-[13px] " + (tono === "exito" ? "font-medium text-exito-texto" : "text-tenue")}>{nota}</p>}
    </section>
  );
}

// Línea sin ejes: solo la dirección, con el último punto marcado.
export function Tendencia({ serie }: { serie: number[] }) {
  const min = Math.min(...serie);
  const max = Math.max(...serie);
  const p = serie.map((v, i) => `${(i / (serie.length - 1)) * 76 + 2},${26 - ((v - min) / (max - min || 1)) * 22}`);
  const [x, y] = p.at(-1)!.split(",");
  return (
    <svg viewBox="0 0 80 30" className="h-[30px] w-[80px] shrink-0" aria-hidden>
      <polyline points={p.join(" ")} fill="none" stroke="var(--marca)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x} cy={y} r={2.75} fill="var(--marca)" stroke="var(--fondo)" strokeWidth={1.5} />
    </svg>
  );
}

const ESTADOS: Record<Estado, { texto: string; icono: LucideIcon; tono: string }> = {
  recuperada: { texto: "Compró", icono: Check, tono: "bg-exito-fondo text-exito-texto" },
  "en-caja": { texto: "En la caja", icono: Clock, tono: "bg-aviso-fondo text-aviso-texto" },
  "sin-compra": { texto: "No compró", icono: X, tono: "bg-error-fondo text-error-texto" },
  protegida: { texto: "Sin oferta", icono: ShieldCheck, tono: "bg-superficie text-texto-secundario" },
};

export function ChipEstado({ estado }: { estado: Estado }) {
  const e = ESTADOS[estado];
  const Icono = e.icono;
  return (
    <span className={"inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[12.5px] font-medium " + e.tono}>
      <Icono className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} />
      {e.texto}
    </span>
  );
}

export function Chip({ icono: Icono, children, tono = "bg-marca-fondo text-marca" }: { icono?: LucideIcon; children: ReactNode; tono?: string }) {
  return (
    <span className={"inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[12.5px] font-medium " + tono}>
      {Icono && <Icono className="h-3.5 w-3.5 shrink-0" strokeWidth={2.2} />}
      {children}
    </span>
  );
}

export function Barra({ partes, alto = 8 }: { partes: { n: number; color: string }[]; alto?: number }) {
  return (
    <div className="flex gap-[3px] overflow-hidden rounded-full" style={{ height: alto }}>
      {partes.map((p, i) => (p.n > 0 ? <span key={i} style={{ flex: p.n, background: p.color }} /> : null))}
    </div>
  );
}

export function Encabezado({ titulo, derecha }: { titulo: string; derecha?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="titulo text-[34px]">{titulo}</h1>
      {derecha}
    </div>
  );
}
