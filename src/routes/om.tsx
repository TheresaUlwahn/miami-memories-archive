import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import theresaHero from "../assets/theresa-palma-mural.jpg";


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
  "/images/2018/07/IMG_5435.webp",
];

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
      className="underline decoration-gold/50 underline-offset-2 hover:decoration-gold hover:text-gold transition-colors"
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
          <p className="text-[11px] uppercase tracking-[0.3em] text-rose">
            Om bloggen
          </p>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl text-ink leading-[1.05] font-light">
            Vem är jag
          </h1>
          <p className="mt-4 font-serif text-2xl text-ink/70 italic">
            Theresa Ulwahn
          </p>
          <div className="mt-8 mx-auto w-16 h-px bg-gold/60" />
        </header>

        <figure className="mt-12 overflow-hidden bg-sand">
          <img
            src="/images/2018/07/IMG_5435.webp"
            alt="Theresa Ulwahn"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover"
          />
        </figure>

        <section className="mt-14">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-4">
            Idag
          </p>
          <p className="text-ink/85 leading-[1.85] text-[17px]">
            Den här bloggen skrevs mellan 2015 och 2018, mitt i flytten från
            Sverige till Miami och tillbaka. Idag bor jag i Palma de Mallorca
            och driver{" "}
            <ExternalLink href="https://fruulw.se">
              FruUlw Consulting
            </ExternalLink>{" "}
            — jag designar och bygger hemsidor, appar och digitala produkter.
            Tidigare har jag jobbat på King, Peltarion, Deloitte, Hilton och
            TUI. Arkivet här lever kvar för minnenas skull.
          </p>
        </section>

        <section className="mt-14 border-t border-sand pt-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-6">
            Då — skrivet 2018
          </p>
          <div className="space-y-6 text-ink/85 leading-[1.85] text-[17px]">
            <p>
              Reseledartjej från för länge sen. Med glimten i ögat och
              nyfikenheten att utforska och lära känna. Flyttade efter några år
              utomlands till huvudstaden med min man som även han jobbat ute för{" "}
              <ExternalLink href="http://www.fritidsresor.se">
                Fritidsresor
              </ExternalLink>
              . Väl hemma fann jag mig som handen i handsken i receptionen på
              dåvarande flaggskeppet Scandic Hotel Slussen, som blev början
              till en hotellkarriär där både jag och hotellet utvecklades
              samtidigt. Till ett{" "}
              <ExternalLink href="http://www.hiltonnordics.com/swe/sverige/stockholm/hilton-stockholm-slussen.html">
                Hilton
              </ExternalLink>{" "}
              med förstaklassig service och själv togs steget för min del att
              bli Supervisor Indiviual Reservations. Under åren som följde sa P
              och jag både ja till varandra, en liten Lord föddes och även en
              liten Duchess kom till världen. Lägenheten inne i stan byttes ut
              mot radhus i fina Älta Valley. Tiden kom för steget vidare vilket
              blev som Event Management på Deloitte. Som eventansvarig på en av
              Sveriges störta revisions- och konsultfirmor har senaste åtta
              åren varit utvecklande, utmanande men framför allt enormt roliga.
            </p>

            <p>
              Lämnade drömjobbet med stort D då ödet gett oss en spännande
              utmaning. En nystart. P blev placerad i Miami varav vårt liv
              formades och applicerades till en vardag i ett annat land. De tre
              åren som nu passerat har både varit en ren fröjd men även något
              av en berg-och-dalbana. Och nu är vi nykläckta hemflyttade till
              Sverige igen.
            </p>

            <p>
              Den andra resan jag redan är inne på, påbörjades för åtta år
              sedan med hjälp av{" "}
              <ExternalLink href="http://mamma.fit">
                PT Olga Rönnberg
              </ExternalLink>{" "}
              på{" "}
              <ExternalLink href="https://www.mammafitness.se/">
                Mamma Fitness
              </ExternalLink>{" "}
              — att komma i form efter barnen, och som bonus finna vägen till
              ett friskare och starkare jag. Då vi flyttade över till USA fann
              jag mig ensam på gymet, men så tipsades jag om crossfiten.{" "}
              <ExternalLink href="https://www.facebook.com/Palmetto-Bay-CrossFit-327635173970453/">
                Palmetto Bay Crossfit
              </ExternalLink>{" "}
              blev min hemmabox med den skönaste gemenskapen och de goaste
              träningskompisarna. För att lyckas vara den mamman som
              Ulwungarna behöver, ja inte tala om frun eller vännen för den
              delen, behöver man själv en rejäl skopa glädje, lycka, pepp och
              utmaning längs vägen.
            </p>

            <p className="font-serif italic text-ink text-center pt-4 text-xl">
              Jag är allt jag vill och kan vara. Mamma. Fru. Väninna. Crossfit
              girl. Student. Och lycklig.
            </p>

            <p className="text-center text-ink/70 font-serif italic">
              Hemma-i-Sverige-igen-pirr på!
            </p>

            <p className="text-[11px] uppercase tracking-[0.3em] text-ink/40 text-center pt-6">
              Alla inlägg är utifrån mitt perspektiv och privata
            </p>
          </div>
        </section>

        <section className="mt-20 border-t border-sand pt-12">
          <h2 className="font-serif text-3xl text-ink mb-2 text-center">
            Lite bilder från resan
          </h2>
          <p className="text-[11px] uppercase tracking-[0.3em] text-rose mb-10 text-center">
            Glimtar från arkivet
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galleryImages.map((src, i) => (
              <figure
                key={i}
                className="overflow-hidden bg-sand aspect-square group"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility =
                      "hidden";
                  }}
                />
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-sand pt-10 text-center">
          <p className="font-serif italic text-xl text-ink/70">
            Tack för att du läser.
          </p>
        </section>
      </article>
    </SiteLayout>
  );
}

