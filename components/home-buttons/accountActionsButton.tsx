import Link from "next/link";
import { Button } from "../ui/button";
import { LogInIcon, UserPlus } from "lucide-react";

interface AccountActionButtonProps {
  action: "login" | "register";
}

type Variant = "default" | "outline" | "link" | "destructive" | "secondary" | "ghost" | null | undefined

const actionConfig = {
  "login": {
    href: "/conta/entrar",
    label: "Entrar",
    variant: "default"
  },
  "register": {
    href: "/conta/criar",
    label: "Criar conta",
    variant: "outline"
  }
}

export function AccountActionButton({ action }: AccountActionButtonProps ) {
  const config = actionConfig[action];

  return (
    <Button asChild variant={config.variant as Variant} className="h-8">
      <Link href={config.href}>
        {config.label}
      </Link>
    </Button>
  );
}