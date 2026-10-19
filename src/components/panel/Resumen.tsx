"use client";

import type { ReactNode } from "react";
import { ChevronRight, LifeBuoy, MapPin, type LucideIcon } from "lucide-react";
import * as D from "@/lib/datos";
import { miles, millones, pct } from "@/lib/formato";
import { Cifra, Tendencia } from "./piezas";
import type { Vista } from "@/lib/vistas";

// Porcentaje sobre los aprobados: sin decimales si es redondo (61 %), con uno si no (83,6 %).
const p = (n: number) => pct(n / D.APROBADOS, n % 1000 === 0 ? 0 : 1);

export function Resumen({ onIr }: { onIr: (v: Vista) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Cifra titulo="Aprobados" n={miles(D.APROBADOS)} nota="Últimos 30 días" />
        <Cifra titulo="Tasa de activación" n={pct(D.ACTIVACION, 0)} nota={`+${Math.round((D.ACTIVACION - D.ACTIVACION_BASE) * 100)} pts incrementales`} tono="exito">
          <Tendencia serie={D.TENDENCIA_ACTIVACION} />
        </Cifra>
        <Cifra titulo="Primeras compras incrementales" n={`+${miles(D.INCREMENTALES)}`} nota="Medidas contra grupo de control" />
        <Cifra titulo="GMV incremental" n={millones(D.GMV_INCREMENTAL)} nota={`≈ US$${Math.round(D.GMV_INCREMENTAL / D.PESOS_POR_DOLAR / 1000)}K · sin descuentos`} />
      </div>

      {/* Bento: el embudo grande a la izquierda; las dos fugas y su palanca a la derecha */}
      <div className="grid gap-4 lg:grid-cols-12">
        <section className="flex flex-col gap-6 rounded-tarjeta border border-linea bg-fondo p-5 shadow-xs sm:p-7 lg:col-span-7">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="titulo text-[26px]">Del cupo aprobado a la primera compra</h2>
            <span className="text-[13px] text-tenue">Cohorte de 30 días</span>
          </div>
          <Escalera />
        </section>

        <div className="grid gap-4 lg:col-span-5">
          <Fuga
            icono={MapPin}
            tono="bg-aviso-fondo text-aviso-texto"
            fondo="bg-[#fffaf0]"
            tipo="Intención"
            valor={p(D.SIN_INTENTO)}
            texto="tiene cupo y nunca intenta comprar"
            palanca="Primera compra cotidiana"
            suma={p(D.COTIDIANA_INCREMENTAL)}
            onClick={() => onIr("cotidiana")}
          />
          <Fuga
            icono={LifeBuoy}
            tono="bg-error-fondo text-error-texto"
            fondo="bg-[#fff7f8]"
            tipo="Fricción"
            valor={p(D.RECHAZADOS)}
            texto="intenta comprar y es rechazado al pagar"
            palanca="Rescate en la caja"
            suma={p(D.RESCATE_INCREMENTAL)}
            onClick={() => onIr("rescate")}
          />
        </div>
      </div>
    </div>
  );
}

// Cuatro columnas que bajan como escalera. Lo rayado es lo que se pierde en ese paso;
// la última columna muestra de dónde sale la primera compra con las dos palancas.
function Escalera() {
  const ALTO = 240;
  const alto = (n: number) => (n / D.APROBADOS) * ALTO;
  const rayas = (c: string) => `repeating-linear-gradient(135deg, ${c} 0 4px, transparent 4px 9px)`;
  const final = [
    { n: D.COTIDIANA_INCREMENTAL, color: "var(--aviso)", nombre: "Cotidiana" },
    { n: D.RESCATE_INCREMENTAL, color: "var(--marca-media)", nombre: "Rescate" },
    { n: D.PRIMERA_A_LA_PRIMERA, color: "var(--exito)", nombre: "A la primera" },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-4 items-end gap-3 sm:gap-5" style={{ height: ALTO + 52 }}>
        <Columna valor={p(D.APROBADOS)}>
          <span className="rounded-[12px] bg-marca-suave" style={{ height: alto(D.APROBADOS) }} />
        </Columna>
        <Columna valor={p(D.INTENTAN)}>
          <span className="rounded-t-[12px]" style={{ height: alto(D.SIN_INTENTO), background: rayas("var(--aviso)") }} />
          <span className="rounded-b-[12px] bg-marca-suave" style={{ height: alto(D.INTENTAN) }} />
        </Columna>
        <Columna valor={p(D.PRIMERA_A_LA_PRIMERA)}>
          <span className="rounded-t-[12px]" style={{ height: alto(D.RECHAZADOS), background: rayas("var(--error)") }} />
          <span className="rounded-b-[12px] bg-marca-suave" style={{ height: alto(D.PRIMERA_A_LA_PRIMERA) }} />
        </Columna>
        <Columna valor={p(D.PRIMERA_COMPRA)} fuerte>
          {final.map((x, i) => (
            <span key={x.nombre} className={i === 0 ? "rounded-t-[12px]" : i === final.length - 1 ? "rounded-b-[12px]" : ""} style={{ height: alto(x.n), background: x.color }} />
          ))}
        </Columna>
      </div>
      <div className="grid grid-cols-4 gap-3 border-t border-linea pt-3 text-[13px] sm:gap-5">
        <span className="font-medium">Aprobados</span>
        <span className="font-medium">Intentan comprar</span>
        <span className="font-medium">
          Aprobados al pagar <span className="block font-normal text-tenue">Activación actual</span>
        </span>
        <span className="font-medium text-exito-texto">
          Primera compra <span className="block font-normal text-tenue">Con las dos palancas</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-tenue">
        {[...final].reverse().map((x) => (
          <span key={x.nombre} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: x.color }} />
            {x.nombre} · {p(x.n)}
          </span>
        ))}
      </div>
    </div>
  );
}

function Columna({ valor, fuerte, children }: { valor: string; fuerte?: boolean; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col justify-end gap-[3px]">
      <span className={"cifra mb-2 text-[22px] sm:text-[28px] " + (fuerte ? "text-exito-texto" : "")}>{valor}</span>
      {children}
    </div>
  );
}

function Fuga(f: { icono: LucideIcon; tono: string; fondo: string; tipo: string; valor: string; texto: string; palanca: string; suma: string; onClick: () => void }) {
  const Icono = f.icono;
  return (
    <section className={"flex flex-col gap-5 rounded-tarjeta border border-linea p-5 shadow-xs sm:p-6 " + f.fondo}>
      <span className={"inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-medium " + f.tono}>
        <Icono className="h-3.5 w-3.5" />
        {f.tipo}
      </span>
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="cifra text-[44px]">{f.valor}</span>
        <span className="text-[15px] text-texto-secundario">{f.texto}</span>
      </p>
      <button
        type="button"
        onClick={f.onClick}
        className="group mt-auto flex items-center justify-between gap-3 rounded-[14px] bg-fondo p-4 text-left shadow-xs outline-none transition-all hover:-translate-y-0.5 focus-visible:shadow-[var(--anillo-foco)]"
      >
        <span>
          <span className="block text-[12.5px] text-tenue">Lo recupera</span>
          <span className="block text-[15px] font-medium">{f.palanca}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-right">
            <span className="cifra block text-[24px] text-exito-texto">+{f.suma}</span>
            <span className="block text-[11.5px] text-tenue">de activación</span>
          </span>
          <ChevronRight className="h-5 w-5 text-tenue transition-transform group-hover:translate-x-0.5" />
        </span>
      </button>
    </section>
  );
}
