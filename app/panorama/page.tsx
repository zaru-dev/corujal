import { RenderOccurrences } from "@/components/renderOccurrences";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

export default function Page(){
  return(
    <>
       <header className="sticky h-14 top-0 flex items-center justify-center bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-b border-border z-50">
        <nav className="container flex justify-between items-center">
          <Link
            href="/"
            className="font-averia text-2xl font-semibold"
          >
            corujal
          </Link>

          <ThemeToggle />
        </nav>
      </header>

      <section className="max-w-dvw w-full min-h-main-container my-4 flex justify-center">
        <main className="container w-full flex flex-wrap gap-4 content-start">
          <RenderOccurrences />
        </main>
      </section>
    </>
  );
};