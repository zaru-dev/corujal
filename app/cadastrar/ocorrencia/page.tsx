// app/cadastrar/page.tsx
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentSeachForm } from "@/components/forms/studentSearchForm";

export default function CadastrarBuscaPage() {
  return (
    <Card className="max-w-md w-full max-h-[calc(100dvh-2rem)] gap-0 mx-auto mt-6">
      <CardHeader>
        <CardTitle>Cadastrar Ocorrência</CardTitle>
        <CardDescription>Digite a matrícula para começar</CardDescription>
      </CardHeader>

      <StudentSeachForm />
    </Card>
  );
}