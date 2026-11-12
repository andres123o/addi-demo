"use client";

// Primeros 30 días como se ve en un CRM: dos flujos automáticos, cada mensaje con su disparador,
// y quien compra sale por la derecha. Al tocar un mensaje se ve cómo le llega a la persona.
import { useState } from "react";
import { Bell, Check, Clock, Flag, Mail, MessageCircle, Smartphone, UserPlus, type LucideIcon } from "lucide-react";
import { miles, pct } from "@/lib/formato";
import { FLUJOS, type Canal, type Flujo, type Paso } from "@/lib/recorrido";

const CANALES: Record<Canal, { icono: LucideIcon; tono: string }> = {
  "In-app": { icono: Smartphone, tono: "bg-marca-fondo text-marca" },
  WhatsApp: { icono: MessageCircle, tono: "bg-exito-fondo text-exito-texto" },
  Push: { icono: Bell, tono: "bg-aviso-fondo text-aviso-texto" },
  Correo: { icono: Mail, tono: "bg-lila/40 text-[#4b3fb0]" },
};

// Ancho de la columna central del flujo.
const EJE = "w-[300px] shrink-0";

export function Recorrido() {
  const [flujoId, setFlujoId] = useState<Flujo["id"]>("primera");
  const [sel, setSel] = useState(0);
  const flujo = FLUJOS.find((f) => f.id === flujoId)!;
  const paso = flujo.pasos[sel];

  function elegir(id: Flujo["id"]) {
    setFlujoId(id);
    setSel(0);
  }

  return (
    <section className="overflow-hidden rounded-tarjeta border border-linea bg-fondo shadow-xs">
      {/* Barra del CRM: flujos y su estado */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-linea px-5 py-4 sm:px-6">
        <div role="tablist" className="flex gap-1 overflow-x-auto rounded-full bg-superficie p-1 [scrollbar-width:none]">
          {FLUJOS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={f.id === flujoId}
              onClick={() => elegir(f.id)}
              className={
                "shrink-0 rounded-full px-4 py-1.5 text-[14px] outline-none transition-[background-color,color,transform] duration-150 ease-out focus-visible:shadow-[var(--anillo-foco)] active:scale-[0.97] " +
                (f.id === flujoId ? "bg-fondo font-medium text-texto shadow-xs" : "text-tenue hover:text-texto")
              }
            >
              {f.nombre}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
          <span className="flex items-center gap-2 font-medium text-exito-texto">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-exito opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-exito" />
            </span>
            Activo
          </span>
          <Dato titulo="Entran" valor={miles(flujo.entran)} />
          <Dato titulo={flujo.meta} valor={pct(flujo.con, 0)} nota={`hoy ${pct(flujo.hoy, 0)}`} />
          <Dato titulo="Control" valor="10 %" />
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Lienzo del flujo */}
        <div className="overflow-x-auto bg-lienzo bg-[radial-gradient(rgb(20_20_21/0.09)_1px,transparent_1px)] bg-[size:18px_18px] px-5 py-8 sm:px-10">
          <ol className="mx-auto flex w-fit min-w-[540px] flex-col">
            <li className={EJE}>
              <div className="flex items-center gap-3 rounded-[14px] bg-marca p-4 text-white shadow-xs">
                <UserPlus className="h-5 w-5 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-[12.5px] text-white/75">Entrada</span>
                  <span className="block text-[15px] font-medium">{flujo.entrada}</span>
                </span>
                <span className="ml-auto font-mono text-[13px]">{miles(flujo.entran)}</span>
              </div>
            </li>
            {flujo.pasos.map((p, i) => (
              <Etapa key={flujo.id + i} p={p} activo={i === sel} onClick={() => setSel(i)} meta={flujo.meta} />
            ))}
            <Linea />
            <li className={EJE + " flex justify-center"}>
              <span className="inline-flex items-center gap-2 rounded-full bg-fondo px-4 py-2 text-[13px] text-tenue shadow-xs ring-1 ring-linea">
                <Flag className="h-3.5 w-3.5" /> Sale del flujo a los 30 días
              </span>
            </li>
          </ol>
        </div>

        {/* Vista previa del mensaje elegido */}
        <aside className="border-t border-linea p-5 sm:p-6 lg:border-l lg:border-t-0">
          <p className="text-[13px] text-tenue">Vista previa</p>
          <Previa p={paso} />
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-linea pt-5">
            <div>
              <dt className="text-[12.5px] text-tenue">Lo reciben</dt>
              <dd className="cifra mt-1 text-[24px]">{miles(paso.reciben)}</dd>
            </div>
            <div>
              <dt className="text-[12.5px] text-tenue">Compran en 72 h</dt>
              <dd className="cifra mt-1 text-[24px] text-exito-texto">{pct(paso.compran / paso.reciben)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

function Dato({ titulo, valor, nota }: { titulo: string; valor: string; nota?: string }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="text-tenue">{titulo}</span>
      <span className="font-mono font-medium">{valor}</span>
      {nota && <span className="text-tenue">({nota})</span>}
    </span>
  );
}

function Linea() {
  return (
    <li aria-hidden className={EJE + " flex justify-center"}>
      <span className="h-6 w-px bg-borde" />
    </li>
  );
}

// Un paso del flujo: disparador, mensaje y la salida de quienes compran.
function Etapa({ p, activo, onClick, meta }: { p: Paso; activo: boolean; onClick: () => void; meta: string }) {
  const c = CANALES[p.canal];
  const Icono = c.icono;
  return (
    <>
      <Linea />
      <li className={EJE + " flex justify-center"}>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-fondo px-3 py-1 text-[12.5px] text-texto-secundario shadow-xs ring-1 ring-linea">
          <Clock className="h-3.5 w-3.5 text-tenue" /> {p.espera}
        </span>
      </li>
      <Linea />
      <li className="flex items-center">
        <button
          type="button"
          onClick={onClick}
          aria-pressed={activo}
          className={
            EJE +
            " flex items-center gap-3 rounded-[14px] bg-fondo p-3.5 text-left shadow-xs outline-none ring-1 transition-[box-shadow,transform] duration-150 ease-out focus-visible:shadow-[var(--anillo-foco)] active:scale-[0.98] " +
            (activo ? "ring-2 ring-marca" : "ring-linea hover:ring-borde")
          }
        >
          <span className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] " + c.tono}>
            <Icono className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] text-tenue">{p.canal}</span>
            <span className="block truncate text-[14.5px] font-medium">{p.titulo}</span>
          </span>
          <span className="font-mono text-[12.5px] text-tenue">{miles(p.reciben)}</span>
        </button>
        {/* Quien compra sale por la derecha */}
        <span aria-hidden className="h-px w-8 shrink-0 bg-exito" />
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-exito-fondo px-3 py-1.5 text-[12.5px] font-medium text-exito-texto">
          <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
          {meta}: {miles(p.compran)}
        </span>
      </li>
    </>
  );
}

// Cómo le llega el mensaje a la persona, según el canal.
function Previa({ p }: { p: Paso }) {
  if (p.canal === "WhatsApp") {
    return (
      <div className="mt-3 rounded-[18px] bg-[#efe7dd] p-3">
        <div className="max-w-[92%] rounded-[12px] rounded-tl-[4px] bg-white p-3 text-[14px] leading-snug shadow-xs">
          {p.mensaje}
          <span className="mt-1 block text-right text-[10.5px] text-tenue">6:02 pm</span>
        </div>
      </div>
    );
  }
  if (p.canal === "Push") {
    return (
      <div className="mt-3 rounded-[18px] bg-texto p-3">
        <div className="flex gap-3 rounded-[14px] bg-white/95 p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/addi/logo.svg" alt="" width={28} height={28} className="h-7 w-7 shrink-0 rounded-[7px]" />
          <span className="min-w-0 text-[13.5px] leading-snug">
            <span className="block font-medium">{p.titulo}</span>
            <span className="block text-texto-secundario">{p.mensaje}</span>
          </span>
        </div>
      </div>
    );
  }
  if (p.canal === "Correo") {
    return (
      <div className="mt-3 overflow-hidden rounded-[18px] ring-1 ring-linea">
        <div className="border-b border-linea bg-superficie px-4 py-2.5 text-[12.5px] text-tenue">Addi · {p.titulo}</div>
        <p className="p-4 text-[14px] leading-snug">{p.mensaje}</p>
      </div>
    );
  }
  return (
    <div className="mt-3 rounded-[18px] bg-marca-fondo p-4">
      <p className="titulo text-[20px]">{p.titulo}</p>
      <p className="mt-2 text-[14px] leading-snug text-texto-secundario">{p.mensaje}</p>
    </div>
  );
}
