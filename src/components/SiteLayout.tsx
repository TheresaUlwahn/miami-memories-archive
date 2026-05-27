import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SiteLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fbf7f1] text-stone-800 font-sans">
      <header className="border-b border-stone-200/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
          <Link to="/" className="font-serif text-2xl tracking-tight text-stone-900">
            Miami–Ulwarna
          </Link>
          <nav className="flex gap-6 text-sm text-stone-600">
            <Link to="/" className="hover:text-stone-900 [&.active]:text-stone-900">
              Hem
            </Link>
            <Link to="/om" className="hover:text-stone-900 [&.active]:text-stone-900">
              Om bloggen
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-12">{children ?? <Outlet />}</main>
      <footer className="border-t border-stone-200/80 mt-16">
        <div className="mx-auto max-w-3xl px-6 py-8 text-center text-xs text-stone-500">
          Ett digitalt arkiv · 2015–2018
        </div>
      </footer>
    </div>
  );
}
