// Datos simulados de una cohorte de 30 días. Una sola base: todo lo demás se deriva de aquí y cuadra.
// Tasas públicas: activación 61 % (vacante de Addi) y aprobación al pagar 73 % (Portafolio, 2025).

export const APROBADOS = 100_000;
export const ACTIVACION_BASE = 0.61;
export const APROBACION_PAGO = 0.73;

export const PRIMERA_A_LA_PRIMERA = Math.round(APROBADOS * ACTIVACION_BASE); // 61.000
export const INTENTAN = Math.round(PRIMERA_A_LA_PRIMERA / APROBACION_PAGO); // 83.562
export const RECHAZADOS = INTENTAN - PRIMERA_A_LA_PRIMERA; // 22.562
export const SIN_INTENTO = APROBADOS - INTENTAN; // 16.438

// ── Rescate en la caja ───────────────────────────────────────────────
export const NO_ELEGIBLES = 3_012; // señal de fraude o mora: sin oferta
export const ELEGIBLES = RECHAZADOS - NO_ELEGIBLES; // 19.550
export const RESCATE_CONTROL = 3_910; // 20 % en control
export const RESCATE_OFERTA = ELEGIBLES - RESCATE_CONTROL; // 15.640
export const RESCATE_COMPRAN = 6_312; // compran en 7 días con oferta
export const RESCATE_CONTROL_COMPRAN = 78; // 2,0 % del control
export const RESCATE_INCREMENTAL = Math.round(RESCATE_COMPRAN - (RESCATE_CONTROL_COMPRAN / RESCATE_CONTROL) * RESCATE_OFERTA); // 6.000

export type TipoOferta = "pago" | "producto" | "validar";

export const OFERTAS: { id: TipoOferta; nombre: string; detalle: string; mostradas: number; compras: number }[] = [
  { id: "pago", nombre: "Pago inicial", detalle: "Paga la diferencia con Nequi o PSE y el resto a cuotas", mostradas: 7_000, compras: 3_150 },
  { id: "producto", nombre: "Otro producto", detalle: "Opciones del mismo comercio que sí alcanzan", mostradas: 6_100, compras: 2_170 },
  { id: "validar", nombre: "Validar y reintentar", detalle: "Completa un dato de identidad y vuelve a intentar", mostradas: 2_540, compras: 992 },
];

// ── Primera compra cotidiana ─────────────────────────────────────────
export const CON_COMERCIO_CERCA = 14_000;
export const COTIDIANA_CONTROL = 2_800;
export const COTIDIANA_ENVIADOS = CON_COMERCIO_CERCA - COTIDIANA_CONTROL; // 11.200
export const COTIDIANA_COMPRAN = 3_448;
export const COTIDIANA_CONTROL_COMPRAN = 112;
export const COTIDIANA_INCREMENTAL = Math.round(COTIDIANA_COMPRAN - (COTIDIANA_CONTROL_COMPRAN / COTIDIANA_CONTROL) * COTIDIANA_ENVIADOS); // 3.000

// ── Totales ──────────────────────────────────────────────────────────
export const INCREMENTALES = RESCATE_INCREMENTAL + COTIDIANA_INCREMENTAL;
export const PRIMERA_COMPRA = PRIMERA_A_LA_PRIMERA + INCREMENTALES;
export const ACTIVACION = PRIMERA_COMPRA / APROBADOS;

export const TICKET_RESCATE = 300_000;
export const TICKET_COTIDIANA = 150_000;
export const GMV_RESCATE = RESCATE_INCREMENTAL * TICKET_RESCATE;
export const GMV_COTIDIANA = COTIDIANA_INCREMENTAL * TICKET_COTIDIANA;
export const GMV_INCREMENTAL = GMV_RESCATE + GMV_COTIDIANA;
export const PESOS_POR_DOLAR = 4_000;

// Activación semanal (8 semanas), para la línea de tendencia.
export const TENDENCIA_ACTIVACION = [0.61, 0.615, 0.625, 0.64, 0.655, 0.67, 0.685, ACTIVACION];

// Lecturas semanales del último mes: suman lo incremental del mes.
export const SEMANAS = [
  { nombre: "Semana 1", rescate: 1_400, cotidiana: 690 },
  { nombre: "Semana 2", rescate: 1_480, cotidiana: 730 },
  { nombre: "Semana 3", rescate: 1_540, cotidiana: 770 },
  { nombre: "Semana 4", rescate: RESCATE_INCREMENTAL - 1_400 - 1_480 - 1_540, cotidiana: COTIDIANA_INCREMENTAL - 690 - 730 - 770 },
];

