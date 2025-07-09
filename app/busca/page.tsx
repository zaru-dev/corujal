'use client';

import { useState } from 'react';
import { FiltroRelatorio } from '@/components/forms/FiltroRelatorio';
import { TabelaOcorrencias } from '@/components/TabelaOcorrencias';
import { ExportarArquivo } from '@/components/ExportarArquivo';

export default function PaginaRelatorios() {
  const [filtros, setFiltros] = useState({});
  const [ocorrencias, setOcorrencias] = useState([]);

  const buscarOcorrencias = async () => {
    const res = await fetch('/api/relatorios/buscar', {
      method: 'POST',
      body: JSON.stringify(filtros),
    });
    const data = await res.json();
    setOcorrencias(data);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Relatórios de Ocorrências</h1>
      <FiltroRelatorio onBuscar={buscarOcorrencias} onFiltroChange={setFiltros} />
      <TabelaOcorrencias ocorrencias={ocorrencias} />
      <ExportarArquivo dados={ocorrencias} />
    </div>
  );
}
