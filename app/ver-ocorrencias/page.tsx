import { CardsTitle } from "@/components/cardsHeader";
import { OccurrenceSeachForm } from "@/components/forms/occurrenceSearchForm";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export default function VerOcorrencias() {
  return(
    <Card className="max-w-md w-full max-h-[calc(100dvh-2rem)] gap-0">
      <CardHeader>
        <CardsTitle title="Procurar ocorrências"/>
        <CardDescription>Digite a matrícula para começar</CardDescription>
      </CardHeader>

      <OccurrenceSeachForm />
    </Card>
  );
}