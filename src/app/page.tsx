import Link from "next/link";
import type { ReactNode } from "react";
import { Check, ShoppingBag, TrendingUp, LifeBuoy, MapPin, Plus, QrCode, ShieldCheck, Store, Wallet, type LucideIcon } from "lucide-react";
import * as D from "@/lib/datos";
import { miles, millones, pct } from "@/lib/formato";
import { TelefonoCaja } from "@/components/panel/Telefono";

const HECHOS: { n: string; texto: string }[] = [
  { n: "61 % → 67 %", texto: "Meta de activación a 12 meses" },
  { n: "US$1 M de 1,4 M", texto: "GMV incremental del portafolio de activación frente al plan" },
  { n: "1 de cada 4", texto: "clientes nuevos no pasa la aprobación al pagar (73 % aprobados en 2025)" },
  { n: "≈ $1.670 M", texto: "en descuentos publicados de enero a septiembre, con compra mínima de $200.000 a $400.000" },
  { n: "221.000", texto: "datáfonos Credibanco donde ya se paga con Addi por QR" },
  { n: "“Espera 1 a 2 meses”", texto: "lo que hoy recibe quien es rechazado al pagar" },
];

export default function Propuesta() {
  return (
    <div className="flex min-h-dvh flex-col bg-fondo">
      <header className="sticky top-0 z-30 border-b border-linea bg-fondo/90 backdrop-blur-md">
        <div className="flex h-16 w-full items-center justify-between gap-4 pl-4 pr-3 sm:pl-8 sm:pr-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/addi/addi.svg" alt="Addi" width={84} height={33} className="h-[30px] w-auto" />
          <Link href="/panel" className="inline-flex h-10 items-center rounded-full bg-marca px-5 text-[14px] font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-md">
            Ver el prototipo
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_460px]">
        <div className="flex flex-col gap-8">
          <h1 className="titulo text-[44px] sm:text-[58px] lg:text-[67px]">
            El rechazo no debe ser el fin de la <span className="text-marca">primera compra</span>
          </h1>
          <p className="max-w-[560px] text-[19px] leading-[1.46] text-texto-secundario">
            Dos palancas para llevar la activación de <b className="font-medium text-texto">61 %</b> a <b className="font-medium text-texto">{pct(D.ACTIVACION, 0)}</b>, sin gastar en descuentos. Propuesta de{" "}
            <b className="font-medium text-texto">Andrés Olaya</b>, quien lideró el onboarding y la activación de trii durante 15 meses.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/panel" className="inline-flex h-12 items-center rounded-full bg-marca px-6 text-[15px] font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-md">
              Ver el prototipo
            </Link>
            <a href="#investigacion" className="inline-flex h-12 items-center rounded-full bg-superficie px-6 text-[15px] font-medium transition-colors hover:bg-borde">
              Lo que investigué
            </a>
          </div>
          <dl className="grid max-w-[600px] grid-cols-3 gap-4 border-t border-linea pt-6">
            <Logro icono={TrendingUp} n={`+${Math.round((D.ACTIVACION - D.ACTIVACION_BASE) * 100)} pts`} t="de activación" />
            <Logro icono={ShoppingBag} n={`+${miles(D.INCREMENTALES)}`} t="primeras compras al mes" />
            <Logro icono={Wallet} n="$0" t="en descuentos" />
          </dl>
        </div>
        <div className="relative flex justify-center rounded-bloque bg-marca-fondo px-6 py-10">
          <TelefonoCaja r={D.RECHAZOS[0]} />
          <span className="absolute left-4 top-16 hidden items-center gap-2 rounded-full bg-fondo px-3 py-2 text-[13px] shadow-md sm:inline-flex">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-error-fondo text-error-texto">
              <LifeBuoy className="h-3.5 w-3.5" />
            </span>
            Rechazo rescatado
          </span>
          <span className="absolute bottom-16 right-4 hidden items-center gap-2 rounded-full bg-fondo px-3 py-2 text-[13px] shadow-md sm:inline-flex">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-exito-fondo text-exito-texto">
              <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
            </span>
            Primera compra hecha
          </span>
        </div>
      </section>

      {/* Lo que investigamos */}
      <Seccion id="investigacion" fondo="bg-superficie" titulo="Lo que se ve desde afuera">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HECHOS.map((h) => (
            <article key={h.texto} className="flex flex-col gap-3 rounded-tarjeta bg-fondo p-6 shadow-xs">
              <p className="cifra text-[34px]">{h.n}</p>
              <p className="text-[16px] leading-[1.4] text-texto-secundario">{h.texto}</p>
            </article>
          ))}
        </div>
      </Seccion>

      {/* Dónde se fuga */}
      <Seccion titulo="Dónde se pierde la primera compra">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-5 rounded-tarjeta border border-linea p-6">
            <span className="text-[14px] text-tenue">De cada 100 personas aprobadas</span>
            <Paso nombre="Aprobados" n={D.APROBADOS} nota="Punto de partida" />
            <Paso nombre="Intentan comprar" n={D.INTENTAN} nota="61 % ÷ 73 % de aprobación al pagar" />
            <Paso nombre="Primera compra aprobada" n={D.PRIMERA_A_LA_PRIMERA} nota="Activación actual publicada por Addi" final />
          </div>
          <div className="grid gap-4">
            <Fuga icono={LifeBuoy} tono="bg-error-fondo text-error-texto" tipo="Fricción" n={D.RECHAZADOS} nota="1 de cada 4 intentos no se aprueba: 73 % de aprobación en clientes nuevos (2025)" texto="Quieren comprar. El “no” llega en la caja y no hay plan B." />
            <Fuga icono={MapPin} tono="bg-aviso-fondo text-aviso-texto" tipo="Intención" n={D.SIN_INTENTO} nota="Aprobados que nunca llegan a intentar una compra" texto="Tienen cupo, pero no ven dónde ni para qué usarlo hoy." />
          </div>
        </div>
        <blockquote className="mt-6 flex flex-col gap-2 rounded-tarjeta bg-marca-fondo p-6">
          <p className="titulo text-[24px] sm:text-[28px]">“Knows the difference between a friction problem and an intent problem, and treats them differently.”</p>
          <span className="text-[14px] text-tenue">Vacante Growth Manager (Activation &amp; Consumer), Addi</span>
        </blockquote>
      </Seccion>

      {/* Propuesta */}
      <Seccion fondo="bg-superficie" titulo="Una palanca para cada fuga">
        <div className="grid gap-4 lg:grid-cols-2">
          <Palanca
            icono={LifeBuoy}
            tono="bg-error-fondo text-error-texto"
            tipo="Fricción"
            titulo="Rescate en la caja"
            puntos={[
              [Wallet, "Pago inicial: paga la diferencia con Nequi o PSE"],
              [Store, "Otro producto del mismo comercio que sí alcanza"],
              [ShieldCheck, "Validar y reintentar sin salir de la caja"],
            ]}
            cifra={`+${miles(D.RESCATE_INCREMENTAL)}`}
            mercado="Affirm, en EE. UU., ofrece un pago inicial con débito cuando no puede aprobar todo el monto."
            porque="La persona ya eligió el producto y está en la caja: su intención es la más alta. Cambiar el “no” por un “sí, con esto” recupera la venta sin subir el riesgo de crédito."
          />
          <Palanca
            icono={MapPin}
            tono="bg-aviso-fondo text-aviso-texto"
            tipo="Intención"
            titulo="Primera compra cotidiana"
            puntos={[
              [QrCode, "Dónde usar el cupo cerca: datáfonos QR y aliados"],
              [Store, "Primera compra pequeña: mercado, droguería, restaurante"],
              [Check, "Un mensaje útil antes que un descuento"],
            ]}
            cifra={`+${miles(D.COTIDIANA_INCREMENTAL)}`}
            mercado="Los emisores de tarjetas activan con “úsala donde ya gastas”: mercado, droguería, transporte."
            porque="Una primera compra pequeña y frecuente crea el hábito. Quien usa su tarjeta en los primeros 90 días vale hasta 3 veces más."
          />
        </div>
      </Seccion>

      {/* Encaje */}
      <Seccion titulo="Suma a lo que Addi ya tiene">
        <div className="grid gap-4 lg:grid-cols-2">
          <Lista
            titulo="Lo que ya tienen"
            icono={Check}
            tono="text-exito-texto"
            items={["Journey de 30 días en Braze", "Grupos de control y un experimento por semana", "ROI de incentivos por usuario incremental", "Next Best Action y modelos de propensión"]}
          />
          <Lista
            titulo="Lo que esto suma"
            icono={Plus}
            tono="text-marca"
            items={["Actúa en la caja, donde ningún mensaje llega a tiempo", "Cambia la oferta, no solo el mensaje", "Usa la red nueva de datáfonos", "Se mide igual: control y GMV incremental"]}
          />
        </div>
      </Seccion>

      {/* Métrica */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 rounded-bloque bg-marca p-8 text-white sm:p-12">
          <h2 className="titulo text-[36px] sm:text-[48px]">De 61 % a 70 %: más de lo que pide la meta</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <Grande k="Tasa de activación" v={`61 % → ${pct(D.ACTIVACION, 0)}`} />
            <Grande k="Primeras compras incrementales al mes" v={`+${miles(D.INCREMENTALES)}`} />
            <Grande k="GMV incremental al mes" v={millones(D.GMV_INCREMENTAL)} nota={`≈ US$${Math.round(D.GMV_INCREMENTAL / D.PESOS_POR_DOLAR / 1000)}K`} />
          </div>
          <details className="group rounded-tarjeta bg-white/10 p-5 text-[14px]">
            <summary className="cursor-pointer list-none font-medium">Ver supuestos</summary>
            <ul className="mt-4 grid gap-2 text-white/85 sm:grid-cols-2">
              <li>Rescate: {pct(D.RESCATE_COMPRAN / D.RESCATE_OFERTA)} compra con oferta frente a {pct(D.RESCATE_CONTROL_COMPRAN / D.RESCATE_CONTROL, 0)} del control</li>
              <li>Cotidiana: {pct(D.COTIDIANA_COMPRAN / D.COTIDIANA_ENVIADOS)} compra con mensaje frente a {pct(D.COTIDIANA_CONTROL_COMPRAN / D.COTIDIANA_CONTROL, 0)} del control</li>
              <li>Ticket: $300.000 en rescate, $150.000 en cotidiana</li>
              <li>Cohorte de 100.000 aprobados en 30 días</li>
            </ul>
            <p className="mt-4 text-white/70">Son supuestos para dimensionar. Con las cohortes reales de Addi, el cálculo se rehace en una tarde.</p>
          </details>
        </div>
      </section>

      {/* Quién */}
      <Seccion titulo="Quiero sumarme a este reto">
        <div className="grid gap-4 sm:grid-cols-3">
          <Mini n="15 meses" t="liderando el onboarding y la activación de trii, plataforma de inversión" />
          <Mini n="Prototipos" t="llego con el problema dimensionado y algo funcionando para discutir" />
          <Mini n="Growth Engineer" t="lidero el funnel de punta a punta: encuentro dónde se pierde la gente, priorizo por impacto y mido cada cambio contra un grupo de control" />
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/panel" className="inline-flex h-12 items-center rounded-full bg-marca px-6 text-[15px] font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-md">
            Ver el prototipo
          </Link>
          <a href="https://andresolaya.net" target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full bg-superficie px-6 text-[15px] font-medium transition-colors hover:bg-borde">
            andresolaya.net
          </a>
        </div>
      </Seccion>

      <footer className="border-t border-linea px-4 py-8 sm:px-6">
        <p className="mx-auto w-full max-w-[1200px] text-[12.5px] text-tenue">Propuesta independiente de Andrés Olaya. Datos simulados en el prototipo.</p>
      </footer>
    </div>
  );
}

