import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AdaptiveImage } from "@/components/adaptive-image";

interface AuthHeaderProps {
  auth_type: "login" | "register";
};

export function AuthHeader({ auth_type }: AuthHeaderProps) {
  return (
    <CardHeader>
      <CardTitle>
        <Link href="/" className="font-averia text-3xl flex gap-2 items-center ">
          <AdaptiveImage src_dark="https://4aol7q5h4wjpfp1m.public.blob.vercel-storage.com/corujal-branco.svg" src_light={"https://4aol7q5h4wjpfp1m.public.blob.vercel-storage.com/corujal.svg"} alt="corujal's logo" width={36} height={36} />
          corujal
        </Link>
      </CardTitle>
      <CardDescription>
        { auth_type === "login" ? "Bem-vindo(a) de volta. Entre para continuar." : "Para continuar, você precisa criar uma conta."}
      </CardDescription>
    </CardHeader>
  );
}