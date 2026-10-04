# i18n — multilingual resources

Locale catalogs and runtime for **sr** (default), **en**, **de**, **ru**.

## Files

| File | Role |
|------|------|
| `sr.json` / `en.json` / `de.json` / `ru.json` | Full string catalogs (same key tree) |
| `locales.ts` | Locale constants, labels, hreflang tags |
| `messages.ts` | Load catalog + active locale |
| `content.ts` | Merge catalogs with structural data (images, slugs, phones) |
| `cookie.ts` | `hos_locale` preference cookie + bot detection |
| `bootstrap.ts` | Init locale from URL, optional cookie redirect, document meta |

## URL strategy (SEO-friendly)

| Locale | URL |
|--------|-----|
| Serbian (default) | `/`, `/nas-tim.html`, `/usluge/...` |
| English | `/en/`, `/en/nas-tim.html`, `/en/usluge/...` |
| German | `/de/...` |
| Russian | `/ru/...` |

- Default locale has **no** `/sr` prefix (`x-default` → Serbian).
- Each HTML shell gets `lang`, `data-locale`, and `hreflang` alternate links (via `vite-plugin-i18n`).
- Generated `/en`, `/de`, `/ru` HTML files are created at dev/build time (gitignored).

## Language switcher

- Codes **SR | EN | DE | RU** in the top bar and mobile drawer.
- Choosing a language sets cookie `hos_locale` and navigates to the same page under that locale.
- Returning visitors who open a **default** (`/`) URL are redirected to the cookied locale (skipped for bots).

## SEO prerender

`npm run build` ends with `tsx scripts/prerender-dist.ts`, which fills every HTML file in `dist/` with:

- Localized body sections (`data-render`, service/team main content)
- `<title>`, meta description, canonical URL
- Open Graph / Twitter tags
- `hreflang` alternates
- JSON-LD `Dentist` schema on the home page
- Localized `aria-label` / skip-link text

Client JS still hydrates the same slots for interactivity. Crawlers see the full text in the raw HTML.

In **dev**, Vite also prerenders via `ssrLoadModule` when you open `/`, `/en/`, etc.

Set production origin with `VITE_SITE_ORIGIN` (used for canonical / hreflang / og:url).

## Editing copy

1. Edit the appropriate `*.json` (keep keys/array shapes identical across locales).
2. Structural things (image paths, phone `tel:` links, WhatsApp) stay in `src/data/*` and are merged in `content.ts`.
