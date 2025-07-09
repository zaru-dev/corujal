import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import jsPDF from 'jspdf';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function exportarParaTxt(dados: any[]) { ... }
export function exportarParaPdf(dados: any[]) { ... }

// Exportar para .pdf
export function exportarParaPdf(dados: any[]) {
  const doc = new jsPDF();
  dados.forEach((d, i) => {
    const y = 10 + i * 30;
    doc.text(`${d.data} - ${d.aluno} (${d.turma}/${d.turno})`, 10, y);
    doc.text(`Ocorrência: ${d.ocorrencia}`, 10, y + 10);
    doc.text(`Ação: ${d.acao}`, 10, y + 20);
  });
  doc.save('relatorio_ocorrencias.pdf');
}