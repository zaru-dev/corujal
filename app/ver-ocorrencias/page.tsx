import { OccurrenceSeachForm } from "@/components/forms/occurrenceSearchForm";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerOcorrencias() {
  return(
    <Card className="max-w-md w-full max-h-[calc(100dvh-2rem)] gap-0">
      <CardHeader>
        <CardTitle>Procurar ocorrências</CardTitle>
        <CardDescription>Digite a matrícula para começar</CardDescription>
      </CardHeader>

      <OccurrenceSeachForm />
    </Card>
  );
}