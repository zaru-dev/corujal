// componentes:
import { PanoramaOccurrencesCard } from "@/components/panoramaOccurrencesCard";

// actions:
import { bringOccurrences } from "@/lib/actions/panoramaActions";
import { format } from "date-fns";

export async function RenderOccurrences(){
  const occurences = await bringOccurrences();

  return(
    <>
      { occurences.ocorrencias?.map((occurrence) => (
        <PanoramaOccurrencesCard 
          codigo={occurrence.codigo}
          situacao="Registrada"
          aluno="Teste"
          data={format(occurrence.data, "dd/MM/yyyy")}
          medida={occurrence.medida}
          descricao={occurrence.descricao}
        />
      ))}
    </>
  );
};