// ── Muestras para las listas ─────────────────────────────────────────
export type Estado = "recuperada" | "en-caja" | "sin-compra" | "protegida";

export type Rechazo = {
  id: string;
  nombre: string;
  donde: string;
  canal: "Tienda física" | "Datáfono QR" | "E-commerce" | "App Addi";
  producto: string;
  intento: number;
  alcanza: number | null;
  oferta: TipoOferta | "ninguna";
  detalle: string;
  estado: Estado;
  minutos: number;
};

export const RECHAZOS: Rechazo[] = [
  { id: "r1", nombre: "Laura M.", donde: "Alkosto", canal: "Tienda física", producto: "Licuadora y sanduchera", intento: 420_000, alcanza: 300_000, oferta: "pago", detalle: "Paga $120.000 con Nequi", estado: "recuperada", minutos: 4 },
  { id: "r2", nombre: "Jhon R.", donde: "Calzatodo", canal: "Tienda física", producto: "Tenis de running", intento: 260_000, alcanza: 230_000, oferta: "pago", detalle: "Paga $30.000 con PSE", estado: "recuperada", minutos: 11 },
  { id: "r3", nombre: "Diana P.", donde: "Marketplace", canal: "App Addi", producto: "Celular gama media", intento: 1_150_000, alcanza: 500_000, oferta: "producto", detalle: "2 celulares desde $459.000", estado: "en-caja", minutos: 18 },
  { id: "r4", nombre: "Andrés C.", donde: "Jumbo", canal: "Datáfono QR", producto: "Mercado del mes", intento: 180_000, alcanza: null, oferta: "validar", detalle: "Confirma su correo", estado: "recuperada", minutos: 26 },
  { id: "r5", nombre: "Paola G.", donde: "Falabella.com", canal: "E-commerce", producto: "Colchón doble", intento: 690_000, alcanza: 450_000, oferta: "pago", detalle: "Paga $240.000 con PSE", estado: "en-caja", minutos: 40 },
  { id: "r6", nombre: "Sergio T.", donde: "Éxito", canal: "Tienda física", producto: "Audífonos", intento: 350_000, alcanza: null, oferta: "ninguna", detalle: "Reintentar en 30 días", estado: "protegida", minutos: 52 },
  { id: "r7", nombre: "Marcela D.", donde: "Marketplace", canal: "App Addi", producto: "Nevera 300 L", intento: 1_890_000, alcanza: 600_000, oferta: "producto", detalle: "3 neveras desde $569.000", estado: "sin-compra", minutos: 64 },
];

export type Envio = {
  id: string;
  nombre: string;
  cupo: number;
  dias: number;
  comercio: string | null;
  tipo: "QR" | "Aliado";
  cuando: string;
  canal: "WhatsApp" | "Push";
};

export const ENVIOS: Envio[] = [
  { id: "e1", nombre: "Natalia R.", cupo: 600_000, dias: 9, comercio: "Jumbo Calle 80", tipo: "QR", cuando: "Hoy, 6 pm", canal: "WhatsApp" },
  { id: "e2", nombre: "Kevin S.", cupo: 350_000, dias: 6, comercio: "Cruz Verde Suba", tipo: "Aliado", cuando: "Mañana, 10 am", canal: "Push" },
  { id: "e3", nombre: "Yuliana B.", cupo: 800_000, dias: 14, comercio: "Restaurantes en Chapinero", tipo: "QR", cuando: "Viernes, 12 pm", canal: "WhatsApp" },
  { id: "e4", nombre: "Óscar L.", cupo: 450_000, dias: 11, comercio: "Calzatodo Titán Plaza", tipo: "Aliado", cuando: "Sábado, 11 am", canal: "WhatsApp" },
  { id: "e5", nombre: "Mónica A.", cupo: 300_000, dias: 21, comercio: null, tipo: "Aliado", cuando: "", canal: "WhatsApp" },
];

// Dónde hacen la primera compra cotidiana los que compran (suma COTIDIANA_COMPRAN).
export const LUGARES = [
  { nombre: "Supermercados", n: 1_380 },
  { nombre: "Droguerías", n: 828 },
  { nombre: "Restaurantes", n: 620 },
  { nombre: "Ropa y calzado", n: 620 },
];
