import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "../components/SiteLayout";
import { ScrollToTop } from "../components/ScrollToTop";
import { Lightbox } from "../components/Lightbox";
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
      <article>
        <header className="mt-8 mb-12 text-center max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.3em] text-rose mb-4">
            {formatDate(post.date)}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-ink leading-[1.05] font-light">
            {post.title}
          </h1>
          <div className="mt-8 mx-auto w-16 h-px bg-gold/60" />
        </header>
        <PostBody body={post.body} fallbackImages={post.images} />


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
  | { kind: "image"; src: string; alt: string }
  | { kind: "image-group"; images: { src: string; alt: string }[] };

function parseBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  for (const para of body.split(/\n\n+/)) {
    const trimmed = para.trim();
    if (!trimmed) continue;
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

function groupBlocks(blocks: Block[]): Block[] {
  const out: Block[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.kind === "image") {
      const run: { src: string; alt: string }[] = [];
      while (i < blocks.length && blocks[i].kind === "image") {
        const ib = blocks[i] as Extract<Block, { kind: "image" }>;
        run.push({ src: ib.src, alt: ib.alt });
        i++;
      }
      if (run.length === 1) {
        out.push({ kind: "image", src: run[0].src, alt: run[0].alt });
      } else {
        out.push({ kind: "image-group", images: run });
      }
    } else {
      out.push(b);
      i++;
    }
  }
  return out;
}
function PostBody({ body, fallbackImages }: { body: string; fallbackImages: string[] }) {
  const blocks = groupBlocks(parseBlocks(body));
  const inline = hasInlineImages(body);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  let firstTextSeen = false;

  const imgProtect = {
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
    draggable: false,
    style: { WebkitUserSelect: "none", userSelect: "none", WebkitTouchCallout: "none" } as React.CSSProperties,
  };

  return (
    <div className="max-w-5xl mx-auto px-2 md:px-0">
      {!inline && fallbackImages[0] && (
        <figure className="mb-16 overflow-hidden bg-sand aspect-[16/9]">
          <img
            src={fallbackImages[0]}
            alt=""
            {...imgProtect}
            onClick={() => setLightbox({ src: fallbackImages[0], alt: "" })}
            className="w-full h-full object-cover cursor-zoom-in"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
            }}
          />
        </figure>
      )}

      <div className="text-ink/85 font-sans">
        {blocks.map((b, i) => {
          if (b.kind === "text") {
            const isFirst = !firstTextSeen;
            firstTextSeen = true;
            return (
              <p
                key={i}
                className={`max-w-[740px] mx-auto whitespace-pre-wrap leading-[1.85] text-[18px] md:text-[19px] mb-7 ${
                  isFirst ? "first-letter:font-serif first-letter:text-[5.5rem] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:text-gold" : ""
                }`}
              >
                {b.content}
              </p>
            );
          }
          if (b.kind === "image") {
            return (
              <figure key={i} className="my-12 md:my-16">
                <img
                  src={b.src}
                  alt={b.alt}
                  loading="lazy"
                  {...imgProtect}
                  onClick={() => setLightbox({ src: b.src, alt: b.alt })}
                  className="block w-full h-auto bg-sand cursor-zoom-in"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                  }}
                />
              </figure>
            );
          }
          // image-group — masonry via CSS columns (no vertical gaps)
          const cols = b.images.length >= 3 ? "sm:columns-3" : "sm:columns-2";
          return (
            <div key={i} className={`my-12 md:my-16 columns-1 ${cols} gap-3 md:gap-4 [column-fill:_balance]`}>
              {b.images.map((im, j) => (
                <figure key={j} className="mb-3 md:mb-4 break-inside-avoid bg-sand/40">
                  <img
                    src={im.src}
                    alt={im.alt}
                    loading="lazy"
                    {...imgProtect}
                    onClick={() => setLightbox({ src: im.src, alt: im.alt })}
                    className="block w-full h-auto cursor-zoom-in"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                    }}
                  />
                </figure>
              ))}
            </div>
          );
        })}
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

  );
}

