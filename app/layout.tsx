// importações de dependências:
import type { Metadata } from "next";

// importações de fontes:
import { Averia_Serif_Libre, Geist, Geist_Mono } from "next/font/google";

// importações de estilos:
import "./globals.css";

// importações de componentes:
import { ThemeProvider } from "@/components/ui/theme-provider";

const averia = Averia_Serif_Libre({
  weight: "400",
  style: "normal",
  variable: "--font-averia",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Corujal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${averia.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
