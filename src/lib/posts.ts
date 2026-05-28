import postsData from "../data/posts.json";

export type Comment = {
  author: string;
  date: string;
  content: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  body: string;
  images: string[];
  comments: Comment[];
};

export function cleanTitle(title: string): string {
  return title.replace(/^\s*(miami|älta|alta)[–\-\s]*ulwarna\s*[:–\-]\s*/i, "").trim() || title;
}

export function firstBodyImage(body: string, fallback?: string[]): string | undefined {
  const m = body.match(/!\[[^\]]*\]\(([^)\s]+)\)/);
  return m?.[1] ?? fallback?.[0];
}

export const posts: Post[] = (postsData as Post[]).map((p) => ({
  ...p,
  title: cleanTitle(p.title),
}));


export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
