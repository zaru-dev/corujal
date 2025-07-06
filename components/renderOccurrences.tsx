// componentes:
import { PanoramaOccurrencesCard } from "@/components/panoramaOccurrencesCard";

// actions:
import { bringOccurrences } from "@/lib/actions/panoramaActions";
import { format } from "date-fns";

export async function RenderOccurrences(){
  const occurences = await bringOccurrences();

  return(
    <>
      { occurences.ocorrencias?.map((o) => (
        <PanoramaOccurrencesCard 
          key={o.codigo}
          codigo={o.codigo}
          situacao={o.situacao}
          aluno={o.aluno}
          data={format(o.data, "dd/MM/yyyy")}
          medida={o.medida}
          descricao={o.descricao}
        />
      ))}
    </>
  );
};