import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LangProvider } from "../lib/i18n";

function NotFoundComponent() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ backgroundColor: "#f7f1e8" }}
    >
      <div className="max-w-lg text-center">
        <p
          className="text-sm tracking-[0.2em] uppercase"
          style={{ color: "#c89968", fontFamily: "'Inter', sans-serif" }}
        >
          Sidan hittades inte
        </p>
        <h1
          className="mt-3 text-6xl font-medium"
          style={{ color: "#2d2520", fontFamily: "'Fraunces', serif" }}
        >
          404
        </h1>
        <p
          className="mt-4 text-base leading-relaxed"
          style={{ color: "#5c4f42", fontFamily: "'Inter', sans-serif" }}
        >
          Sidan du letar efter finns inte längre eller har flyttats. Kanske
          hittar du den i arkivet istället.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:opacity-90"
            style={{
              backgroundColor: "#2d2520",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Tillbaka till arkivet
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ backgroundColor: "#f7f1e8" }}
    >
      <div className="max-w-md text-center">
        <p
          className="text-sm tracking-[0.2em] uppercase"
          style={{ color: "#c89968", fontFamily: "'Inter', sans-serif" }}
        >
          Ett fel uppstod
        </p>
        <h1
          className="mt-3 text-3xl font-medium"
          style={{ color: "#2d2520", fontFamily: "'Fraunces', serif" }}
        >
          Sidan kunde inte laddas
        </h1>
        <p
          className="mt-3 text-sm leading-relaxed"
          style={{ color: "#5c4f42", fontFamily: "'Inter', sans-serif" }}
        >
          Något gick fel när sidan skulle visas. Du kan prova att ladda om
          eller gå tillbaka till startsidan.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#2d2520", fontFamily: "'Inter', sans-serif" }}
          >
            Försök igen
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[#e8d5b7]/30"
            style={{
              borderColor: "#2d2520",
              color: "#2d2520",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Till startsidan
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Miami–Ulwarna · Ett digitalt arkiv om flytten till Miami" },
      {
        name: "description",
        content:
          "En avslutad blogg om en flytt från Sverige till Miami och tillbaka, 2015–2018.",
      },
      { property: "og:title", content: "Miami–Ulwarna · Ett digitalt arkiv om flytten till Miami" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Miami–Ulwarna · Ett digitalt arkiv om flytten till Miami" },
      { name: "description", content: "En personlig blogg och digitalt arkiv från en flytt mellan Sverige och Miami, 2015–2018." },
      { property: "og:description", content: "En personlig blogg och digitalt arkiv från en flytt mellan Sverige och Miami, 2015–2018." },
      { name: "twitter:description", content: "En personlig blogg och digitalt arkiv från en flytt mellan Sverige och Miami, 2015–2018." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/xgxmNEHoiDRleToZXHl0ekxWpeq2/social-images/social-1780576268364-Screenshot_2026-06-04_at_14.30.53.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/xgxmNEHoiDRleToZXHl0ekxWpeq2/social-images/social-1780576268364-Screenshot_2026-06-04_at_14.30.53.webp" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <Outlet />
      </LangProvider>
    </QueryClientProvider>
  );
}
