import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";

export const Route = createFileRoute("/om")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "Vem är jag — Theresa Ulwahn · Miami–Ulwarna" },
      {
        name: "description",
        content:
          "Om mig — Theresa Ulwahn. Reseledare, hotellsupervisor, eventansvarig, mamma, fru och crossfit-tjej.",
      },
    ],
  }),
});

const galleryImages = [
  "/images/2015/07/image46.webp",
  "/images/2015/07/image39.webp",
  "/images/2015/07/image41.webp",
  "/images/2015/07/image42.webp",
  "/images/2015/07/image44.webp",
  "/images/2015/07/image45.webp",
  "/images/2015/07/image48.webp",
  "/images/2015/07/image40.webp",
  "/images/2015/07/image49.webp",
  "/images/2015/07/image50.webp",
  "/images/2015/07/image52.webp",
  "/images/2015/07/image51.webp",
];

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-stone-300 underline-offset-2 hover:decoration-stone-700 transition-colors"
    >
      {children}
    </a>
  );
}

function AboutPage() {
  return (
    <SiteLayout>
      <article className="max-w-2xl mx-auto">
        <header className="text-center">
          <p className="text-xs uppercase tracking-wider text-stone-500">
            Om bloggen
          </p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl text-stone-900 leading-tight">
            Vem är jag
          </h1>
          <p className="mt-3 font-serif text-xl text-stone-600 italic">
            Theresa Ulwahn
          </p>
        </header>

        <figure className="mt-10 overflow-hidden rounded-lg bg-stone-100">
          <img
            src="/images/2018/07/IMG_5435.webp"
            alt="Theresa Ulwahn"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover"
          />
        </figure>

        <div className="mt-10 space-y-5 text-stone-800 leading-relaxed text-[17px]">
          <p>
            Reseledartjej från för länge sen. Med glimten i ögat och
            nyfikenheten att utforska och lära känna. Flyttade efter några år
            utomlands till huvudstaden med min man som även han jobbat ute för{" "}
            <ExternalLink href="http://www.fritidsresor.se">
              Fritidsresor
            </ExternalLink>
            . Väl hemma fann jag mig som handen i handsken i receptionen på
            dåvarande flaggskeppet Scandic Hotel Slussen, som blev början till
            en hotellkarriär där både jag och hotellet utvecklades samtidigt.
            Till ett{" "}
            <ExternalLink href="http://www.hiltonnordics.com/swe/sverige/stockholm/hilton-stockholm-slussen.html">
              Hilton
            </ExternalLink>{" "}
            med förstaklassig service och själv togs steget för min del att bli
            Supervisor Indiviual Reservations. Under åren som följde sa P och
            jag både ja till varandra, en liten Lord föddes och även en liten
            Duchess kom till världen. Lägenheten inne i stan byttes ut mot
            radhus i fina Älta Valley. Tiden kom för steget vidare vilket blev
            som Event Management på Deloitte. Som eventansvarig på en av
            Sveriges störta revisions- och konsultfirmor har senaste åtta åren
            varit utvecklande, utmanande men framför allt enormt roliga.
          </p>

          <p>
            Lämnade drömjobbet med stort D då ödet gett oss en spännande
            utmaning. En nystart. P blev placerad i Miami varav vårt liv
            formades och applicerades till en vardag i ett annat land. De tre
            åren som nu passerat har både varit en ren fröjd men även något av
            en berg-och-dalbana. Och nu är vi nykläckta hemflyttade till
            Sverige igen.
          </p>

          <p>
            Ett av målen för mig själv under åren hemifrån, var att studera.
            Likt en Bambi på hal is klarade jag en kurs på kvartsfart på{" "}
            <ExternalLink href="https://lnu.se/">
              Linnéuniversitetet
            </ExternalLink>
            , Publicera på webben, där jag faktiskt lärde mig bygga hemsidor,
            programmera/koda. Och det vill jag bara säga — var super roligt! I
            våras avslutade jag en andra kurs på samma universitet, Sociala
            Medier, så nu har jag verkligen fåt mersmak av att studera. Vem
            vet, kanske blir det mer av det.
          </p>

          <p>
            Den andra resan jag redan är inne på, påbörjades för åtta år sedan
            med hjälp av{" "}
            <ExternalLink href="http://mamma.fit">PT Olga Rönnberg</ExternalLink>{" "}
            på{" "}
            <ExternalLink href="https://www.mammafitness.se/">
              Mamma Fitness
            </ExternalLink>{" "}
            — att komma i form efter barnen, och som bonus finna vägen till ett
            friskare och starkare jag i form av styrketräning och bra kost. Då
            vi flyttade över till USA fann jag mig ensam på gymet, som var
            stort och fokusen ligger ju på att utveckla sig själv på egen hand
            till stor del. Men så tipsades jag om det bästa för mig där jag är
            just nu, crossfiten.{" "}
            <ExternalLink href="https://www.facebook.com/Palmetto-Bay-CrossFit-327635173970453/">
              Palmetto Bay Crossfit
            </ExternalLink>{" "}
            blev min hemmabox med den skönaste gemenskapen och de goaste
            träningskompisarna. Varje morgon efter jag lämnat barnen till
            skolan åkte jag dit och fick min energiboost. För att lyckas vara
            den mamman som Ulwungarna behöver, ja inte tala om frun eller
            vännen för den delen, behöver man själv en rejäl skopa glädje,
            lycka, pepp och utmaning längs vägen. Och det ger både Crossfit och
            människorna där mig. Blev helt biten från första stunden i boxen
            och jag bara längtar dit varje morgon, trots att man verkligen får
            jobba järnet under passet. Jag rekommenderar med nöje crossfit som
            den bästa träningsformen med de mest spännande utmaningarna man kan
            tänka sig. Och jag lovar. Man ger allt. Och det gör jag här. Plus
            att jag gärna delar det med er.
          </p>

          <p>
            Följ oss på resan här. Vi har precis flyttat hem igen, tillbaka
            till vårt fina radhus i Älta, Nacka som ligger precis söder om
            Stockholm. Familjeäventyret i Miami må ha tagit slut, men nu
            påbörjar vi ett nytt känns det som. Att landa i att bo hemma i
            Sverige igen. Och det känns redan nu helt perfekt! Och bonusen är,
            att jag redan funnit en box att träna i,{" "}
            <ExternalLink href="https://crossfitunique.com/blog">
              CrossFit Unique
            </ExternalLink>
            . Just det, gick en tränar utbildning för Crossfit i Miami precis
            innan jag for, CF-L1, så en ny dröm kanske kommer slå in med. Att
            få jobba med just Crossfit.
          </p>

          <p>
            Ser fram emot att få dela med mig, för här får jag ner mina tankar,
            känslor och upplevelser i kombination med vår vardag.
          </p>

          <p className="font-serif italic text-stone-700 text-center pt-4">
            Jag är allt jag vill och kan vara. Mamma. Fru. Väninna. Crossfit
            girl. Student. Och lycklig.
          </p>

          <p className="text-center text-stone-700">
            Hemma-i-Sverige-igen-pirr på!
          </p>

          <p className="text-sm text-stone-500 italic text-center pt-2">
            Alla mina inlägg är utifrån mitt perspektiv och privata.
          </p>
        </div>

        <section className="mt-16 border-t border-stone-200 pt-10">
          <h2 className="font-serif text-2xl text-stone-900 mb-6 text-center">
            Lite bilder från resan
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galleryImages.map((src, i) => (
              <figure
                key={i}
                className="overflow-hidden rounded-md bg-stone-100 aspect-square"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-stone-200 pt-8 text-center">
          <p className="text-stone-600">Tack för att du läser.</p>
        </section>
      </article>
    </SiteLayout>
  );
}
