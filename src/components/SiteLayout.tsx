import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SiteLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans">
      <header className="border-b border-sand">
        <div className="mx-auto flex max-w-7xl items-baseline justify-between px-6 md:px-10 py-8">
          <Link
            to="/"
            className="font-serif text-2xl tracking-widest uppercase text-ink"
          >
            Miami–Ulwarna
          </Link>
          <nav className="flex gap-8 text-xs uppercase tracking-widest text-ink/80">
            <Link
              to="/om"
              className="hover:text-gold transition-colors [&.active]:text-gold"
            >
              Om
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-24">
        {children ?? <Outlet />}
      </main>
      <footer className="border-t border-sand mt-24">
        <div className="mx-auto max-w-7xl px-6 py-10 text-center text-[11px] uppercase tracking-[0.3em] text-ink/50">
          Miami–Ulwarna · Ett digitalt arkiv · 2015–2018
        </div>
      </footer>
    </div>
  );
}
