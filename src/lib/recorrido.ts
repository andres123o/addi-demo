// Los primeros 30 días después de aprobar, como dos flujos automáticos de CRM (Braze Canvas).
// Cada mensaje sale solo según lo que hizo la persona; quien compra sale del flujo. Datos simulados.
import { ACTIVACION, ACTIVACION_BASE, APROBADOS, PRIMERA_COMPRA } from "./datos";

export type Canal = "In-app" | "WhatsApp" | "Push" | "Correo";

export type Paso = {
  espera: string; // qué dispara el mensaje
  canal: Canal;
  titulo: string;
  mensaje: string;
  reciben: number;
  compran: number; // compran en las 72 h siguientes y salen del flujo
};

export type Flujo = {
  id: "primera" | "segunda";
  nombre: string;
  entrada: string;
  entran: number;
  meta: string;
  hoy: number;
  con: number;
  pasos: Paso[];
};

export const SEGUNDA_BASE = 0.34;
export const SEGUNDA_CON_RECORRIDO = 0.41;

export const FLUJOS: Flujo[] = [
  {
    id: "primera",
    nombre: "De aprobado a primera compra",
    entrada: "Aprobado en Addi",
    entran: APROBADOS,
    meta: "Primera compra",
    hoy: ACTIVACION_BASE,
    con: ACTIVACION,
    pasos: [
      {
        espera: "Al aprobar",
        canal: "In-app",
        titulo: "Tu cupo preaprobado",
        mensaje: "Ya tienes un cupo preaprobado de $600.000. Es un monto de referencia: Addi lo confirma al momento de pagar.",
        reciben: 100_000,
        compran: 21_400,
      },
      {
        espera: "1 día sin intentar comprar",
        canal: "WhatsApp",
        titulo: "Dónde usarlo cerca",
        mensaje: "Hola, Natalia. En Jumbo Calle 80 puedes pagar con el QR del datáfono y dividir tu compra en cuotas.",
        reciben: 52_000,
        compran: 6_760,
      },
      {
        espera: "Vio productos y no compró",
        canal: "Push",
        titulo: "Lo que miraste",
        mensaje: "La licuadora que viste sigue disponible. Mira cuánto quedaría cada cuota antes de decidir.",
        reciben: 31_000,
        compran: 4_030,
      },
      {
        espera: "7 días sin comprar",
        canal: "Correo",
        titulo: "Cuánto cuesta en realidad",
        mensaje: "Un ejemplo con todo incluido: intereses, fianza y fechas de pago, antes de comprar.",
        reciben: 44_000,
        compran: 3_520,
      },
      {
        espera: "14 días sin comprar",
        canal: "WhatsApp",
        titulo: "Una compra del día a día",
        mensaje: "Tu cupo también sirve para el mercado o la droguería. Paga con el QR y divídelo en cuotas.",
        reciben: 14_000,
        compran: 3_448,
      },
    ],
  },
  {
    id: "segunda",
    nombre: "De primera a segunda compra",
    entrada: "Hizo su primera compra",
    entran: PRIMERA_COMPRA,
    meta: "Segunda compra",
    hoy: SEGUNDA_BASE,
    con: SEGUNDA_CON_RECORRIDO,
    pasos: [
      {
        espera: "Al comprar",
        canal: "In-app",
        titulo: "Así quedan tus cuotas",
        mensaje: "Tus fechas y el valor exacto de cada cuota. Si pagas antes, te mostramos cuánto ahorras.",
        reciben: PRIMERA_COMPRA,
        compran: 2_100,
      },
      {
        espera: "Pagó su primera cuota",
        canal: "Push",
        titulo: "Tu pago quedó registrado",
        mensaje: "Recibimos tu pago de $105.000. Ya se ve en tu cuenta.",
        reciben: 52_000,
        compran: 6_240,
      },
      {
        espera: "10 días sin volver",
        canal: "WhatsApp",
        titulo: "Lo que suele seguir",
        mensaje: "Quienes compran una licuadora suelen volver por algo para la cocina. Estas son opciones del mismo comercio.",
        reciben: 48_000,
        compran: 7_680,
      },
      {
        espera: "21 días sin volver",
        canal: "Correo",
        titulo: "Tu cupo hoy",
        mensaje: "Tu cupo disponible es de referencia y se confirma al pagar. Puedes usarlo en 60.000 comercios.",
        reciben: 36_000,
        compran: 4_680,
      },
    ],
  },
];
