# Miami–Ulwarna

Ett digitalt arkiv av bloggen *Miami–Ulwarna* (2015–2018) — en berättelse i 56 inlägg om en flytt från Sverige till Miami, och tillbaka igen.

Bloggen är avslutad. Den här sajten är ett varsamt arkiv: alla inlägg, bilder och kommentarer samlade på ett ställe så att de inte försvinner.

## Vad finns här

- **Hem** — kronologisk lista över alla inlägg (nyaste först som standard, går att vända)
- **Inläggssida** — titel, datum, brödtext, bildgalleri och kommentarer
- **Om bloggen** — kort om bakgrunden

## Så är sajten byggd

- Vite + React + TanStack Router + Tailwind
- Inläggen ligger som ren data i `src/data/posts.json`
- Bilderna ligger i `public/images/ÅÅÅÅ/MM/...`
- Typsnitt: Fraunces (rubriker, serif) + Inter (brödtext, sans-serif)

## Lägga till / ändra inlägg

Allt innehåll kommer från `src/data/posts.json`. Varje inlägg ser ut så här:

```json
{
  "slug": "unik-url-bit",
  "title": "Titel",
  "date": "2017-06-12",
  "body": "Brödtext...\n\nNytt stycke efter tom rad.",
  "images": ["/images/2017/06/bild1.jpg"],
  "comments": [
    { "author": "Namn", "date": "2017-06-13", "content": "Kommentar" }
  ]
}
```

Lägg bilderna i motsvarande mapp under `public/images/`.

## Köra lokalt

```bash
bun install
bun run dev
```

Sajten öppnas på `http://localhost:8080`.
