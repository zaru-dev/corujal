// importações de componentes:
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentRegistrationForm } from "@/components/forms/studentRegistrationForm";

export default function Page(){
  return(
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Cadastro de aluno</CardTitle>
        <CardDescription>Preencha os dados do aluno</CardDescription>
      </CardHeader>

      <StudentRegistrationForm />
    </Card>
  );
};