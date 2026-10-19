import type { Metadata } from "next";
import { Suspense } from "react";
import { Panel } from "@/components/panel/Panel";
import { VISTAS, type Vista } from "@/lib/vistas";

export const metadata: Metadata = {
  title: "Primera compra · Prototipo",
};

// ?vista=rescate abre directo en esa vista: sirve para enlazar una parte del panel en un mensaje.
async function ConVista({ searchParams }: { searchParams: PageProps<"/panel">["searchParams"] }) {
  const { vista } = await searchParams;
  const inicial = VISTAS.some(([k]) => k === vista) ? (vista as Vista) : "resumen";
  return <Panel inicial={inicial} />;
}

export default function PaginaPanel({ searchParams }: PageProps<"/panel">) {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-lienzo" />}>
      <ConVista searchParams={searchParams} />
    </Suspense>
  );
}
