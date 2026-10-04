# i18n — Serbian source catalog

This folder holds the **Serbian source catalog** of user-facing copy for future English (and other) translations.

## Files

| File | Role |
|------|------|
| `sr.json` | Complete inventory of Serbian strings currently shown in the app |
| `en.json` | *(not yet)* English translation mirroring the same keys |

## Structure overview

Top-level keys in `sr.json`:

- **`meta`** — HTML `<title>` values (home, team, each service page)
- **`ui`** — Chrome and shared UI: nav, buttons, forms, aria-labels, footer, header, lightbox, carousel, common CTAs, section eyebrows/titles from `render.ts`
- **`home`** — Index-only hero copy
- **`site`** — Contact facts and hours labels from `site.ts`
- **`about`**, **`services`**, **`servicePages`**, **`prices`**, **`faq`**, **`team`**, **`testimonials`**, **`advantages`**, **`stats`**, **`steps`**, **`quickLinks`** — Content modules from `src/data/*`
- **`gallery`** — About-gallery alt templates and before/after case labels (service gallery alts also live under each `servicePages[slug].gallery`)

`servicePages` is keyed by slug (e.g. `implantologija`) and includes full paragraphs, process steps, feature sections, and gallery alts.

## Consumption status

The app **does not yet load or apply** these files. The language switch in the top bar is a UI stub (`i18n TODO`). This catalog is a translation resource only — no runtime wiring yet.

## Adding `en.json` later

1. Copy `sr.json` → `en.json`.
2. Translate every string value; **keep the same key paths and array shapes**.
3. Leave non-translatable tokens as-is where appropriate (brand name, prices, phone numbers) or localize selectively.
4. When the app gains a real i18n layer, load `sr.json` / `en.json` by locale and replace the hardcoded / data-module strings.

Do not refactor the site to consume these files until that i18n work is intentionally started.
