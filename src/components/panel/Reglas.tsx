"use client";

import { ArrowRight, LifeBuoy, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";
import { Tarjeta } from "./piezas";

type Regla = { si: string; entonces: string; nota?: string };

const RESCATE: Regla[] = [
  { si: "Falta hasta 40 % del monto y tiene Nequi o PSE", entonces: "Pago inicial", nota: "Paga la diferencia ya, el resto a cuotas" },
  { si: "Falta más de 40 % del monto", entonces: "Otro producto", nota: "Opciones del mismo comercio que sí alcanzan" },
  { si: "Falta un dato de identidad", entonces: "Validar y reintentar", nota: "En la misma sesión, sin salir de la caja" },
  { si: "Señal de fraude o mora", entonces: "Sin oferta", nota: "Fecha clara para volver a intentar" },
];

const COTIDIANA: Regla[] = [
  { si: "Aprobado hace 5 días o más y sin intento de compra", entonces: "Entra al segmento" },
  { si: "Hay comercio con QR o aliado en su barrio", entonces: "Mensaje de dónde usarlo", nota: "Sin descuento, a la hora en que suele comprar" },
  { si: "Sin respuesta en 7 días", entonces: "Pasa al journey de incentivos", nota: "El que ya existe en Braze" },
];

const MEDICION: Regla[] = [
  { si: "20 % de cada grupo queda en control", entonces: "Compras incrementales", nota: "Tasa con oferta menos tasa del control" },
  { si: "Lectura semanal", entonces: "Decisión mensual", nota: "Escalar, ajustar o apagar cada oferta" },
];

export function Reglas() {
  return (
    <div className="grid gap-5">
      <Bloque titulo="Rescate en la caja" icono={LifeBuoy} reglas={RESCATE} />
      <div className="grid gap-5 lg:grid-cols-2">
        <Bloque titulo="Primera compra cotidiana" icono={MapPin} reglas={COTIDIANA} />
        <Bloque titulo="Medición" icono={ShieldCheck} reglas={MEDICION} />
      </div>
    </div>
  );
}

function Bloque({ titulo, icono: Icono, reglas }: { titulo: string; icono: LucideIcon; reglas: Regla[] }) {
  return (
    <Tarjeta
      titulo={
        <span className="flex items-center gap-2">
          <Icono className="h-4 w-4 text-marca" />
          {titulo}
        </span>
      }
    >
      <ul className="flex flex-col gap-2.5">
        {reglas.map((r) => (
          <li key={r.si} className="grid items-center gap-3 rounded-[14px] bg-lienzo p-4 sm:grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)]">
            <span className="text-[14px]">{r.si}</span>
            <ArrowRight className="hidden h-4 w-4 text-tenue sm:block" />
            <span>
              <span className="block text-[14px] font-medium">{r.entonces}</span>
              {r.nota && <span className="block text-[12.5px] text-tenue">{r.nota}</span>}
            </span>
          </li>
        ))}
      </ul>
    </Tarjeta>
  );
}
