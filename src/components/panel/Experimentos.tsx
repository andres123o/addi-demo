"use client";

// Un experimento por semana con grupo de control y una lectura al mes: qué escalar, ajustar o parar.
import { Check, Pause, SlidersHorizontal, type LucideIcon } from "lucide-react";
import { EXPERIMENTOS, leer, type Decision } from "@/lib/experimentos";
import { miles, millones, pct, pesos } from "@/lib/formato";
import { Cifra, Tarjeta } from "./piezas";

const DECISIONES: Record<Decision, { icono: LucideIcon; tono: string }> = {
  Escalar: { icono: Check, tono: "bg-exito-fondo text-exito-texto" },
  Ajustar: { icono: SlidersHorizontal, tono: "bg-aviso-fondo text-aviso-texto" },
  Parar: { icono: Pause, tono: "bg-error-fondo text-error-texto" },
};

const LECTURAS = EXPERIMENTOS.map((e) => ({ e, l: leer(e) }));
const cuenta = (d: Decision) => LECTURAS.filter((x) => x.l.decision === d).length;
const LIBERADO = LECTURAS.filter((x) => x.l.decision === "Parar").reduce((s, x) => s + x.l.costo, 0);

export function Experimentos() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <Cifra titulo="Para escalar" n={String(cuenta("Escalar"))} nota="Diferencia real" tono="exito" />
        <Cifra titulo="Para ajustar o parar" n={String(cuenta("Ajustar") + cuenta("Parar"))} nota="Ruido o muy costosos" />
        <Cifra titulo="Presupuesto liberado" n={millones(LIBERADO)} nota="En descuentos que no movían compras" tono="exito" />
      </div>

      <Tarjeta titulo="Lectura del mes" derecha={<span className="text-[13px] text-tenue">Un experimento por semana, cada uno con grupo de control</span>}>
        <div className="-mx-5 overflow-x-auto sm:-mx-6">
          <table className="w-full min-w-[760px] text-left text-[14px]">
            <thead>
              <tr className="text-[12.5px] text-tenue">
                <th className="px-5 pb-3 font-normal sm:px-6">Experimento</th>
                <th className="px-3 pb-3 text-right font-normal">Con mensaje</th>
                <th className="px-3 pb-3 text-right font-normal">Control</th>
                <th className="px-3 pb-3 text-right font-normal">Compras extra</th>
                <th className="pb-3 pl-6 font-normal">Costo por compra extra</th>
                <th className="px-5 pb-3 font-normal sm:px-6">Decisión</th>
              </tr>
            </thead>
            <tbody>
              {LECTURAS.map(({ e, l }) => {
                const d = DECISIONES[l.decision];
                const Icono = d.icono;
                return (
                  <tr key={e.nombre} className="border-t border-linea align-top">
                    <td className="px-5 py-3.5 sm:px-6">
                      <p className="font-medium">{e.nombre}</p>
                      <p className="mt-0.5 text-[12.5px] text-tenue">
                        Semana {e.semana} · {e.metrica}
                      </p>
                    </td>
                    <td className="px-3 py-3.5 text-right font-mono text-[13px]">{pct(l.tv)}</td>
                    <td className="px-3 py-3.5 text-right font-mono text-[13px] text-tenue">{pct(l.tc)}</td>
                    <td className={"px-3 py-3.5 text-right font-mono text-[13px] " + (l.real ? "text-exito-texto" : "font-sans text-tenue")}>
                      {l.real ? `+${miles(l.incrementales)}` : "Puede ser ruido"}
                    </td>
                    <td className={"py-3.5 pl-6 text-[13px] " + (e.incentivo > 0 && !l.real ? "text-tenue" : "font-mono")}>{e.incentivo === 0 ? "$0" : l.real ? pesos(Math.round(l.porIncremental / 1000) * 1000) : "Sin compras extra"}</td>
                    <td className="px-5 py-3.5 sm:px-6">
                      <span className={"inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[12.5px] font-medium " + d.tono}>
                        <Icono className="h-3.5 w-3.5" strokeWidth={2.4} />
                        {l.decision}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Tarjeta>
    </div>
  );
}
