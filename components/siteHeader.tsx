import Link from "next/link";
import { ThemeToggle } from "./ui/theme-toggle";
import { AccountActionButton } from "./accountActionsButton";

export function SiteHeader() {
  return (
    <header className="sticky h-14 top-0 flex items-center justify-center bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-b border-border z-50">
      <nav className="container flex justify-between items-center">
        <Link href="/" className="font-averia text-2xl font-semibold">
          corujal
        </Link>

        <div className="flex gap-2 items-center">
          <AccountActionButton action="register"/>
          <AccountActionButton action="login"/>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
