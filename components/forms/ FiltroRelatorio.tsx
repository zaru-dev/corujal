import { useState } from 'react';

export function FiltroRelatorio({ onBuscar, onFiltroChange }) {
  const [filtro, setFiltro] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const novosFiltros = { ...filtro, [name]: value };
    setFiltro(novosFiltros);
    onFiltroChange(novosFiltros);
  };

  return (
    <div className="space-y-2">
      <input name="aluno" placeholder="Nome do aluno" onChange={handleChange} className="border p-2" />
      <input name="turma" placeholder="Turma" onChange={handleChange} className="border p-2" />
      <input name="turno" placeholder="Turno" onChange={handleChange} className="border p-2" />
      <input name="data" type="date" onChange={handleChange} className="border p-2" />
      <button onClick={onBuscar} className="bg-blue-500 text-white px-4 py-2">Buscar</button>
    </div>
  );
}
