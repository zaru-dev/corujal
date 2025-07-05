// importações de componentes:
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentRegistrationForm } from "@/components/forms/studentRegistrationForm";

export default function Page(){
  return(
    <Card className="max-w-md w-full max-h-[calc(100dvh-2rem)] gap-0">
      <CardHeader>
        <CardTitle>Cadastro de aluno</CardTitle>
        <CardDescription>Preencha os dados do aluno</CardDescription>
      </CardHeader>

      <StudentRegistrationForm />
    </Card>
  );
};