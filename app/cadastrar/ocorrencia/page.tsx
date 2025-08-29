// importações de componentes:
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { StudentSeachForm } from "@/components/forms/studentSearchForm";
import { CardsTitle } from "@/components/cardsHeader";

export default function Page(){
  return(
    <Card className="max-w-md w-full max-h-[calc(100dvh-2rem)] gap-0">
      <CardHeader>
        <CardsTitle title="Cadastrar ocorrência"/>
        <CardDescription>Digite a matrícula para começar</CardDescription>
      </CardHeader>

      <StudentSeachForm />
      
    </Card>
  );
};