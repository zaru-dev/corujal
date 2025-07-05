// os arquivos layout definem a estrutura de todas as páginas que aparecem dentro da pasta em que eles estão

// pastas entre parênteses são pastas de organização do nextjs, elas não aparecem no link da página, então um conjuto de pastas assim: </(pasta-exemplo)/pagina-exemplo/page.jsx> terá um link assim <site.com/pagina-exemplo>

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return(
    <div className="min-w-dvw min-h-dvh max-h-dvh flex justify-center items-center p-4 box-border">
      {children}
    </div>
  )
};