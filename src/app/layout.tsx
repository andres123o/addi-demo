import type { Metadata } from "next";
import { Fragment_Mono, Onest, Outfit } from "next/font/google";
import "./globals.css";

// Misma tipografía que co.addi.com: Onest en títulos, Outfit en texto, Fragment Mono para datos.
const onest = Onest({ variable: "--font-onest", subsets: ["latin"], weight: ["400", "500", "600"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["400", "500", "600"] });
const fragment = Fragment_Mono({ variable: "--font-fragment", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Primera compra · Propuesta para Addi",
  description: "Propuesta independiente de Andrés Olaya. No es un sitio oficial de Addi.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${onest.variable} ${outfit.variable} ${fragment.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
