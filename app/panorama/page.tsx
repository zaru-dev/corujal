import { RenderOccurrences } from "@/components/renderOccurrences";
import { SiteHeader } from "@/components/siteHeader";

export default function Page(){
  return(
    <>
      <SiteHeader />

      <section className="max-w-dvw w-full min-h-main-container my-4 flex justify-center">
        <main className="container w-full flex flex-wrap gap-4 content-start">
          <RenderOccurrences />
        </main>
      </section>
    </>
  );
};