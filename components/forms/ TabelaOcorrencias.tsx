export function TabelaOcorrencias({ ocorrencias }) {
  if (!ocorrencias.length) return <p>Nenhuma ocorrência encontrada.</p>;

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th>Aluno</th><th>Turma</th><th>Turno</th><th>Data</th><th>Ocorrência</th><th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {ocorrencias.map((oc, i) => (
          <tr key={i} className="border-t">
            <td>{oc.aluno}</td>
            <td>{oc.turma}</td>
            <td>{oc.turno}</td>
            <td>{oc.data}</td>
            <td>{oc.ocorrencia}</td>
            <td>{oc.acao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
