// importações de dependências:
import Link from "next/link";
import type { Metadata } from "next";

// importações de fontes:
import { Geist, Geist_Mono } from "next/font/google";

// importações de estilos:
import "./globals.css";

// importações de componentes:
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import { ProgressBar } from "@/components/ui/progress";
import { MoveRightIcon } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "404 · Corujal",
  description: "A página que você está procurando não foi encontrada.",
};

export default function Page() {
  return (
    <html lang="pt-br" suppressHydrationWarning className="no-scrollbar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-dvh min-w-dvw items-center justify-center gap-4">
            <h1 className="text-5xl font-mono border-r border-black dark:border-white pr-4">404</h1>
            <div>
              <p>Não temos esta página.</p>
              <Link
                href="/"
                className="hover:underline flex items-center gap-2"
              >
                <p>Página inicial</p>
                <MoveRightIcon size={18} />
              </Link>
            </div>
          </main>
          <Toaster visibleToasts={1} />
          <ProgressBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
