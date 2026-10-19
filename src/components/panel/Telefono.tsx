"use client";

// Lo que ve la persona en su celular: la caja de Addi con la oferta de rescate, o el mensaje de WhatsApp.
import type { ReactNode } from "react";
import { CheckCheck, ChevronLeft, LockKeyhole } from "lucide-react";
import type { Envio, Rechazo } from "@/lib/datos";
import { pesos } from "@/lib/formato";

function Marco({ children, oscuro }: { children: ReactNode; oscuro?: boolean }) {
  return (
    <div className="mx-auto w-full max-w-[290px] rounded-[38px] border border-borde bg-texto p-2.5 shadow-md">
      <div className={"flex min-h-[500px] flex-col overflow-hidden rounded-[30px] " + (oscuro ? "bg-[#efe7dd]" : "bg-fondo")}>
        <div className="mx-auto mt-2 h-5 w-24 rounded-full bg-texto" />
        {children}
      </div>
    </div>
  );
}

function Opcion({ titulo, nota, activa }: { titulo: string; nota: string; activa?: boolean }) {
  return (
    <div className={"rounded-[14px] border p-3 " + (activa ? "border-marca bg-marca-fondo" : "border-borde")}>
      <p className="text-[14px] font-medium">{titulo}</p>
      <p className="text-[12.5px] text-tenue">{nota}</p>
    </div>
  );
}

export function TelefonoCaja({ r }: { r: Rechazo }) {
  const nombre = r.nombre.split(" ")[0];
  let cuerpo: ReactNode;
  if (r.oferta === "pago" && r.alcanza) {
    const diferencia = r.intento - r.alcanza;
    cuerpo = (
      <>
        <p className="titulo text-[22px]">Casi listo, {nombre}</p>
        <p className="text-[14px] text-texto-secundario">
          Hoy te aprobamos <b className="font-medium text-texto">{pesos(r.alcanza)}</b>. Completa el resto y llévatelo ya.
        </p>
        <Opcion activa titulo={`Paga ${pesos(diferencia)} ahora`} nota="Con Nequi o PSE" />
        <Opcion titulo={`${pesos(r.alcanza)} en 3 cuotas`} nota={`${pesos(Math.round(r.alcanza / 3))} al mes`} />
        <Boton>Terminar mi compra</Boton>
      </>
    );
  } else if (r.oferta === "producto" && r.alcanza) {
    cuerpo = (
      <>
        <p className="titulo text-[22px]">Esto sí te alcanza</p>
        <p className="text-[14px] text-texto-secundario">
          Tu cupo hoy es <b className="font-medium text-texto">{pesos(r.alcanza)}</b>.
        </p>
        <Opcion activa titulo={r.detalle} nota="Llegan mañana" />
        <Opcion titulo={`Guardar ${r.producto.toLowerCase()}`} nota="Te avisamos cuando te alcance" />
        <Boton>Ver opciones</Boton>
      </>
    );
  } else if (r.oferta === "validar") {
    cuerpo = (
      <>
        <p className="titulo text-[22px]">Te falta un paso</p>
        <p className="text-[14px] text-texto-secundario">Confirma tu correo y tu compra sigue lista en la caja.</p>
        <Opcion activa titulo="Confirmar correo" nota="Toma 1 minuto" />
        <Boton>Reintentar pago</Boton>
      </>
    );
  } else {
    cuerpo = (
      <>
        <p className="titulo text-[22px]">Hoy no podemos aprobarte</p>
        <p className="text-[14px] text-texto-secundario">
          Puedes intentarlo de nuevo en <b className="font-medium text-texto">30 días</b>. Ese día te escribimos.
        </p>
      </>
    );
  }
  return (
    <Marco>
      <div className="flex items-center gap-2 px-4 pb-3 pt-4">
        <ChevronLeft className="h-5 w-5 text-tenue" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/addi/logo.svg" alt="" width={22} height={22} className="h-[22px] w-[22px]" />
        <span className="text-[13px] text-tenue">
          {r.donde} · {r.canal}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-4 pb-5">
        <div className="rounded-[14px] bg-superficie p-3">
          <p className="text-[12.5px] text-tenue">{r.producto}</p>
          <p className="cifra mt-1 text-[26px]">{pesos(r.intento)}</p>
        </div>
        {cuerpo}
        <p className="mt-auto flex items-center justify-center gap-1 text-[11.5px] text-tenue">
          <LockKeyhole className="h-3 w-3" /> Pago seguro con Addi
        </p>
      </div>
    </Marco>
  );
}

function Boton({ children }: { children: ReactNode }) {
  return <div className="rounded-full bg-marca py-3 text-center text-[14px] font-medium text-white">{children}</div>;
}

export function TelefonoWhatsApp({ e }: { e: Envio }) {
  const nombre = e.nombre.split(" ")[0];
  return (
    <Marco oscuro>
      <div className="flex items-center gap-2 bg-[#075e54] px-4 py-3 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/addi/logo.svg" alt="" width={28} height={28} className="h-7 w-7 rounded-full" />
        <span className="text-[14px] font-medium">Addi</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <span className="mx-auto rounded-md bg-white/70 px-2 py-0.5 text-[11px] text-tenue">{e.cuando || "Sin envío"}</span>
        {e.comercio ? (
          <div className="max-w-[92%] rounded-[12px] rounded-tl-[4px] bg-white p-3 text-[13.5px] leading-snug shadow-xs">
            Hola, {nombre}. Tu cupo de <b className="font-medium">{pesos(e.cupo)}</b> ya sirve en <b className="font-medium">{e.comercio}</b>
            {e.tipo === "QR" ? ": paga con el QR del datáfono y divídelo en cuotas." : ". Divide tu compra en cuotas, sin tarjeta."}
            <span className="mt-1 flex items-center justify-end gap-1 text-[10.5px] text-tenue">
              6:02 pm <CheckCheck className="h-3.5 w-3.5 text-[#34b7f1]" />
            </span>
            <span className="mt-2 block border-t border-linea pt-2 text-center text-[13px] font-medium text-[#128c7e]">
              {e.tipo === "QR" ? "Cómo pagar con QR" : "Ver tiendas cerca"}
            </span>
          </div>
        ) : (
          <div className="max-w-[92%] rounded-[12px] bg-white/80 p-3 text-[13px] text-tenue">
            No hay un comercio cerca: sigue en el journey de incentivos que ya existe.
          </div>
        )}
      </div>
    </Marco>
  );
}
