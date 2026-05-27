import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "../components/SiteLayout";
import { posts, formatDate } from "../lib/posts";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Miami–Ulwarna · Ett digitalt arkiv" },
      {
        name: "description",
        content:
          "En avslutad blogg om en flytt från Sverige till Miami och tillbaka, 2015–2018.",
      },
    ],
  }),
});

function HomePage() {
  const [order, setOrder] = useState<"newest" | "oldest">("newest");

  const sorted = useMemo(() => {
    const copy = [...posts];
    copy.sort((a, b) =>
      order === "newest"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date),
    );
    return copy;
  }, [order]);

  return (
    <SiteLayout>
      <section className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 leading-tight">
          Miami–Ulwarna
        </h1>
        <p className="mt-3 text-stone-600 max-w-xl mx-auto">
          En berättelse i 56 inlägg om en flytt från Sverige till Miami — och
          tillbaka igen. Skriven mellan 2015 och 2018, arkiverad här.
        </p>
      </section>

      <div className="mb-6 flex items-center justify-between border-b border-stone-200 pb-3">
        <h2 className="font-serif text-lg text-stone-700">Alla inlägg</h2>
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <span>Sortera:</span>
          <button
            onClick={() => setOrder("newest")}
            className={`px-2 py-1 rounded ${
              order === "newest"
                ? "bg-stone-800 text-stone-50"
                : "hover:bg-stone-100"
            }`}
          >
            Nyaste först
          </button>
          <button
            onClick={() => setOrder("oldest")}
            className={`px-2 py-1 rounded ${
              order === "oldest"
                ? "bg-stone-800 text-stone-50"
                : "hover:bg-stone-100"
            }`}
          >
            Äldsta först
          </button>
        </div>
      </div>

      <ul className="divide-y divide-stone-200">
        {sorted.map((post) => (
          <li key={post.slug}>
            <Link
              to="/inlagg/$slug"
              params={{ slug: post.slug }}
              className="group flex gap-5 py-5 items-center"
            >
              <div className="h-20 w-20 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-md bg-stone-100">
                {post.images[0] ? (
                  <img
                    src={post.images[0]}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.visibility =
                        "hidden";
                    }}
                  />
                ) : null}
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-stone-500">
                  {formatDate(post.date)}
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-stone-900 group-hover:text-stone-600 transition-colors">
                  {post.title}
                </h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SiteLayout>
  );
}
