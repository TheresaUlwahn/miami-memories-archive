import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { posts, formatDate, getPresentationImage } from "../lib/posts";

import heroImage from "../assets/hero-miami.jpg";
import { ScrollToTop } from "../components/ScrollToTop";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Miami–Ulwarna · Ett digitalt arkiv" },
      {
        name: "description",
        content:
          "En berättelse i 56 inlägg om en flytt från Sverige till Miami — och tillbaka igen. Skriven mellan 2015 och 2018, arkiverad här.",
      },
      { property: "og:title", content: "Miami–Ulwarna · Ett digitalt arkiv" },
      {
        property: "og:description",
        content:
          "56 inlägg om en flytt från Sverige till Miami — och tillbaka. 2015–2018.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
  }),
});

function HomePage() {
  const [order, setOrder] = useState<"newest" | "oldest">("newest");
  const [year, setYear] = useState<string>("all");

  const years = useMemo(() => {
    const set = new Set(posts.map((p) => p.date.slice(0, 4)));
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, []);

  const filtered = useMemo(() => {
    const copy = year === "all"
      ? [...posts]
      : posts.filter((p) => p.date.startsWith(year));
    copy.sort((a, b) =>
      order === "newest"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date),
    );
    return copy;
  }, [order, year]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen w-full bg-cream text-ink">
      {/* Cinematic Hero */}
      <section className="relative h-[88vh] min-h-[560px] w-full flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Miami sunset"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-cream via-transparent to-black/30" />

        <header className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-16 py-8">
          <Link
            to="/"
            className="font-serif text-xl tracking-[0.25em] uppercase font-light text-white"
          >
            Miami–Ulwarna
          </Link>
          <nav className="flex gap-6 md:gap-10 text-white/90 text-xs md:text-sm tracking-widest uppercase">
            <Link to="/" className="hover:text-rose transition-colors">
              Hem
            </Link>
            <Link to="/om" className="hover:text-rose transition-colors">
              Om bloggen
            </Link>
          </nav>
        </header>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-5 leading-[1.05] font-light">
            Miami–Ulwarna
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-white/95 font-light leading-snug mb-5">
            Familjeäventyr, vardagsliv och drömmar.
            <br className="hidden md:block" />
            Efter Miami. Hemma igen.
          </p>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-white/75 font-light leading-relaxed tracking-wide">
            En berättelse skriven för att uppdatera familj och vänner långt bort — om vår resa västerut med våra Ulwungar. Långa dagboksinlägg fyllda med känslor, tankar och upplevelser, blandat med massor och återigen massor av bilder.
            <br className="hidden md:block" />
            <span className="block mt-3">Om en flytt från Sverige till Miami — och tillbaka igen. Skrivna mellan 2015 och 2018, arkiverade här.</span>
          </p>
        </div>

      </section>

      {/* Sticky Year + Sort Ribbon */}
      <div className="sticky top-0 z-30 bg-cream/95 backdrop-blur-md border-b border-sand py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 md:gap-8 overflow-x-auto">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold whitespace-nowrap">
              Arkiv
            </span>
            <div className="flex gap-4 md:gap-6 text-xs md:text-sm tracking-widest uppercase">
              <button
                onClick={() => setYear("all")}
                className={`pb-1 cursor-pointer transition-colors ${
                  year === "all"
                    ? "border-b-2 border-ink text-ink"
                    : "text-ink/50 hover:text-ink"
                }`}
              >
                Alla
              </button>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`pb-1 cursor-pointer transition-colors ${
                    year === y
                      ? "border-b-2 border-ink text-ink"
                      : "text-ink/50 hover:text-ink"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 text-[11px] uppercase tracking-widest items-center">
            <span className="text-ink/40">Sortera:</span>
            <button
              onClick={() => setOrder("newest")}
              className={`cursor-pointer transition-colors ${
                order === "newest"
                  ? "text-ink font-bold underline underline-offset-4 decoration-gold"
                  : "text-ink/40 hover:text-ink"
              }`}
            >
              Nyaste först
            </button>
            <button
              onClick={() => setOrder("oldest")}
              className={`cursor-pointer transition-colors ${
                order === "oldest"
                  ? "text-ink font-bold underline underline-offset-4 decoration-gold"
                  : "text-ink/40 hover:text-ink"
              }`}
            >
              Äldsta först
            </button>
          </div>
        </div>
      </div>

      {/* Magazine Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {filtered.length === 0 ? (
          <p className="text-center text-ink/60 py-20 font-serif italic text-xl">
            Inga inlägg från det året.
          </p>
        ) : (
          <>
            {featured && (
              <div className="mb-16 md:mb-24">
                <FeaturedCard post={featured} />
              </div>
            )}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-x-10 [column-fill:_balance]">
              {rest.map((post) => (
                <div key={post.slug} className="mb-16 md:mb-20 break-inside-avoid">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </>
        )}


        <div className="mt-24 md:mt-32 pt-10 border-t border-sand text-center">
          <p className="text-[11px] tracking-[0.4em] uppercase text-ink/50">
            {filtered.length} inlägg{year !== "all" ? ` från ${year}` : ""}
          </p>
        </div>
      </main>

      <footer className="border-t border-sand">
        <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-serif italic text-ink/60">
            Miami–Ulwarna · Ett digitalt arkiv · 2015–2018
          </p>
          <Link
            to="/om"
            className="text-[11px] uppercase tracking-[0.3em] text-ink/60 hover:text-gold transition-colors"
          >
            Om bloggen
          </Link>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}

function FeaturedCard({ post }: { post: (typeof posts)[number] }) {
  return (
    <article className="group lg:col-span-2">
      <Link to="/inlagg/$slug" params={{ slug: post.slug }} className="block">
        <div className="overflow-hidden bg-sand aspect-[16/9] mb-8 relative">
          {getPresentationImage(post) && (
            <img
              src={getPresentationImage(post)}
              alt=""
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 [filter:saturate(0.85)_contrast(1.05)_brightness(0.97)] group-hover:[filter:saturate(1)_contrast(1.02)_brightness(1)]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.visibility =
                  "hidden";
              }}
            />
          )}


          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/35 via-ink/5 to-gold/15 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-40" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/30" />
        </div>

        <div className="flex gap-4 md:gap-6 items-start">
          <span className="hidden md:block flex-none text-gold font-bold text-[10px] tracking-tighter rotate-180 [writing-mode:vertical-lr] pt-2">
            {formatShortDate(post.date)}
          </span>
          <div>
            <span className="md:hidden block text-[10px] tracking-[0.2em] text-rose uppercase mb-3">
              {formatDate(post.date)}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 group-hover:text-gold transition-colors leading-snug">
              {post.title}
            </h2>
            <p className="text-sm text-ink/70 leading-relaxed max-w-xl line-clamp-3">
              {firstParagraph(post.body)}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

function PostCard({ post }: { post: (typeof posts)[number] }) {
  return (
    <article className="group">
      <Link to="/inlagg/$slug" params={{ slug: post.slug }} className="block">
        <div className="overflow-hidden bg-sand mb-5 relative">
          {getPresentationImage(post) && (
            <img
              src={getPresentationImage(post)}
              alt=""
              loading="lazy"
              className="block w-full h-auto transition-all duration-700 group-hover:scale-[1.03] [filter:saturate(0.85)_contrast(1.05)_brightness(0.97)] group-hover:[filter:saturate(1)_contrast(1.02)_brightness(1)]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.visibility =
                  "hidden";
              }}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/35 via-ink/5 to-gold/15 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-40" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/30" />
        </div>


        <span className="block text-[10px] tracking-[0.2em] text-rose uppercase mb-2">
          {formatDate(post.date)}
        </span>
        <h2 className="font-serif text-2xl md:text-[1.7rem] group-hover:text-gold transition-colors leading-tight">

          {post.title}
        </h2>
        <p className="mt-3 text-sm text-ink/65 leading-relaxed line-clamp-2 font-light">
          {firstSentence(post.body)}
        </p>
      </Link>
    </article>
  );
}

function firstParagraph(body: string): string {
  return body.split(/\n\n+/)[0]?.replace(/\s+/g, " ").trim() ?? "";
}

function formatShortDate(iso: string): string {
  const d = new Date(iso);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAJ",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OKT",
    "NOV",
    "DEC",
  ];
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(2);
  return `${months[d.getMonth()]} ${dd} / ${yy}`;
}
