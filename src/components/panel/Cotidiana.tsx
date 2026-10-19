"use client";

import { useState } from "react";
import { Bell, MessageCircle, QrCode, Store } from "lucide-react";
import * as D from "@/lib/datos";
import { miles, pct, pesos } from "@/lib/formato";
import { Chip, Cifra, Tarjeta } from "./piezas";
import { TelefonoWhatsApp } from "./Telefono";

export function Cotidiana() {
  const [elegido, setElegido] = useState(D.ENVIOS[0].id);
  const e = D.ENVIOS.find((x) => x.id === elegido)!;
  const maxLugar = Math.max(...D.LUGARES.map((l) => l.n));
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Cifra titulo="Con cupo y sin intento" n={miles(D.SIN_INTENTO)} nota="Aprobados hace 5 días o más" />
        <Cifra titulo="Con comercio cerca" n={miles(D.CON_COMERCIO_CERCA)} nota={`${miles(D.COTIDIANA_CONTROL)} en grupo de control`} />
        <Cifra titulo="Hacen su primera compra" n={pct(D.COTIDIANA_COMPRAN / D.COTIDIANA_ENVIADOS)} nota={`Control: ${pct(D.COTIDIANA_CONTROL_COMPRAN / D.COTIDIANA_CONTROL)}`} />
        <Cifra titulo="Compras incrementales" n={`+${miles(D.COTIDIANA_INCREMENTAL)}`} nota="Un mensaje útil, sin descuento" tono="exito" />
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-5">
          <Tarjeta titulo="Próximos envíos" derecha={<span className="text-[13px] text-tenue">Toca uno para ver el mensaje</span>}>
            <ul className="-mx-5 sm:-mx-6">
              {D.ENVIOS.map((x) => (
                <li key={x.id} className="border-t border-linea first:border-t-0">
                  <button
                    type="button"
                    onClick={() => setElegido(x.id)}
                    className={"flex w-full flex-wrap items-center justify-between gap-3 px-5 py-3 text-left outline-none transition-colors hover:bg-marca-fondo focus-visible:bg-marca-fondo sm:px-6 " + (x.id === elegido ? "bg-marca-fondo" : "")}
                  >
                    <span className="min-w-0">
                      <span className="block text-[14px] font-medium">{x.nombre}</span>
                      <span className="block text-[12.5px] text-tenue">
                        Cupo {pesos(x.cupo)} · {x.dias} días sin usar
                      </span>
                    </span>
                    <span className="flex min-w-0 flex-wrap items-center gap-2">
                      {x.comercio ? (
                        <>
                          <Chip icono={x.tipo === "QR" ? QrCode : Store}>{x.comercio}</Chip>
                          <Chip icono={x.canal === "WhatsApp" ? MessageCircle : Bell} tono="bg-superficie text-texto-secundario">
                            {x.cuando}
                          </Chip>
                        </>
                      ) : (
                        <Chip tono="bg-superficie text-texto-secundario">Journey de incentivos actual</Chip>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Tarjeta>

          <Tarjeta titulo="Dónde hacen su primera compra" derecha={<span className="text-[13px] text-tenue">{miles(D.COTIDIANA_COMPRAN)} compras</span>}>
            <ul className="flex flex-col gap-3">
              {D.LUGARES.map((l) => (
                <li key={l.nombre} className="grid grid-cols-[130px_minmax(0,1fr)_56px] items-center gap-3 text-[14px]">
                  <span>{l.nombre}</span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-superficie">
                    <span className="block h-full rounded-full bg-marca" style={{ width: `${(l.n / maxLugar) * 100}%` }} />
                  </span>
                  <span className="text-right font-mono text-[13px]">{miles(l.n)}</span>
                </li>
              ))}
            </ul>
          </Tarjeta>
        </div>

        <div className="lg:sticky lg:top-24">
          <TelefonoWhatsApp e={e} />
        </div>
      </div>
    </div>
  );
}
