import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { getPost, formatDate } from "../lib/posts";

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
        ]
      : [],
  }),
});

function PostPage() {
  const { post } = Route.useLoaderData();

  return (
    <SiteLayout>
      <article>
        <Link
          to="/"
          className="text-xs uppercase tracking-wider text-stone-500 hover:text-stone-800"
        >
          ← Tillbaka till arkivet
        </Link>

        <header className="mt-6 mb-10 text-center border-b border-stone-200 pb-8">
          <div className="text-xs uppercase tracking-wider text-stone-500">
            {formatDate(post.date)}
          </div>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl text-stone-900 leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose-blog space-y-5 text-stone-800 leading-relaxed text-[17px]">
          {post.body.split("\n\n").map((para: string, i: number) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {post.images.length > 0 && (
          <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {post.images.map((src: string, i: number) => (
              <figure
                key={i}
                className="overflow-hidden rounded-md bg-stone-100 aspect-[4/3]"
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility =
                      "hidden";
                  }}
                />
              </figure>
            ))}
          </section>
        )}

        <section className="mt-16 border-t border-stone-200 pt-8">
          <h2 className="font-serif text-2xl text-stone-900 mb-6">
            {post.comments.length > 0
              ? `Kommentarer (${post.comments.length})`
              : "Kommentarer"}
          </h2>
          {post.comments.length === 0 ? (
            <p className="text-sm text-stone-500 italic">
              Inga kommentarer på det här inlägget.
            </p>
          ) : (
            <ul className="space-y-6">
              {post.comments.map((c: import("../lib/posts").Comment, i: number) => (
                <li
                  key={i}
                  className="rounded-md bg-stone-50 px-5 py-4 border border-stone-100"
                >
                  <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                    <span className="font-medium text-stone-800">
                      {c.author || "Anonym"}
                    </span>
                    <span className="text-xs text-stone-500">
                      {c.date ? formatDate(c.date.slice(0, 10)) : ""}
                    </span>
                  </div>
                  <div className="text-stone-700 text-[15px] leading-relaxed whitespace-pre-wrap">
                    {c.content}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-8 text-xs text-stone-400 italic">
            Kommentarsfältet är stängt — bloggen är arkiverad.
          </p>
        </section>
      </article>
    </SiteLayout>
  );
}
