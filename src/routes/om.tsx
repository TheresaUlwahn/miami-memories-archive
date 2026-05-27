import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";

export const Route = createFileRoute("/om")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: "Om bloggen · Miami–Ulwarna" }],
  }),
});

function AboutPage() {
  return (
    <SiteLayout>
      <article className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight">
          Om bloggen
        </h1>
        <div className="mt-8 space-y-5 text-stone-800 leading-relaxed text-[17px]">
          <p>
            Miami–Ulwarna är en avslutad blogg som skrevs mellan 2015 och 2018.
            Den handlar om en flytt från Sverige till Miami — och tillbaka
            igen.
          </p>
          <p>
            56 inlägg, hundratals bilder, och en tid i livet som inte kommer
            tillbaka. Den här sidan är ett digitalt arkiv av allting, samlat
            på ett ställe så att det inte ska försvinna.
          </p>
          <p className="text-sm text-stone-500 italic">
            Inga nya inlägg publiceras.
          </p>
        </div>
      </article>
    </SiteLayout>
  );
}
