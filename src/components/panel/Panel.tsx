"use client";

// Panel de primera compra: rescate en la caja (fricción) y primera compra cotidiana (intención).
import { useState } from "react";
import Link from "next/link";
import { VISTAS, type Vista } from "@/lib/vistas";
import { Cotidiana } from "./Cotidiana";
import { Medicion } from "./Medicion";
import { Reglas } from "./Reglas";
import { Rescate } from "./Rescate";
import { Resumen } from "./Resumen";

const TITULOS: Record<Vista, string> = {
  resumen: "Primera compra",
  rescate: "Rescate en la caja",
  cotidiana: "Primera compra cotidiana",
  reglas: "Reglas",
  medicion: "Medición",
};

export function Panel({ inicial = "resumen" }: { inicial?: Vista }) {
  const [vista, setVista] = useState<Vista>(inicial);

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
            {VISTAS.map(([k, nombre]) => (
              <button
                key={k}
                type="button"
                aria-current={vista === k ? "page" : undefined}
                onClick={() => ir(k)}
                className={"relative flex shrink-0 items-center px-3 text-[14px] outline-none transition-colors " + (vista === k ? "font-medium text-marca" : "text-tenue hover:text-texto focus-visible:text-texto")}
              >
                {nombre}
                {vista === k && <span className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-marca" />}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-8 sm:px-6">
        <h1 className="titulo mb-6 text-[34px] sm:text-[40px]">{TITULOS[vista]}</h1>
        {vista === "resumen" && <Resumen onIr={ir} />}
        {vista === "rescate" && <Rescate />}
        {vista === "cotidiana" && <Cotidiana />}
        {vista === "reglas" && <Reglas />}
        {vista === "medicion" && <Medicion />}
        <p className="mt-12 text-center text-[12.5px] text-tenue">Prototipo independiente de Andrés Olaya con datos simulados.</p>
      </main>
    </div>
  );
}
