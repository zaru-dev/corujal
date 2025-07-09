import { exportarParaTxt, exportarParaPdf } from '@/utils/exportUtils';

export function ExportarArquivo({ dados }) {
  return (
    <div className="space-x-4 mt-4">
      <button onClick={() => exportarParaTxt(dados)} className="bg-green-600 text-white px-4 py-2">Exportar .TXT</button>
      <button onClick={() => exportarParaPdf(dados)} className="bg-red-600 text-white px-4 py-2">Exportar .PDF</button>
    </div>
  );
}