function Seccion({ id, fondo = "", titulo, children }: { id?: string; fondo?: string; titulo: string; children: ReactNode }) {
  return (
    <section id={id} className={"scroll-mt-16 px-4 py-20 sm:px-6 " + fondo}>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10">
        <h2 className="titulo text-[36px] sm:text-[48px]">{titulo}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}


function Paso({ nombre, n, nota, final }: { nombre: string; n: number; nota: string; final?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end justify-between gap-3">
        <span className="flex flex-col">
          <span className="text-[16px]">{nombre}</span>
          <span className="text-[13px] text-tenue">{nota}</span>
        </span>
        <span className="cifra text-[30px]">{pct(n / D.APROBADOS, n === D.APROBADOS ? 0 : 1)}</span>
      </div>
      <span className="h-3 overflow-hidden rounded-full bg-superficie">
        <span className={"block h-full rounded-full " + (final ? "bg-exito" : "bg-marca")} style={{ width: `${(n / D.APROBADOS) * 100}%` }} />
      </span>
    </div>
  );
}

function Fuga({ icono: Icono, tono, tipo, n, nota, texto }: { icono: LucideIcon; tono: string; tipo: string; n: number; nota: string; texto: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-tarjeta border border-linea p-6">
      <span className={"inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-medium " + tono}>
        <Icono className="h-4 w-4" />
        {tipo}
      </span>
      <p className="cifra text-[40px]">−{pct(n / D.APROBADOS)}</p>
      <p className="text-[16px] text-texto-secundario">{texto}</p>
      <p className="text-[13px] text-tenue">{nota}</p>
    </div>
  );
}

function Palanca(p: { icono: LucideIcon; tono: string; tipo: string; titulo: string; puntos: [LucideIcon, string][]; cifra: string; mercado: string; porque: string }) {
  const Icono = p.icono;
  return (
    <article className="flex flex-col gap-6 rounded-tarjeta bg-fondo p-7 shadow-xs">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-3">
          <span className={"inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-medium " + p.tono}>
            <Icono className="h-4 w-4" />
            {p.tipo}
          </span>
          <h3 className="titulo text-[30px]">{p.titulo}</h3>
        </div>
        <span className="text-right">
          <span className="cifra block text-[34px] text-exito-texto">{p.cifra}</span>
          <span className="block text-[12.5px] text-tenue">compras al mes</span>
        </span>
      </div>
      <ul className="flex flex-col gap-3">
        {p.puntos.map(([I, t]) => (
          <li key={t} className="flex items-center gap-3 text-[16px]">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-marca-fondo text-marca">
              <I className="h-4 w-4" />
            </span>
            {t}
          </li>
        ))}
      </ul>
      <dl className="mt-auto grid gap-4 border-t border-linea pt-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <dt className="text-[13px] font-medium text-marca">Ya funciona en el mercado</dt>
          <dd className="text-[14px] leading-[1.45] text-texto-secundario">{p.mercado}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-[13px] font-medium text-marca">Por qué funciona</dt>
          <dd className="text-[14px] leading-[1.45] text-texto-secundario">{p.porque}</dd>
        </div>
      </dl>
    </article>
  );
}

function Lista({ titulo, icono: Icono, tono, items }: { titulo: string; icono: LucideIcon; tono: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-4 rounded-tarjeta border border-linea p-7">
      <h3 className="font-titulo text-[20px] tracking-[-0.03em]">{titulo}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-[16px]">
            <Icono className={"mt-0.5 h-5 w-5 shrink-0 " + tono} strokeWidth={2.4} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Grande({ k, v, nota }: { k: string; v: string; nota?: string }) {
  return (
    <div className="flex flex-col gap-2 border-t border-white/25 pt-4">
      <span className="text-[14px] text-white/75">{k}</span>
      <span className="cifra text-[40px] sm:text-[44px]">{v}</span>
      {nota && <span className="text-[14px] text-white/75">{nota}</span>}
    </div>
  );
}

function Logro({ icono: Icono, n, t }: { icono: LucideIcon; n: string; t: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-control bg-marca-fondo text-marca">
        <Icono className="h-4 w-4" />
      </span>
      <dt className="cifra text-[26px]">{n}</dt>
      <dd className="text-[14px] leading-tight text-tenue">{t}</dd>
    </div>
  );
}

function Mini({ n, t }: { n: string; t: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-tarjeta bg-superficie p-6">
      <span className="cifra text-[28px]">{n}</span>
      <span className="text-[15px] leading-[1.4] text-texto-secundario">{t}</span>
    </div>
  );
}
