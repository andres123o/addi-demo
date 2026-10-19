"use client";

import * as D from "@/lib/datos";
import { miles, millones, pct } from "@/lib/formato";
import { Tarjeta } from "./piezas";

const GRUPOS = [
  {
    nombre: "Rescate en la caja",
    oferta: D.RESCATE_OFERTA,
    tasa: D.RESCATE_COMPRAN / D.RESCATE_OFERTA,
    control: D.RESCATE_CONTROL,
    tasaControl: D.RESCATE_CONTROL_COMPRAN / D.RESCATE_CONTROL,
    incremental: D.RESCATE_INCREMENTAL,
    gmv: D.GMV_RESCATE,
  },
  {
    nombre: "Primera compra cotidiana",
    oferta: D.COTIDIANA_ENVIADOS,
    tasa: D.COTIDIANA_COMPRAN / D.COTIDIANA_ENVIADOS,
    control: D.COTIDIANA_CONTROL,
    tasaControl: D.COTIDIANA_CONTROL_COMPRAN / D.COTIDIANA_CONTROL,
    incremental: D.COTIDIANA_INCREMENTAL,
    gmv: D.GMV_COTIDIANA,
  },
];

export function Medicion() {
  const maxSemana = Math.max(...D.SEMANAS.map((s) => s.rescate + s.cotidiana));
  return (
    <div className="flex flex-col gap-5">
      <Tarjeta titulo="Con oferta frente a control" derecha={<span className="text-[13px] text-tenue">Cohorte de 30 días · 20 % en control</span>}>
        <div className="-mx-5 overflow-x-auto sm:-mx-6">
          <table className="w-full min-w-[720px] text-left text-[14px]">
            <thead>
              <tr className="text-[12.5px] text-tenue">
                <th className="px-5 pb-3 font-normal sm:px-6">Palanca</th>
                <th className="pb-3 text-right font-normal">Con oferta</th>
                <th className="pb-3 text-right font-normal">Compran</th>
                <th className="pb-3 text-right font-normal">Control</th>
                <th className="pb-3 text-right font-normal">Compran</th>
                <th className="pb-3 text-right font-normal">Incrementales</th>
                <th className="px-5 pb-3 text-right font-normal sm:px-6">GMV incremental</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[13px]">
              {GRUPOS.map((g) => (
                <tr key={g.nombre} className="border-t border-linea">
                  <td className="px-5 py-3 font-sans text-[14px] font-medium sm:px-6">{g.nombre}</td>
                  <td className="py-3 text-right">{miles(g.oferta)}</td>
                  <td className="py-3 text-right">{pct(g.tasa)}</td>
                  <td className="py-3 text-right">{miles(g.control)}</td>
                  <td className="py-3 text-right text-tenue">{pct(g.tasaControl)}</td>
                  <td className="py-3 text-right text-exito-texto">+{miles(g.incremental)}</td>
                  <td className="px-5 py-3 text-right sm:px-6">{millones(g.gmv)}</td>
                </tr>
              ))}
              <tr className="border-t border-borde font-sans text-[14px] font-medium">
                <td className="px-5 py-3 sm:px-6">Total</td>
                <td colSpan={4} />
                <td className="py-3 text-right text-exito-texto">+{miles(D.INCREMENTALES)}</td>
                <td className="px-5 py-3 text-right sm:px-6">{millones(D.GMV_INCREMENTAL)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Tarjeta>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Tarjeta titulo="Primeras compras incrementales por semana">
          <ul className="flex flex-col gap-3">
            {D.SEMANAS.map((s) => (
              <li key={s.nombre} className="grid grid-cols-[80px_minmax(0,1fr)_52px] items-center gap-3 text-[14px]">
                <span className="text-tenue">{s.nombre}</span>
                <span className="flex h-3 gap-[3px] overflow-hidden rounded-full" style={{ width: `${((s.rescate + s.cotidiana) / maxSemana) * 100}%` }}>
                  <span style={{ flex: s.rescate, background: "var(--marca)" }} />
                  <span style={{ flex: s.cotidiana, background: "var(--aviso)" }} />
                </span>
                <span className="text-right font-mono text-[13px]">{miles(s.rescate + s.cotidiana)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-4 text-[12.5px] text-tenue">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-marca" /> Rescate
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-aviso" /> Cotidiana
            </span>
          </div>
        </Tarjeta>

        <Tarjeta titulo="Costo por primera compra incremental">
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-4">
              <span className="cifra text-[44px] text-exito-texto">$0</span>
              <span className="text-right text-[13px] text-tenue">en descuentos</span>
            </div>
            <p className="text-[14px] text-texto-secundario">
              Las dos palancas cambian la oferta o el momento, no el precio. El presupuesto de incentivos queda para quien de verdad lo necesita.
            </p>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}
