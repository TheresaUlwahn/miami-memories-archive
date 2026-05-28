import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { NavActions } from "./NavActions";
import { useLang } from "../lib/i18n";

export function SiteLayout({ children }: { children?: ReactNode }) {
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-cream text-ink font-sans">
      <header className="border-b border-sand">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 py-8">
          <Link
            to="/"
            className="font-serif text-2xl tracking-widest uppercase text-ink"
          >
            Miami–Ulwarna
          </Link>
          <NavActions variant="dark" />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-24">
        {children ?? <Outlet />}
      </main>
      <footer className="border-t border-sand mt-24">
        <div className="mx-auto max-w-7xl px-6 py-10 text-center text-[11px] uppercase tracking-[0.3em] text-ink/50">
          {t.footerTagline}
        </div>
      </footer>
    </div>
  );
}
