import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { ScrollToTop } from "../components/ScrollToTop";
import { getPost, formatDate, type Comment } from "../lib/posts";

export const Route = createFileRoute("/inlagg/$slug")({
  component: PostPage,
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} · Miami–Ulwarna` },
          {
            name: "description",
            content: loaderData.post.body.slice(0, 150),
          },
          {
            property: "og:title",
            content: `${loaderData.post.title} · Miami–Ulwarna`,
          },
          {
            property: "og:description",
            content: loaderData.post.body.slice(0, 150),
          },
          { property: "og:type", content: "article" },
          ...(loaderData.post.images[0]
            ? [
                { property: "og:image", content: loaderData.post.images[0] },
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:image", content: loaderData.post.images[0] },
              ]
            : []),
        ]
      : [],
  }),
});

function PostPage() {
  const { post } = Route.useLoaderData();

  return (
    <SiteLayout>
      <Link
        to="/"
        className="block text-[11px] uppercase tracking-[0.3em] text-ink/50 hover:text-gold transition-colors mb-8"
      >
        ← Tillbaka till arkivet
      </Link>
      <article className="max-w-3xl mx-auto">
        <header className="mt-8 mb-12 text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-rose mb-4">
            {formatDate(post.date)}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-ink leading-[1.05] font-light">
            {post.title}
          </h1>
          <div className="mt-8 mx-auto w-16 h-px bg-gold/60" />
        </header>
        <PostBody body={post.body} fallbackImages={post.images} />

        {/* Gallery only shown if body has no inline images */}
        {!hasInlineImages(post.body) && post.images.length > 1 && (
          <section className="mt-20">
            <h2 className="font-serif italic text-2xl text-ink/70 mb-8 text-center">
              Bildgalleri
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {post.images.slice(1).map((src: string, i: number) => (
                <figure
                  key={i}
                  className="overflow-hidden bg-sand aspect-[4/3] group"
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
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
        )}

        <section className="mt-24 border-t border-sand pt-12 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-ink mb-2">
            Kommentarer
          </h2>
          <p className="text-[11px] uppercase tracking-[0.3em] text-rose mb-10">
            {post.comments.length === 0
              ? "Inga kommentarer"
              : `${post.comments.length} röster från då`}
          </p>

          {post.comments.length === 0 ? (
            <p className="font-serif italic text-ink/50">
              Inga kommentarer på det här inlägget.
            </p>
          ) : (
            <ul className="space-y-8">
              {post.comments.map((c: Comment, i: number) => (
                <li key={i} className="border-l-2 border-gold/40 pl-5">
                  <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                    <span className="font-serif text-xl text-ink">
                      {c.author || "Anonym"}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-ink/40">
                      {c.date ? formatDate(c.date.slice(0, 10)) : ""}
                    </span>
                  </div>
                  <div className="text-ink/75 text-[15px] leading-relaxed whitespace-pre-wrap">
                    {c.content}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-12 text-[11px] uppercase tracking-[0.3em] text-ink/40 text-center">
            Kommentarsfältet är stängt — bloggen är arkiverad
          </p>
        </section>
      </article>
      <ScrollToTop />
    </SiteLayout>
  );
}

const IMG_RE = /!\[([^\]]*)\]\(([^)\s]+)\)/g;

function hasInlineImages(body: string): boolean {
  return /!\[[^\]]*\]\([^)]+\)/.test(body);
}

type Block =
  | { kind: "text"; content: string }
  | { kind: "image"; src: string; alt: string };

function parseBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  for (const para of body.split(/\n\n+/)) {
    const trimmed = para.trim();
    if (!trimmed) continue;
    // Split paragraph into text segments and images preserving order
    let lastIdx = 0;
    let textBuf = "";
    const flushText = () => {
      const t = textBuf.trim();
      if (t) blocks.push({ kind: "text", content: t });
      textBuf = "";
    };
    IMG_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = IMG_RE.exec(trimmed)) !== null) {
      textBuf += trimmed.slice(lastIdx, m.index);
      flushText();
      blocks.push({ kind: "image", alt: m[1], src: m[2] });
      lastIdx = m.index + m[0].length;
    }
    textBuf += trimmed.slice(lastIdx);
    flushText();
  }
  return blocks;
}

function PostBody({ body, fallbackImages }: { body: string; fallbackImages: string[] }) {
  const blocks = parseBlocks(body);
  const inline = hasInlineImages(body);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero image only if no inline images (legacy posts) */}
      {!inline && fallbackImages[0] && (
        <figure className="mb-14 -mx-6 md:mx-0 overflow-hidden bg-sand aspect-[16/10]">
          <img
            src={fallbackImages[0]}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
            }}
          />
        </figure>
      )}

      <div className="space-y-6 text-ink/85 leading-[1.85] text-[17px] md:text-[18px] font-sans">
        {blocks.map((b, i) =>
          b.kind === "text" ? (
            <p key={i} className="whitespace-pre-wrap">
              {b.content}
            </p>
          ) : (
            <figure key={i} className="my-10 -mx-6 md:mx-0">
              <img
                src={b.src}
                alt={b.alt}
                loading="lazy"
                className="block w-full h-auto bg-sand"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                }}
              />
              {b.alt && (
                <figcaption className="mt-3 text-center text-[12px] uppercase tracking-[0.2em] text-ink/50">
                  {b.alt}
                </figcaption>
              )}
            </figure>
          ),
        )}
      </div>
    </div>
  );
}

