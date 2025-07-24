// Importações de componentes
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentRegistrationForm } from "@/components/forms/studentRegistrationForm";

export default function CadastrarPage() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Botão de voltar */}
      <Link
        href="/"
        className="self-start text-blue-600 hover:underline text-sm"
      >
        ⬅ Voltar para a Home
      </Link>

      {/* Card de cadastro */}
      <Card className="max-w-md w-full max-h-[calc(100dvh-2rem)] gap-0">
        <CardHeader>
          <CardTitle>Cadastro de aluno</CardTitle>
          <CardDescription>Preencha os dados do aluno</CardDescription>
        </CardHeader>

        <StudentRegistrationForm />
      </Card>
    </div>
  );
}