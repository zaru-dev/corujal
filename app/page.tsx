//Home
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Bem-vindo ao Corujal!</h1>

      <nav style={{ marginTop: '1.5rem' }}>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem', maxWidth: 300 }}>
          <li>
            <Link href="/cadastrar">Cadastrar Ocorrência</Link>
          </li>
          <li>
            <Link href="/busca">Buscar Aluno / Ocorrência</Link>
          </li>
          <li>
            <Link href="/panorama">Panorama / Relatórios</Link>
          </li>
          <li>
            <Link href="/ver-ocorrencias">Ver Todas as Ocorrências</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}