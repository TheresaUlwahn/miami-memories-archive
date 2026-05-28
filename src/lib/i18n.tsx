import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "sv" | "en";

const dict = {
  sv: {
    about: "Om",
    search: "Sök",
    language: "Språk",
    archive: "Arkiv",
    all: "Alla",
    sort: "Sortera",
    newestFirst: "Nyaste först",
    oldestFirst: "Äldsta först",
    noPostsYear: "Inga inlägg från det året.",
    postsCount: (n: number, y: string | null) => `${n} inlägg${y ? ` från ${y}` : ""}`,
    footerTagline: "Miami–Ulwarna · Ett digitalt arkiv · 2015–2018",
    backToArchive: "← Tillbaka till arkivet",
    comments: "Kommentarer",
    noComments: "Inga kommentarer",
    commentsCount: (n: number) => `${n} röster från då`,
    noCommentsOnPost: "Inga kommentarer på det här inlägget.",
    commentsClosed: "Kommentarsfältet är stängt — bloggen är arkiverad",
    searchPlaceholder: "Sök i alla inlägg…",
    searchEmpty: "Skriv något för att söka.",
    searchNoResults: "Inga träffar.",
    close: "Stäng",
    aboutChip: "Om bloggen",
    whoAmI: "Vem är jag",
  },
  en: {
    about: "About",
    search: "Search",
    language: "Language",
    archive: "Archive",
    all: "All",
    sort: "Sort",
    newestFirst: "Newest first",
    oldestFirst: "Oldest first",
    noPostsYear: "No posts from that year.",
    postsCount: (n: number, y: string | null) => `${n} posts${y ? ` from ${y}` : ""}`,
    footerTagline: "Miami–Ulwarna · A digital archive · 2015–2018",
    backToArchive: "← Back to archive",
    comments: "Comments",
    noComments: "No comments",
    commentsCount: (n: number) => `${n} voices from back then`,
    noCommentsOnPost: "No comments on this post.",
    commentsClosed: "Comments are closed — the blog is archived",
    searchPlaceholder: "Search all posts…",
    searchEmpty: "Type something to search.",
    searchNoResults: "No results.",
    close: "Close",
    aboutChip: "About the blog",
    whoAmI: "Who I am",
  },
} as const;

type Dict = typeof dict.sv;

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
} | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sv");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (stored === "sv" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const toggle = () => setLang(lang === "sv" ? "en" : "sv");

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t: dict[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
