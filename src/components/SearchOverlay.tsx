import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search as SearchIcon, X } from "lucide-react";
import { posts, formatDate } from "../lib/posts";
import { useLang } from "../lib/i18n";

type Props = { onClose: () => void };

export function SearchOverlay({ onClose }: Props) {
  const { t } = useLang();
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return posts
      .filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.body.toLowerCase().includes(term),
      )
      .slice(0, 30);
  }, [q]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-ink/80 backdrop-blur-sm flex items-start justify-center pt-20 md:pt-32 px-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-cream w-full max-w-2xl rounded-sm shadow-2xl border border-sand max-h-[75vh] flex flex-col"
      >
        <div className="flex items-center gap-3 border-b border-sand px-5 py-4">
          <SearchIcon size={18} className="text-ink/50 shrink-0" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 bg-transparent outline-none text-ink placeholder:text-ink/40 text-base"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="text-ink/50 hover:text-ink p-1"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {q.trim() === "" ? (
            <p className="text-ink/50 italic font-serif text-center py-10">
              {t.searchEmpty}
            </p>
          ) : results.length === 0 ? (
            <p className="text-ink/50 italic font-serif text-center py-10">
              {t.searchNoResults}
            </p>
          ) : (
            <ul className="divide-y divide-sand">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/inlagg/$slug"
                    params={{ slug: p.slug }}
                    onClick={onClose}
                    className="block px-5 py-4 hover:bg-sand/40 transition-colors"
                  >
                    <div className="text-[10px] tracking-[0.2em] text-rose uppercase mb-1">
                      {formatDate(p.date)}
                    </div>
                    <div className="font-serif text-lg text-ink leading-snug">
                      {p.title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
