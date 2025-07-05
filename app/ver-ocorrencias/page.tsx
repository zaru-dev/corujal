import { OccurrenceSeachForm } from "@/components/forms/occurrenceSearchForm";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerOcorrencias() {
  return(
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Procurar ocorrências</CardTitle>
        <CardDescription>Digite a matrícula para começar</CardDescription>
      </CardHeader>

      <OccurrenceSeachForm />
    </Card>
  );
}