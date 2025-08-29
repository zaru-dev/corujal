// importações de componentes:
import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { StudentRegistrationForm } from "@/components/forms/studentRegistrationForm";
import { CardsTitle } from "@/components/cardsHeader";


export default function Page() {
  return (
    <Card className="max-w-md w-full max-h-[calc(100dvh-2rem)] gap-0">
      <CardHeader>
        <CardsTitle title="Cadastro de aluno"/>
        <CardDescription>Preencha os dados do aluno</CardDescription>
      </CardHeader>

      <StudentRegistrationForm />
    </Card>
  );
}
