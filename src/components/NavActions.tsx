import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Globe } from "lucide-react";
import { useLang } from "../lib/i18n";
import { SearchOverlay } from "./SearchOverlay";

type Variant = "light" | "dark";

export function NavActions({ variant = "dark" }: { variant?: Variant }) {
  const { t, lang, toggle } = useLang();
  const [searchOpen, setSearchOpen] = useState(false);

  const linkColor =
    variant === "light"
      ? "text-white/90 hover:text-rose"
      : "text-ink/80 hover:text-gold";
  const iconColor =
    variant === "light"
      ? "text-white/90 hover:text-rose"
      : "text-ink/80 hover:text-gold";

  return (
    <>
      <nav className="flex items-center gap-4 md:gap-7 text-xs md:text-sm tracking-widest uppercase">
        <Link to="/om" className={`transition-colors ${linkColor}`}>
          {t.about}
        </Link>
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label={t.search}
          className={`transition-colors ${iconColor}`}
        >
          <Search size={18} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-label={t.language}
          title={lang === "sv" ? "English" : "Svenska"}
          className={`flex items-center gap-1.5 transition-colors ${iconColor}`}
        >
          <Globe size={18} strokeWidth={1.5} />
          <span className="text-[10px] tracking-[0.2em] font-medium">
            {lang === "sv" ? "EN" : "SV"}
          </span>
        </button>
      </nav>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}
