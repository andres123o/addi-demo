"use client";

import { useState } from "react";
import * as D from "@/lib/datos";
import { haceCuanto, miles, pct, pesos } from "@/lib/formato";
import { Barra, ChipEstado, Cifra, Tarjeta } from "./piezas";
import { TelefonoCaja } from "./Telefono";

const NOMBRE_OFERTA: Record<D.Rechazo["oferta"], string> = {
  pago: "Pago inicial",
  producto: "Otro producto",
  validar: "Validar y reintentar",
  ninguna: "Sin oferta",
};

const COLOR_OFERTA = ["var(--marca)", "var(--marca-media)", "var(--lila)"];

export function Rescate() {
  const [elegido, setElegido] = useState(D.RECHAZOS[0].id);
  const r = D.RECHAZOS.find((x) => x.id === elegido)!;
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Cifra titulo="Rechazados al pagar" n={miles(D.RECHAZADOS)} nota="Su compra no se aprobó completa" />
        <Cifra titulo="Vieron una opción de rescate" n={miles(D.RESCATE_OFERTA)} nota="Los demás: riesgo de fraude o grupo de control" />
        <Cifra titulo="Compran en 7 días" n={pct(D.RESCATE_COMPRAN / D.RESCATE_OFERTA)} nota={`Control: ${pct(D.RESCATE_CONTROL_COMPRAN / D.RESCATE_CONTROL)}`} />
        <Cifra titulo="Compras incrementales" n={`+${miles(D.RESCATE_INCREMENTAL)}`} nota="Sin usar presupuesto de descuentos" tono="exito" />
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-5">
          <Tarjeta titulo="Rechazos de la última hora" derecha={<span className="text-[13px] text-tenue">Toca uno para ver su pantalla</span>}>
            <div className="-mx-5 overflow-x-auto sm:-mx-6">
              <table className="w-full min-w-[680px] text-left text-[14px]">
                <thead>
                  <tr className="text-[12.5px] text-tenue">
                    <th className="px-5 pb-3 font-normal sm:px-6">Persona</th>
                    <th className="pb-3 font-normal">Dónde</th>
                    <th className="pb-3 font-normal">Intentó</th>
                    <th className="pb-3 font-normal">Oferta</th>
                    <th className="px-5 pb-3 font-normal sm:px-6">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {D.RECHAZOS.map((x) => (
                    <tr
                      key={x.id}
                      tabIndex={0}
                      onClick={() => setElegido(x.id)}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setElegido(x.id))}
                      className={"cursor-pointer border-t border-linea align-top outline-none transition-colors hover:bg-marca-fondo focus-visible:bg-marca-fondo " + (x.id === elegido ? "bg-marca-fondo" : "")}
                    >
                      <td className="px-5 py-3 sm:px-6">
                        <span className="block font-medium">{x.nombre}</span>
                        <span className="block text-[12.5px] text-tenue">{haceCuanto(x.minutos)}</span>
                      </td>
                      <td className="py-3">
                        <span className="block">{x.donde}</span>
                        <span className="block text-[12.5px] text-tenue">{x.canal}</span>
                      </td>
                      <td className="py-3">
                        <span className="block font-mono text-[13px]">{pesos(x.intento)}</span>
                        <span className="block text-[12.5px] text-tenue">{x.alcanza ? `Alcanza ${pesos(x.alcanza)}` : x.oferta === "validar" ? "Falta un dato" : "Señal de riesgo"}</span>
                      </td>
                      <td className="py-3">
                        <span className="block">{NOMBRE_OFERTA[x.oferta]}</span>
                        <span className="block text-[12.5px] text-tenue">{x.detalle}</span>
                      </td>
                      <td className="px-5 py-3 sm:px-6">
                        <ChipEstado estado={x.estado} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tarjeta>

          <Tarjeta titulo="Qué oferta funciona" derecha={<span className="text-[13px] text-tenue">{miles(D.RESCATE_COMPRAN)} compras con oferta</span>}>
            <Barra partes={D.OFERTAS.map((o, i) => ({ n: o.compras, color: COLOR_OFERTA[i] }))} alto={10} />
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {D.OFERTAS.map((o, i) => (
                <li key={o.id} className="flex flex-col gap-1">
                  <span className="flex items-center gap-2 text-[14px] font-medium">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLOR_OFERTA[i] }} />
                    {o.nombre}
                  </span>
                  <span className="cifra text-[26px]">{pct(o.compras / o.mostradas)}</span>
                  <span className="text-[12.5px] text-tenue">
                    {miles(o.compras)} de {miles(o.mostradas)} compran
                  </span>
                </li>
              ))}
            </ul>
          </Tarjeta>
        </div>

        <div className="lg:sticky lg:top-24">
          <TelefonoCaja r={r} />
        </div>
      </div>
    </div>
  );
}
