"use client";

// Panel de primera compra: rescate en la caja (fricción), compra cotidiana (intención),
// el recorrido de los primeros 30 días hasta la segunda compra y la lectura de experimentos.
import { useState } from "react";
import Link from "next/link";
import { GRUPOS, grupoDe, type Vista } from "@/lib/vistas";
import { Cotidiana } from "./Cotidiana";
import { Experimentos } from "./Experimentos";
import { Recorrido } from "./Recorrido";
import { Reglas } from "./Reglas";
import { Rescate } from "./Rescate";
import { Resumen } from "./Resumen";

const TITULOS: Record<Vista, string> = {
  resumen: "Primera compra",
  rescate: "Rescate en la caja",
  cotidiana: "Compra cotidiana",
  reglas: "Reglas",
  recorrido: "Primeros 30 días",
  experimentos: "Resultados",
};

export function Panel({ inicial = "resumen" }: { inicial?: Vista }) {
  const [vista, setVista] = useState<Vista>(inicial);
  const grupo = grupoDe(vista);

  function ir(v: Vista) {
    setVista(v);
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="min-h-dvh w-full bg-lienzo text-texto">
      <header className="sticky top-0 z-30 border-b border-linea bg-fondo/90 backdrop-blur-md">
        <div className="flex h-16 w-full items-center justify-between gap-6 pl-4 pr-3 sm:pl-8 sm:pr-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-control outline-none focus-visible:shadow-[var(--anillo-foco)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/addi/addi.svg" alt="Addi" width={84} height={33} className="h-[26px] w-auto" />
          </Link>
          <nav aria-label="Vistas" className="-mb-px flex h-full min-w-0 items-stretch gap-1 overflow-x-auto [scrollbar-width:none]">
            <Link href="/" className="relative flex shrink-0 items-center px-3 text-[14px] text-tenue outline-none transition-colors hover:text-texto focus-visible:text-texto">
              Inicio
            </Link>
            {GRUPOS.map((g) => {
              const activo = grupo === g;
              return (
                <button
                  key={g.nombre}
                  type="button"
                  aria-current={activo ? "page" : undefined}
                  onClick={() => ir(g.vistas[0][0])}
                  className={"relative flex shrink-0 items-center px-3 text-[14px] outline-none transition-colors " + (activo ? "font-medium text-marca" : "text-tenue hover:text-texto focus-visible:text-texto")}
                >
                  {g.nombre}
                  {activo && <span className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-marca" />}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="titulo text-[34px] sm:text-[40px]">{TITULOS[vista]}</h1>
          {grupo.vistas.length > 1 && (
            <div role="tablist" className="flex gap-1 overflow-x-auto rounded-full bg-superficie p-1 [scrollbar-width:none]">
              {grupo.vistas.map(([k, nombre]) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={vista === k}
                  onClick={() => ir(k)}
                  className={
                    "shrink-0 rounded-full px-4 py-1.5 text-[14px] outline-none transition-[background-color,color,transform] duration-150 ease-out focus-visible:shadow-[var(--anillo-foco)] active:scale-[0.97] " +
                    (vista === k ? "bg-fondo font-medium text-texto shadow-xs" : "text-tenue hover:text-texto")
                  }
                >
                  {nombre}
                </button>
              ))}
            </div>
          )}
        </div>
        {vista === "resumen" && <Resumen onIr={ir} />}
        {vista === "rescate" && <Rescate />}
        {vista === "cotidiana" && <Cotidiana />}
        {vista === "reglas" && <Reglas />}
        {vista === "recorrido" && <Recorrido />}
        {vista === "experimentos" && <Experimentos />}
      </main>
    </div>
  );
}
