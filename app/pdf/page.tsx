'use client';

// dependências:
import dynamic from 'next/dynamic';

// componentes:
import { ExemploOcorrencia, OccurrencePdf } from '@/components/pdfs/occurrencePdf';
import { SiteHeader } from '@/components/siteHeader';

// Importar PDFViewer e PDFDownloadLink dinamicamente para evitar SSR
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Carregando visualizador PDF...</p>,
  }
);

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Preparando download...</p>,
  }
);

export default function PDFViewerComponent() {
  return (
    <>
      <SiteHeader />
      <main className="w-dvw flex flex-col h-main-container h-">
        {/* Visualizador */}
        <div className="flex-1">
          <PDFViewer width="100%" height="100%" className="border-0" >
            <ExemploOcorrencia />
          </PDFViewer>
        </div>
      </main>
    </>
  );
}