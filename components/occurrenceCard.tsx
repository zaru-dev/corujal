interface OccurrenceCardProps {
  codigo: string;
  descricao: string;
  data: string;
  medida: string;
}

export function OccurrenceCard({ codigo, descricao, data, medida }: OccurrenceCardProps) {
  return (
    <div className="p-4 mt-4 border rounded-md text-sm bg-input/30">
      <ul className="grid grid-cols-3 grid-rows-2 mb-2">
        <li className="font-semibold">Ocorrência</li>
        <li className="font-semibold">Data</li>
        <li className="font-semibold">Medida</li>

        <li>{codigo}</li>
        <li>{data}</li>
        <li>{medida}</li>
      </ul>

      <div className="flex flex-col">
        <p className="font-semibold">Detalhes</p>
        <p className="hyphens-auto">{descricao}</p>
      </div>
    </div>
  );
}