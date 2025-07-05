// importações de componentes:
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentSeachForm } from "@/components/forms/studentSearchForm";

export default function Page(){
  return(
    <Card className="max-w-md w-full max-h-[calc(100dvh-2rem)] gap-0">
      <CardHeader>
        <CardTitle>Cadastrar ocorrência</CardTitle>
        <CardDescription>Digite a matrícula para começar</CardDescription>
      </CardHeader>

      <StudentSeachForm />
      
    </Card>
  );
};