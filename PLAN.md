# Plan izrade web sajta — Premium stomatološka ordinacija

> **Namena dokumenta:** ovo je kompletna, izvršna specifikacija. Implementator treba da prati
> dokument od sekcije 1 do sekcije 15 redom i ne mora ništa da izmišlja — palete, tekstovi,
> nazivi fajlova, klase i ponašanja komponenti su definisani ovde.
>
> **Scope za ovu fazu:** samo frontend / inicijalni izgled. **BEZ backenda. BEZ SEO optimizacije.
> BEZ CMS-a. BEZ analitike.** Forma ne šalje podatke nigde (mock submit).

---

## 1. Cilj i referentni sajtovi

Napraviti **one-page (single page) premium prezentacioni sajt** za stomatološku ordinaciju,
po funkcionalnostima i strukturi inspirisan:

| Referenca | Šta uzimamo |
|---|---|
| `ordinacijacvejanovic.com` | bogata lista usluga, "Zubi u 3 sata" spotlight, dentalni turizam sa apartmanima, cenovnik, video/foto galerija, garancija, iskustva pacijenata, sticky kontakt (telefon/WhatsApp/Viber), jezički prekidač |
| `stamenkovicdentalclinic.com` | čist luksuzni izgled, slogan "Osmeh koji govori", 3 koraka do osmeha, grid od 8 usluga sa slikama, before/after galerija, forma za zakazivanje (ime / telefon / email / usluga), dropdown "Usluge" u navigaciji |

**Ključna razlika koju pravimo:** vizuelno mora izgledati **skuplje i čistije od obe reference** —
manje elemenata na ekranu, više praznog prostora, tamne "petrol" sekcije sa zlatnim detaljima,
serifni display font, suptilne animacije pri skrolu.

---

## 2. Tehnologije (fiksno)

- **HTML** (semantički, jedan glavni `index.html`)
- **TypeScript** (strict mode, ES modules, bez frameworka — vanilla TS komponente)
- **Tailwind CSS v3.4** (utility-first, sa custom temom u `tailwind.config.ts`)
- **Vite 5** kao dev server i bundler
- Google Fonts (2 familije, preload)
- Bez jQuery, bez React/Vue, bez UI biblioteka, bez animacionih biblioteka (GSAP/AOS) —
  sve animacije preko CSS + `IntersectionObserver`.

### 2.1 Setup komande

```bash
npm create vite@latest . -- --template vanilla-ts
npm install
npm install -D tailwindcss@3.4.17 postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

### 2.2 `package.json` (skripte)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview"
  }
}
```

### 2.3 `tsconfig.json` (bitni delovi)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noImplicitAny": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  },
  "include": ["src"]
}
```

---

## 3. Struktura fajlova

```
dental/
├─ index.html                  # ceo sajt (one-pager)
├─ package.json
├─ tsconfig.json
├─ tailwind.config.ts
├─ postcss.config.js
├─ public/
│  ├─ img/                     # slike (vidi sekciju 12)
│  └─ favicon.svg
└─ src/
   ├─ main.ts                  # entry — importuje i inicijalizuje sve module
   ├─ style.css                # Tailwind direktive + custom @layer slojevi
   ├─ types.ts                 # svi tipovi na jednom mestu
   ├─ data/
   │  ├─ services.ts           # 8 usluga
   │  ├─ steps.ts              # 3 koraka
   │  ├─ stats.ts              # brojači
   │  ├─ advantages.ts         # "Zašto mi"
   │  ├─ testimonials.ts       # iskustva pacijenata
   │  ├─ gallery.ts            # galerija + before/after
   │  ├─ prices.ts             # cenovnik po kategorijama
   │  ├─ faq.ts                # pitanja i odgovori
   │  ├─ tourism.ts            # dentalni turizam
   │  ├─ blog.ts               # 3 članka
   │  └─ site.ts               # NAP podaci: telefon, adresa, email, radno vreme, social
   ├─ components/
   │  ├─ header.ts             # sticky header, mega-dropdown, mobile drawer
   │  ├─ reveal.ts             # scroll-reveal animacije
   │  ├─ counters.ts           # animirani brojači
   │  ├─ carousel.ts           # generički slajder (iskustva, spotlight)
   │  ├─ beforeAfter.ts        # pre/posle klizač
   │  ├─ accordion.ts          # FAQ + cenovnik
   │  ├─ lightbox.ts           # galerija fullscreen
   │  ├─ tabs.ts               # tabovi za cenovnik/usluge
   │  ├─ form.ts               # validacija + mock submit
   │  ├─ floatingActions.ts    # FAB pozovi/WhatsApp/Viber + back-to-top
   │  └─ langSwitch.ts         # SR/EN prekidač (samo vizuelno u ovoj fazi)
   └─ lib/
      ├─ dom.ts               # $ , $$ , on() helperi
      ├─ render.ts            # helperi za renderovanje HTML stringa iz data/
      └─ motion.ts            # prefers-reduced-motion guard, easing konstante
```

**Pravilo:** sav sadržaj (tekstovi, cene, imena usluga) ide u `src/data/*.ts` kao tipizirani
niz objekata, a sekcije se renderuju iz tih podataka u DOM. U `index.html` ostaju samo
skeleti sekcija sa `id`-jem i praznim kontejnerom (`<div data-render="services"></div>`).
Izuzetak: hero i footer se pišu direktno u HTML.

---

## 4. Dizajn sistem — "Petrol & Champagne"

Ovo je izabrana paleta. **Ne menjati je.** Kombinacija duboke petrol-teal (poverenje, medicina,
čistoća) + šampanj zlato (luksuz) + ivory (mekoća) je ono što daje "mega premium" osećaj i
razlikuje sajt od tipičnih plavo-belih stomatoloških sajtova.

### 4.1 Boje

| Token | HEX | Upotreba |
|---|---|---|
| `ink.950` | `#04141A` | najtamnija pozadina, footer |
| `ink.900` | `#071F26` | tamne sekcije, overlay baza |
| `petrol.800` | `#0B2E36` | kartice na tamnom, header solid |
| `petrol.700` | `#0E3F47` | **primarna brend boja** |
| `petrol.600` | `#12545F` | hover primarne |
| `petrol.500` | `#176B77` | ikonice, linkovi na svetlom |
| `mint.300` | `#9FD4CE` | suptilni akcenat, glow, aktivne linije |
| `mint.100` | `#DCEDEA` | vrlo svetle pozadine kartica |
| `gold.600` | `#B08E4F` | hover zlatnog dugmeta |
| `gold.500` | `#C8A96B` | **akcent boja** — CTA, hairline, ikonice, brojevi |
| `gold.300` | `#DCC08C` | tekst akcenta na tamnom |
| `gold.100` | `#F2E7CE` | zlatne pozadine/bedževi |
| `ivory.50` | `#FBF9F5` | **glavna pozadina sajta** |
| `ivory.100` | `#F5F1EA` | alternirajuća sekcija |
| `ivory.200` | `#EAE4D9` | bordere na svetlom |
| `stone.500` | `#8A8579` | sekundarni tekst na svetlom |
| `stone.300` | `#B9B4A9` | sekundarni tekst na tamnom |

**Kontrast pravila:**
- tekst na `ivory.50` → `ink.900` (naslovi) / `stone.500` (paragrafi, ali min. `#6F6A5F` za body — koristi `stone.500` samo za labele)
- tekst na `ink.900` → `ivory.50` (naslovi) / `stone.300` (paragrafi)
- `gold.500` NIKAD kao boja body teksta na `ivory` (loš kontrast) — samo naslovi 20px+, ikonice, borderi, dugmad

### 4.2 Tipografija

- **Display / naslovi:** `Cormorant Garamond` (weights 400, 500, 600) — elegantan visoki kontrast
- **Body / UI:** `Inter` (weights 300, 400, 500, 600)
- **Eyebrow labele:** Inter, 11–12px, `uppercase`, `tracking-[0.28em]`, boja `gold.500`

Skala (mobile → desktop):

| Element | Mobile | Desktop | Klasa |
|---|---|---|---|
| Hero H1 | 40px | 92px | `text-[2.5rem] leading-[1.05] md:text-7xl lg:text-[5.75rem]` |
| H2 sekcija | 30px | 56px | `text-3xl md:text-5xl lg:text-[3.5rem]` |
| H3 kartica | 20px | 24px | `text-xl md:text-2xl` |
| Body | 15px | 17px | `text-[0.9375rem] md:text-[1.0625rem] leading-relaxed` |
| Eyebrow | 11px | 12px | `text-[11px] md:text-xs tracking-[0.28em] uppercase` |

Naslovi: `font-display font-light` ili `font-normal` (NIKAD bold — bold ubija luksuzni izgled).
Body: `font-sans font-light` za velike paragrafe, `font-normal` za male.

### 4.3 Prostor, radijusi, senke

- Vertikalni ritam sekcija: `py-20 md:py-28 lg:py-36`
- Kontejner: `mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12`
- Radijusi: kartice `rounded-2xl`, slike `rounded-[1.75rem]`, dugmad `rounded-full`, inputi `rounded-xl`
- Senke (mekane, nikad crne):
  - `shadow-soft` = `0 10px 40px -12px rgba(7,31,38,0.14)`
  - `shadow-lift` = `0 26px 60px -20px rgba(7,31,38,0.28)`
  - `shadow-gold` = `0 18px 40px -16px rgba(200,169,107,0.45)`
- Hairline separator: `h-px bg-gradient-to-r from-transparent via-gold-500/45 to-transparent`

### 4.4 Signature vizuelni detalji (ovo pravi "wow")

1. **Zlatna hairline linija** iznad svakog eyebrow labela (širina 40px, `bg-gold-500`).
2. **Noise/grain overlay** preko tamnih sekcija — `opacity-[0.035]`, inline SVG feTurbulence, `pointer-events-none`.
3. **Radijalni glow** u tamnim sekcijama: `bg-[radial-gradient(60%_50%_at_50%_0%,rgba(159,212,206,0.16),transparent_70%)]`.
4. **Slike u "arch" formi** (gornja ivica polukružna) za portrete doktora i hero kolaž:
   `rounded-t-[9999px] rounded-b-[2rem]` — vrlo prepoznatljiv premium potpis.
5. **Brojevi sekcija** u uglu (`01 — Usluge`) sitnim monospace-like Inter tekstom sa `gold.500/50`.
6. **Hover na karticama:** slika `scale-[1.06]` u 700ms `cubic-bezier(.16,1,.3,1)`, border prelazi u `gold.500/40`, kartica se podiže `-translate-y-1.5`.
7. **Underline animacija** na nav linkovima: pseudo `::after` linija `gold.500`, `scale-x-0 → 100`, origin left.
8. **Staggered reveal:** elementi ulaze `opacity-0 translate-y-6 blur-[2px]` → `opacity-100 translate-y-0 blur-0`, delay 80ms po elementu.

### 4.5 `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,js}'],
  theme: {
    extend: {
      colors: {
        ink:     { 950: '#04141A', 900: '#071F26' },
        petrol:  { 800: '#0B2E36', 700: '#0E3F47', 600: '#12545F', 500: '#176B77' },
        mint:    { 300: '#9FD4CE', 100: '#DCEDEA' },
        gold:    { 600: '#B08E4F', 500: '#C8A96B', 300: '#DCC08C', 100: '#F2E7CE' },
        ivory:   { 50: '#FBF9F5', 100: '#F5F1EA', 200: '#EAE4D9' },
        stone:   { 500: '#8A8579', 300: '#B9B4A9' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(7,31,38,0.14)',
        lift: '0 26px 60px -20px rgba(7,31,38,0.28)',
        gold: '0 18px 40px -16px rgba(200,169,107,0.45)',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: { container: '1280px' },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-zoom': {
          '0%':   { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'slow-zoom': 'slow-zoom 18s ease-out both',
        shimmer: 'shimmer 2.6s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
```

### 4.6 `src/style.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
  body {
    @apply bg-ivory-50 text-ink-900 font-sans font-light antialiased overflow-x-hidden;
  }
  h1, h2, h3, h4 { @apply font-display font-light tracking-[-0.01em]; }
  ::selection { @apply bg-gold-500/30; }
  /* scrollbar */
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { @apply bg-ivory-100; }
  ::-webkit-scrollbar-thumb { @apply bg-petrol-700/40 rounded-full; }
}

@layer components {
  .container-lux { @apply mx-auto w-full max-w-container px-5 sm:px-8 lg:px-12; }

  .btn { @apply inline-flex items-center justify-center gap-2.5 rounded-full
         text-[13px] font-medium uppercase tracking-[0.16em] transition-all duration-500 ease-lux; }
  .btn-gold { @apply btn bg-gold-500 text-ink-900 px-8 py-4
              hover:bg-gold-600 hover:shadow-gold hover:-translate-y-0.5; }
  .btn-dark { @apply btn bg-petrol-700 text-ivory-50 px-8 py-4
              hover:bg-petrol-600 hover:-translate-y-0.5 hover:shadow-lift; }
  .btn-ghost { @apply btn border border-current/25 px-8 py-4
               hover:border-gold-500 hover:text-gold-500; }

  .eyebrow { @apply inline-flex items-center gap-3 text-[11px] md:text-xs uppercase
             tracking-[0.28em] text-gold-500 font-medium; }
  .eyebrow::before { content: ''; @apply h-px w-10 bg-gold-500; }

  .hairline { @apply h-px w-full bg-gradient-to-r from-transparent via-gold-500/45 to-transparent; }

  .card-lux { @apply group relative overflow-hidden rounded-2xl border border-ivory-200
              bg-white/70 transition-all duration-700 ease-lux
              hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-lift; }

  .arch { @apply overflow-hidden rounded-t-[9999px] rounded-b-[2rem]; }

  .field { @apply w-full rounded-xl border border-ivory-200 bg-white/80 px-5 py-4
           text-[15px] text-ink-900 placeholder:text-stone-500/70
           focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20
           transition-colors duration-300; }

  .dark-section { @apply relative overflow-hidden bg-ink-900 text-ivory-50; }
}

@layer utilities {
  .reveal { opacity: 0; transform: translateY(24px); filter: blur(2px);
            transition: opacity .9s cubic-bezier(.16,1,.3,1),
                        transform .9s cubic-bezier(.16,1,.3,1),
                        filter .9s ease; }
  .reveal.is-in { opacity: 1; transform: none; filter: none; }
  .text-balance { text-wrap: balance; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
  .reveal { opacity: 1; transform: none; filter: none; }
  html { scroll-behavior: auto; }
}
```

---

## 5. Struktura stranice (sekcije, po redu)

Svaka sekcija ima `id` (za nav ankere) i `data-render` kontejner gde TS ubacuje sadržaj.

| # | ID | Naziv | Pozadina | Ključni sadržaj |
|---|---|---|---|---|
| 0 | — | Top utility bar | `petrol.700` | telefon, radno vreme, social ikonice, SR/EN |
| 1 | — | Header (sticky) | transparent → `ink.900/90` blur | logo, nav, dropdown Usluge, CTA |
| 2 | `pocetna` | Hero | tamna slika + gradient | H1, podnaslov, 2 CTA, 3 trust bedža |
| 3 | `statistika` | Statistika (brojači) | `ivory.100` | 4 animirana brojača |
| 4 | `proces` | 3 koraka do osmeha | `ivory.50` | 3 numerisana koraka sa linijom |
| 5 | `o-nama` | O ordinaciji / doktor | `ivory.50` | split: tekst + arch portret + potpis |
| 6 | `usluge` | Usluge | `ivory.100` | grid 8 kartica sa slikama |
| 7 | `spotlight` | "Zubi u 3 sata" spotlight | `ink.900` tamna | velika slika, 4 benefita, CTA |
| 8 | `nas-rad` | Pre / posle | `ivory.50` | before-after klizač (3 slučaja) + galerija |
| 9 | `zasto-mi` | Zašto pacijenti biraju nas | `petrol.700` tamna | 7 prednosti + garancija bedž |
| 10 | `iskustva` | Iskustva pacijenata | `ivory.100` | karusel recenzija (5 zvezdica) |
| 11 | `turizam` | Dentalni turizam | `ink.950` tamna | 4 kartice + apartmani |
| 12 | `cenovnik` | Cenovnik | `ivory.50` | tabovi + akordeon tabele |
| 13 | `faq` | Česta pitanja | `ivory.100` | akordeon, 8 pitanja |
| 14 | `blog` | Saveti / blog | `ivory.50` | 3 kartice članaka |
| 15 | — | CTA banner | `gold.100` ili petrol gradient | veliki poziv na akciju |
| 16 | `kontakt` | Kontakt | `ivory.50` + mapa | forma, NAP info, radno vreme, mapa |
| 17 | — | Footer | `ink.950` | 4 kolone, social, credits |
| 18 | — | Floating actions | fixed | FAB pozovi/WhatsApp/Viber + back-to-top |

---

## 6. Detaljna specifikacija po sekcijama

### 6.0 Top utility bar
- Vidljiv samo na `lg:` i više (`hidden lg:flex`), visina 44px, `bg-petrol-700 text-ivory-50/85 text-[13px]`.
- Levo: `Pon–Pet 08:00–20:00 · Sub 09:00–14:00`
- Centar/desno: `☎ 011 / 123-4567` (tel: link), `✉ info@ordinacija.rs` (mailto:)
- Krajnje desno: social ikonice (Instagram, Facebook, TikTok, YouTube) 16px, `hover:text-gold-500` + separator + `SR | EN` prekidač.
- Nestaje kad se skroluje (header se "podiže" preko njega — vidi 6.1).

### 6.1 Header
- `position: fixed; top:0; z-50`. Dve faze:
  - **top state:** `bg-transparent`, tekst `ivory.50`, logo bela verzija, visina 96px.
  - **scrolled state** (`scrollY > 80`): dodaj klase `bg-ink-900/85 backdrop-blur-xl border-b border-white/10 shadow-lift`, visina 72px, tranzicija 500ms.
- Levo: logo — tekstualni lockup: `font-display text-2xl tracking-wide` naziv + tanka zlatna linija + `text-[10px] tracking-[0.3em] uppercase` podnaslov `STOMATOLOŠKA ORDINACIJA`.
- Centar (desktop, `hidden lg:flex gap-9`): `Početna · Usluge ▾ · Naš rad · Cenovnik · O nama · Dentalni turizam · Iskustva · Kontakt`
- **Dropdown "Usluge"** = mega-menu panel: `absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[720px] rounded-2xl bg-ivory-50 p-8 shadow-lift grid grid-cols-2 gap-x-10 gap-y-3`. Svaki item: ikonica u `gold.100` krugu + naziv + jednolinijski opis. Otvara se na `mouseenter` sa 120ms delay-om na zatvaranje, i na `click` (tastatura/touch), zatvara se na `Escape` i klik izvan.
- Desno: `btn-gold` sa tekstom `Zakaži pregled` (desktop) + hamburger (`lg:hidden`).
- **Mobile drawer:** full-screen overlay `bg-ink-900`, slide-in sa desne strane (`translate-x-full → 0`, 500ms ease-lux). Sadrži: velike linkove (`font-display text-3xl`, staggered fade-in po 60ms), akordeon za Usluge, telefon, radno vreme, social, `btn-gold` na dnu. Zaključava `body` skrol (`overflow-hidden`), zatvara se na klik linka, `Escape` i na klik X ikonice. Fokus trap opciono.
- Aktivna sekcija u navu: `IntersectionObserver` po sekcijama → dodaj `text-gold-500` + aktivnu underline.

### 6.2 Hero
- `min-h-[100svh]` (koristi `svh` zbog mobilnih browsera!), `relative flex items-center`.
- Pozadina: slika ordinacije/osmeha, `object-cover`, `animate-slow-zoom` (Ken Burns 18s).
- Overlay: 2 sloja — `bg-gradient-to-r from-ink-950/92 via-ink-900/70 to-ink-900/30` + `bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40`.
- Grain overlay + radijalni mint glow gore.
- Sadržaj levo poravnat, `max-w-[720px]`:
  - eyebrow: `PREMIUM DENTALNA NEGA U BEOGRADU`
  - H1: **`Osmeh koji`** + novi red `<span class="italic text-gold-300">govori</span>` — italic + zlatna na drugoj reči je signature detalj.
  - paragraf (max-w 46ch): `Estetska stomatologija, implantologija i bezbolna terapija u sedaciji. Preko 20 godina iskustva, digitalna dijagnostika i garancija na svaki naš rad.`
  - dugmad: `btn-gold` → `Zakaži besplatnu konsultaciju` (scroll na #kontakt) i `btn-ghost` (border/tekst `ivory-50`) → `Pogledajte naš rad` (scroll na #nas-rad).
  - trust red (`flex flex-wrap gap-x-8 gap-y-3 pt-10 border-t border-white/10 mt-12`): 3 itema sa zlatnom ikonicom: `20+ godina iskustva` · `5 godina garancije` · `Digitalna 3D dijagnostika`
- Dole desno (desktop): mala "arch" slika doktora sa zlatnim borderom, `absolute`, `hidden xl:block`.
- Dole centar: scroll indikator — vertikalna linija 48px sa animiranom zlatnom točkom + tekst `SKROLUJTE`.
- **Mobile:** H1 40px, dugmad `w-full` jedno pod drugim, trust red horizontalni scroll (`no-scrollbar`), overlay tamniji (`from-ink-950/95`).

### 6.3 Statistika (brojači)
- `bg-ivory-100`, `py-16 md:py-20`, grid `grid-cols-2 lg:grid-cols-4 gap-y-10`, vertikalni divideri `lg:divide-x divide-ivory-200`.
- Podaci (`src/data/stats.ts`): `20+` Godina iskustva · `12.000+` Zadovoljnih pacijenata · `4.500+` Postavljenih implantata · `4,9/5` Ocena pacijenata
- Broj: `font-display text-5xl md:text-6xl text-petrol-700`, sufiks `+` u `gold.500`. Labela ispod: eyebrow stil, `text-stone-500`.
- Animacija: brojanje od 0 do vrednosti kad sekcija uđe u viewport (`counters.ts`), 1600ms, `easeOutExpo`, formatiranje sa `sr-RS` locale (točka kao separator hiljada), pokreće se **samo jednom**.

### 6.4 Tri koraka do osmeha
- eyebrow `KAKO POČINJEMO` + H2 `Tri koraka do vašeg novog osmeha`
- Grid `md:grid-cols-3 gap-8`, sa **spojnom linijom** iza kartica na desktopu: `absolute top-[52px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent` (`hidden md:block`).
- Svaki korak: krug 104px `border border-gold-500/40 bg-ivory-50` sa brojem `01/02/03` u `font-display text-2xl text-gold-500`; naslov H3; paragraf.
- Tekstovi:
  1. **Besplatna konsultacija** — Dođete na pregled bez obaveze. Analiziramo stanje, radimo 3D snimak i slušamo šta želite.
  2. **Individualni plan terapije** — Dobijate jasan plan, redosled intervencija, vremenski okvir i tačnu cenu — bez skrivenih troškova.
  3. **Vaš novi osmeh** — Terapiju izvodimo u dogovorenim terminima, bezbolno, sa kontrolama i garancijom nakon završetka.

### 6.5 O ordinaciji / doktor
- Layout `lg:grid-cols-2 gap-16 items-center`.
- Levo: kolaž — velika `arch` slika doktora + manja kvadratna slika ordinacije `absolute -bottom-10 -right-6 w-[45%] rounded-2xl border-4 border-ivory-50 shadow-lift` + zlatni bedž krug `20 GODINA ISKUSTVA` rotiran `-rotate-12`.
- Desno: eyebrow `O NAMA` → H2 `Posvećenost svakom pacijentu, bez kompromisa` → 2 paragrafa → mini-lista od 3 checkmark itema → potpis (`font-display italic text-2xl`) + ime i titula `dr Marko Marković, spec. stomatološke protetike` → `btn-dark`.
- Paragrafi:
  > Više od dve decenije verujemo u jedno: stomatologija ne treba da boli, ne treba da se odlaže i ne treba da bude nejasna. Zato svakom pacijentu pristupamo sa punom pažnjom, jasnim planom i tehnologijom koja skraćuje terapiju.
  >
  > Naš tim se kontinuirano edukuje u zemlji i inostranstvu, koristimo isključivo sertifikovane materijale premium klase i na svoje radove dajemo garanciju u pisanoj formi.

### 6.6 Usluge (grid od 8)
- eyebrow `NAŠE USLUGE` + H2 `Kompletna stomatologija na jednom mestu` + kratak podnaslov.
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`.
- Kartica (`card-lux`): slika `aspect-[4/5] object-cover` sa `group-hover:scale-[1.06] duration-700`; overlay `bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent`; sadržaj apsolutno pozicioniran dole: naziv (`font-display text-2xl text-ivory-50`) + opis koji je **skriven i otkriva se na hover** (`max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500`) + strelica `→` u zlatnom krugu gore desno.
- Na mobilnom opis je **uvek vidljiv** (bez hovera): koristi `sm:max-h-0 sm:opacity-0` da bi mobilni imao vidljiv tekst.
- Podaci (`src/data/services.ts`) — 8 usluga:
  1. **Implantologija** — Trajno rešenje za izgubljene zube uz 3D planiranje i bezbolnu ugradnju.
  2. **Estetska stomatologija** — Hollywood smile, folije i lasersko beljenje za osmeh bez mana.
  3. **Protetika** — Bezmetalne krunice, keramičke navlake i mostovi izuzetne prirodnosti.
  4. **Ortodoncija** — Invisalign i fiksni aparati za savršeno poravnate zube.
  5. **Opšta stomatologija** — Bele plombe, endodoncija i preventiva savremenim protokolima.
  6. **Parodontologija** — Lečenje krvarenja i povlačenja gingive laserskom terapijom.
  7. **Oralna hirurgija** — Vađenje umnjaka, apikotomija i augmentacija kosti.
  8. **Dečja stomatologija** — Nežan pristup i pozitivno prvo iskustvo za najmlađe.

### 6.7 Spotlight sekcija — "Zubi u 3 sata"
- `dark-section`, `py-24 md:py-32`, grid `lg:grid-cols-[1.05fr_1fr] gap-16 items-center`.
- Levo: eyebrow `NAŠA SPECIJALNOST` → H2 `Zubi u 3 sata` (H2 sa `italic text-gold-300` na "3 sata") → paragraf → 4 benefita u 2x2 gridu sa zlatnim ikonicama (`Jedna intervencija`, `Bez čekanja mesecima`, `Sedacija — bez bola`, `Garancija 5 godina`) → dugmad `btn-gold` + tel link.
- Desno: velika slika `rounded-[1.75rem]` sa `shadow-lift`, + **plutajuća kartica** preko slike dole levo: `bg-ivory-50/95 backdrop-blur rounded-2xl p-6` sa `4,9 ★` i tekstom `Prosečna ocena 340+ pacijenata`.
- Pozadina: mint radial glow + grain + suptilna velika zlatna cifra `03` kao dekoracija (`text-[16rem] text-white/[0.03] font-display absolute`).

### 6.8 Naš rad — Pre / Posle
- eyebrow `NAŠ RAD` + H2 `Rezultati govore umesto nas`
- **Before/After klizač** (`beforeAfter.ts`): kontejner `relative aspect-[16/10] rounded-[1.75rem] overflow-hidden select-none`; dve slike apsolutno; gornja ima `clip-path: inset(0 X% 0 0)`; vertikalna ručica `w-[2px] bg-gold-500` sa krugom 44px (`bg-gold-500 text-ink-900`, ikonica `↔`). Podržava: `pointerdown/move/up`, drag, klik bilo gde na kontejneru, tastaturu (`←`/`→` po 4%), touch. Labele `PRE` / `POSLE` u uglovima (`bg-ink-950/70 px-3 py-1 rounded-full text-[11px] tracking-widest`).
- Ispod: prebacivanje između 3 slučaja (thumbnail red od 3 male slike, aktivna ima `ring-2 ring-gold-500`).
- Ispod toga: **galerija** — masonry-like grid (`grid-cols-2 md:grid-cols-4 gap-4`, neki elementi `row-span-2`) od 8 slika, klik otvara **lightbox** (`lightbox.ts`): full-screen `bg-ink-950/95 backdrop-blur`, strelice prev/next, zatvaranje na `Escape` i klik na backdrop, brojač `3 / 8`, swipe na mobilnom.

### 6.9 Zašto pacijenti biraju nas
- Tamna sekcija `bg-petrol-700`, grid `lg:grid-cols-[1fr_1.15fr] gap-16`.
- Levo: eyebrow + H2 `Sedam razloga za poverenje` + veliki zlatni bedž `GARANCIJA 5 GODINA` (krug sa duplim borderom).
- Desno: lista od 7 itema — svaki `flex gap-5 py-5 border-b border-white/10`; broj `01`–`07` u `gold.300 text-sm`; naslov + jedna linija opisa.
  1. **20+ godina prakse** — Hiljade uspešno završenih terapija i složenih slučajeva.
  2. **Bez bola, u sedaciji** — Za pacijente sa strahom, terapija u analgosedaciji.
  3. **Digitalna dijagnostika** — 3D CBCT snimak, intraoralni skener, digitalni plan osmeha.
  4. **Premium materijali** — Nemački i švajcarski sertifikovani implantati i keramika.
  5. **Jasna cena unapred** — Pisani plan terapije sa tačnim cenama, bez naknadnih troškova.
  6. **Pisana garancija** — Do 5 godina garancije na protetiku i implantate.
  7. **Jedna adresa za sve** — Ceo tim specijalista i laboratorija u istoj ordinaciji.

### 6.10 Iskustva pacijenata
- eyebrow `ISKUSTVA` + H2 `Šta kažu naši pacijenti` + prosečna ocena `4,9 / 5` sa 5 zlatnih zvezdica.
- Karusel (`carousel.ts`): 1 kartica na mobilnom, 2 na `md`, 3 na `lg`; `scroll-snap-x` kontejner + prev/next okrugla dugmad (`border-ivory-200 hover:bg-petrol-700 hover:text-ivory-50`) + tačkice-indikatori; autoplay 6s sa pauzom na hover/focus; podrška za touch swipe (native scroll-snap je dovoljan).
- Kartica: `bg-white rounded-2xl p-8 shadow-soft border-t-2 border-gold-500`; veliki citat `”` u `gold.100` iza teksta; 5 zvezdica; tekst recenzije (max 5 linija); dole: avatar krug 44px + ime + grad + usluga (`Implantologija`).
- 6 recenzija, imena i gradovi: Beograd, Novi Sad, Cirih, Beč, London, Podgorica (referiši dentalni turizam).

### 6.11 Dentalni turizam
- `bg-ink-950` tamna, split: levo tekst + 4 feature kartice (`bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:border-gold-500/40`), desno slika apartmana.
- 4 kartice: **Apartman iznad ordinacije** (2 luksuzna apartmana, WiFi, kablovska — besplatno za pacijente) · **Brzina terapije** (Hollywood smile 10–14 dana, All-on-6 u dve posete) · **Online konsultacija** (pošaljite snimke, dobijate plan i cenu pre puta) · **Prevoz sa aerodroma** (organizujemo dolazak i smeštaj).
- CTA: `btn-gold` → `Zatražite online konsultaciju`.

### 6.12 Cenovnik
- eyebrow `CENOVNIK` + H2 `Transparentne cene, bez skrivenih troškova` + napomena `Cene su informativne; konačan plan terapije dobijate nakon pregleda.`
- **Tabovi** (`tabs.ts`): `Implantologija · Protetika · Estetika · Opšta stomatologija · Ortodoncija`. Tab bar horizontalno skrolabilan na mobilnom (`overflow-x-auto no-scrollbar`), aktivni tab `bg-petrol-700 text-ivory-50 rounded-full`.
- Sadržaj taba: tabela — red = `flex justify-between items-baseline py-4 border-b border-ivory-200 border-dashed`, levo naziv usluge, desno cena `font-display text-xl text-petrol-700` + `EUR`. Dotted leader linija između (`flex-1 border-b border-dotted border-ivory-200 mx-4`).
- Primeri redova (Implantologija): `Implant (Straumann) — 750` · `Implant (Nemačka) — 480` · `All-on-4 (kompletno) — 4.900` · `All-on-6 (kompletno) — 6.400` · `Augmentacija kosti — 250` · `Sinus lift — 400`.
- Ispod tabele: `btn-ghost` → `Zakažite besplatan pregled`.

### 6.13 Česta pitanja
- Akordeon (`accordion.ts`): 8 pitanja, jedan otvoren u istom trenutku (`single` mod).
- Item: `border-b border-ivory-200`, trigger `<button>` sa `aria-expanded`, `aria-controls`; ikonica `+` rotira u `×` (`rotate-45`, 400ms); panel animiran preko `grid-template-rows: 0fr → 1fr` (najčistiji način za auto-visinu) ili `max-height` + `scrollHeight`.
- Pitanja: Da li terapija boli? · Koliko traje ugradnja implantata? · Da li radite u sedaciji? · Kolika je garancija? · Da li je moguće plaćanje na rate? · Koliko dana treba da ostanem u Beogradu? · Da li radite subotom? · Šta ako imam veliki strah od stomatologa?

### 6.14 Blog / saveti
- 3 kartice u gridu: slika `aspect-[3/2]`, datum + kategorija u eyebrow stilu, naslov H3 (`group-hover:text-petrol-500`), 2 linije opisa, `Pročitajte više →`.
- Naslovi: `Invisalign ili fiksni aparat — šta je bolje za vas?` · `Šta su luminiri i kome se preporučuju?` · `Digitalna stomatologija: kako 3D planiranje menja terapiju`
- Linkovi su `href="#"` (nema stranica u ovoj fazi).

### 6.15 CTA banner
- Puna širina, `bg-petrol-700` sa velikom zlatnom radial svetlošću i grain-om, `py-20 md:py-28`, centrirano.
- H2 `Vaš novi osmeh počinje jednim pozivom` + paragraf + `btn-gold` (`Zakaži pregled`) i tel link (`font-display text-2xl` sa ikonicom telefona).

### 6.16 Kontakt
- Grid `lg:grid-cols-[1fr_1fr] gap-14`.
- Levo — **forma** (`bg-ivory-100 rounded-[1.75rem] p-8 md:p-10 border border-ivory-200`):
  - Polja: `Ime i prezime*`, `Telefon*`, `Email`, `Usluga` (`<select>` sa 8 usluga + "Nisam siguran/na"), `Poruka` (textarea 4 reda), checkbox `Slažem se sa obradom podataka*`.
  - Dugme `btn-gold w-full` → `Pošalji zahtev`.
  - Validacija (`form.ts`, klijentska): ime min 3 znaka; telefon regex `/^[+0-9\s()\-]{6,20}$/`; email opciono ali ako je unet mora biti validan; checkbox obavezan. Greška: `border-red-400` + poruka `text-[13px] text-red-500 mt-1.5` + `aria-invalid`. Prvo nevalidno polje dobija fokus.
  - **Mock submit:** `preventDefault()`, dugme prelazi u loading stanje (spinner + tekst `Šaljem...`, `disabled`), nakon 900ms zameni formu **success karticom**: zlatni check krug + `Hvala vam!` + `Kontaktiraćemo vas u roku od 24h.` + link `Pošalji novi zahtev` (vraća formu). Podatke ispiši u `console.log` i `// TODO: backend integration`.
- Desno — **info blok**: 4 itema sa ikonicama (Adresa, Telefon, Email, Radno vreme), svaki `flex gap-4 py-5 border-b border-ivory-200`; ispod social ikonice u zlatnim krugovima; ispod **mapa**: `<iframe>` Google Maps embed sa `loading="lazy"`, `rounded-2xl`, `aspect-[16/10]`, `grayscale hover:grayscale-0 transition duration-700` (premium detalj). Ako embed nije dostupan — statična slika mape sa pinom.
- NAP podaci u `src/data/site.ts` (placeholder, lako se menja):
  ```ts
  export const site = {
    name: 'Ordinacija Premium Dental',
    phone: '+381 11 123 4567',
    phoneHref: 'tel:+381111234567',
    mobile: '+381 60 123 4567',
    whatsapp: 'https://wa.me/381601234567',
    viber: 'viber://chat?number=%2B381601234567',
    email: 'info@premiumdental.rs',
    address: 'Kneza Miloša 12, 11000 Beograd, Srbija',
    hours: [
      { day: 'Ponedeljak – Petak', time: '08:00 – 20:00' },
      { day: 'Subota', time: '09:00 – 14:00' },
      { day: 'Nedelja', time: 'Zatvoreno' },
    ],
    social: { instagram: '#', facebook: '#', tiktok: '#', youtube: '#' },
  } as const
  ```

### 6.17 Footer
- `bg-ink-950 text-stone-300`, `pt-20 pb-8`, grid `md:grid-cols-2 lg:grid-cols-4 gap-12`.
- Kolone: (1) logo + kratak opis + social ikonice; (2) `Navigacija` linkovi; (3) `Usluge` linkovi; (4) `Kontakt` — adresa, telefon, email, radno vreme.
- Iznad kolona: `hairline`. Ispod: donji red `border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between text-[13px]` — `© 2026 [Naziv]. Sva prava zadržana.` + `Uslovi korišćenja · Politika privatnosti` (linkovi `#`).
- Naslovi kolona: eyebrow stil sa zlatnom bojom.

### 6.18 Floating actions
- Desno dole, `fixed bottom-5 right-5 z-40 flex flex-col gap-3`.
- Glavni FAB: zlatni krug 56px sa ikonicom telefona, `shadow-gold`, `animate-pulse` prsten (`::before` ring koji se širi). Klik na desktopu → scroll do `#kontakt`; na mobilnom (`<lg`) → `tel:` link direktno.
- Na klik/hover otvara mini meni gore: WhatsApp (zeleni krug), Viber (ljubičasti), Pozovi. Stagger animacija 60ms.
- **Back-to-top**: pojavljuje se posle `scrollY > 600`, levo dole ili iznad FAB-a, `border border-ivory-200 bg-white/80 backdrop-blur` sa strelicom gore.
- Na mobilnom obavezno ne prekrivati CTA u formi — dodati `pb-24` na footer na mobilnom.

---

## 7. TypeScript komponente — API i ponašanje

Sve komponente izvoze `init` funkciju bez argumenata ili sa opcionim rootom, i **bezbedno izlaze**
ako element ne postoji (`if (!el) return`). Nikad ne koristiti `!` non-null assertion bez provere.

```ts
// src/lib/dom.ts
export const $  = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) =>
  r.querySelector<T>(s)
export const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) =>
  Array.from(r.querySelectorAll<T>(s))
```

| Modul | Export | Ponašanje |
|---|---|---|
| `header.ts` | `initHeader()` | scroll state (throttle preko `requestAnimationFrame`), mega dropdown, mobile drawer + body lock, active-link observer |
| `reveal.ts` | `initReveal()` | `IntersectionObserver` (`threshold: 0.15`, `rootMargin: '0px 0px -8% 0px'`) na svim `.reveal`; dodaje `is-in`; čita `data-delay` (ms) i postavlja `style.transitionDelay`; `unobserve` nakon prvog ulaza |
| `counters.ts` | `initCounters()` | animira `[data-count]` elemente, `easeOutExpo`, 1600ms, `Intl.NumberFormat('sr-RS')`, radi jednom |
| `carousel.ts` | `createCarousel(root, opts)` | opts: `{ autoplay?: number, loop?: boolean }`; koristi `scroll-snap` + `scrollBy`, prev/next, dots, keyboard `←/→`, pauza na `mouseenter`/`focusin`, `IntersectionObserver` da ne radi kad nije vidljiv |
| `beforeAfter.ts` | `initBeforeAfter()` | pointer drag + klik + tastatura, clip-path update, više instanci, thumbnail switch |
| `accordion.ts` | `initAccordions()` | `[data-accordion]` root, `[data-accordion-item]`, mod `single`/`multi` preko `data-mode`, ARIA atributi, animacija visine |
| `lightbox.ts` | `initLightbox()` | otvara iz `[data-lightbox]`, prev/next, `Escape`, backdrop klik, swipe, brojač, zaključava skrol, vraća fokus na trigger |
| `tabs.ts` | `initTabs()` | `role="tablist"`, `aria-selected`, prikaz/skrivanje panela, keyboard strelice |
| `form.ts` | `initForm()` | validacija, error rendering, loading state, mock submit, success state, reset |
| `floatingActions.ts` | `initFloatingActions()` | toggle mini menija, back-to-top vidljivost + smooth scroll |
| `langSwitch.ts` | `initLangSwitch()` | samo vizuelno prebacivanje aktivnog stanja + `console.info('i18n TODO')` |
| `render.ts` | `renderInto(selector, html)` / `mount(map)` | ubacuje generisani HTML iz `data/` u `[data-render="..."]` kontejnere |

`src/main.ts`:

```ts
import './style.css'
import { mountSections } from './lib/render'
import { initHeader } from './components/header'
// ...ostali importi

document.addEventListener('DOMContentLoaded', () => {
  mountSections()        // 1) prvo renderuj sadržaj iz data/
  initHeader()           // 2) pa inicijalizuj interakcije
  initReveal()
  initCounters()
  initBeforeAfter()
  initAccordions()
  initTabs()
  initLightbox()
  initTestimonials()
  initForm()
  initFloatingActions()
  initLangSwitch()
})
```

**Redosled je važan:** `mountSections()` mora pre svih observera, jer observeri traže elemente
koji se generišu iz podataka.

---

## 8. Mobilna optimizacija (obavezno)

1. **Mobile-first CSS** — piši bazne klase za telefon, pa `sm: md: lg: xl:` nadogradnje.
2. Breakpointi: `sm 640` · `md 768` · `lg 1024` · `xl 1280` (Tailwind default, ne menjati).
3. Viewport meta: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.
4. Koristi `min-h-[100svh]` a **ne** `100vh` za hero (izbegava skakanje adresne trake na iOS).
5. Sva dugmad i tap targeti min. **44×44px**; nav linkovi u draweru min 52px visine.
6. Font-size inputa min **16px** (`text-base`) da iOS ne zumira pri fokusu.
7. Nema horizontalnog skrola: `overflow-x-hidden` na `body`; sve dekorativne `absolute` elemente sakriti na mobilnom (`hidden md:block`).
8. Horizontalni scroll-snap redovi umesto grid-a gde ima puno itema (trust bedževi, tabovi, iskustva) + `no-scrollbar`.
9. Hover efekti se **ne oslanjaju** na hover za prikaz informacija — na mobilnom sadržaj je vidljiv (vidi 6.6).
10. Slike: `loading="lazy"` na svima **osim** hero (hero = `loading="eager" fetchpriority="high"`), `decoding="async"`, uvek `width`/`height` ili `aspect-ratio` klasa da nema layout shifta.
11. Tipografija: skaliraj naslove (`clamp` nije potreban, koristi Tailwind stepenice iz 4.2).
12. Padding sekcija na mobilnom `px-5` (min 20px gutter), nikad manje.
13. `safe-area` za FAB i footer: `pb-[max(1.25rem,env(safe-area-inset-bottom))]`.
14. Testirati na širinama **360px, 390px, 414px, 768px, 1024px, 1440px, 1920px**.
15. `prefers-reduced-motion` guard je već u CSS-u — obavezno ga poštovati i u TS-u (`motion.ts` izvozi `prefersReducedMotion()`; brojači i autoplay se preskaču ako je true).

---

## 9. Pristupačnost (osnovni nivo)

- Semantika: `header`, `nav`, `main`, `section` sa `aria-labelledby`, `footer`.
- Jedan `h1` (hero), hijerarhija naslova bez preskakanja.
- Skip link: `Preskoči na sadržaj` (vidljiv na fokus) kao prvi element u `body`.
- Svi `<img>` imaju smislen `alt` (dekorativne: `alt=""`).
- Fokus stilovi: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2` — nikad ne uklanjati outline bez zamene.
- Akordeon/tabovi/dropdown/lightbox: ispravni ARIA atributi i keyboard podrška (`Escape`, strelice, `Enter`/`Space`).
- `lang="sr"` na `<html>`.

---

## 10. Performanse

- Ukupno max **8 fontovskih fajlova** (2 familije, weights iz 4.2), `display=swap`, `preconnect` na `fonts.gstatic.com`.
- Slike u `.webp`, hero max 1920px širine i ≤ 350KB, kartice ≤ 120KB.
- Bez animacija na `width/height/top/left` — samo `transform` i `opacity`.
- Scroll listeneri kroz `requestAnimationFrame` throttle ili `IntersectionObserver`.
- `will-change: transform` samo na elementima koji se stvarno animiraju pri skrolu, i ukloniti posle.
- Cilj: Lighthouse Performance ≥ 90 na desktopu, ≥ 80 na mobilnom (bez SEO/backend optimizacija).

---

## 11. Sadržaj — placeholder pravilo

Svi tekstovi iz sekcije 6 su **finalni placeholder tekst na srpskom** — koristi ih tačno tako.
Imena, telefon, adresa i email su izmišljeni (vidi `site.ts`) i biće zamenjeni kasnije.
Nikad ne ostavljati "Lorem ipsum".

---

## 12. Slike

Struktura `public/img/`:

```
hero.webp                doctor-portrait.webp   clinic-1.webp   clinic-2.webp
service-01..08.webp      spotlight.webp         apartment.webp
before-01.webp / after-01.webp  (×3 slučaja)
gallery-01..08.webp      blog-01..03.webp       avatar-01..06.webp
```

Dok prave slike ne postoje, koristi Unsplash direktne URL-ove sa parametrima
(`?auto=format&fit=crop&w=1200&q=70`) i traži pojmove: `dental clinic interior`,
`dentist portrait`, `smile teeth close up`, `modern medical office`, `luxury apartment interior`.
Za avatare: `https://i.pravatar.cc/120?img=NN`.
**Sve URL-ove držati u `src/data/*.ts`**, ne razbacane po HTML-u, da se lako zamene lokalnim fajlovima.

---

## 13. Redosled implementacije

1. Setup projekta (Vite + TS + Tailwind), `tailwind.config.ts`, `style.css`, fontovi, `dom.ts`.
2. `index.html` skelet sa svim sekcijama, `id`-jevima i `data-render` kontejnerima.
3. Header + mobile drawer + dropdown (`header.ts`) — najkompleksniji deo, radi ga rano.
4. Hero (kompletno, uključujući mobilnu verziju).
5. `data/` fajlovi + `render.ts` + mount svih sekcija sa statičkim izgledom.
6. Sekcije 6.3 → 6.6 (statistika, koraci, o nama, usluge).
7. `reveal.ts` + `counters.ts` — animacije pri skrolu.
8. Spotlight + Zašto mi + Dentalni turizam (tamne sekcije, grain/glow).
9. `beforeAfter.ts` + `lightbox.ts` (galerija).
10. `carousel.ts` (iskustva).
11. `accordion.ts` + `tabs.ts` (cenovnik, FAQ).
12. Blog + CTA banner.
13. Kontakt + `form.ts` + mapa.
14. Footer + `floatingActions.ts` + `langSwitch.ts`.
15. Mobilni pass (sekcija 8) — proći sve breakpointe, ispraviti.
16. Pristupačnost pass (sekcija 9) + `npm run build` mora proći bez TS grešaka.

---

## 14. Definition of Done — checklist

- [ ] `npm run build` prolazi bez TypeScript grešaka (`strict: true`)
- [ ] Sve 19 sekcija (0–18) implementirano i vizuelno dovršeno
- [ ] Nema horizontalnog skrola na 360px širine
- [ ] Header menja stanje pri skrolu; mobile drawer se otvara/zatvara i zaključava skrol
- [ ] Dropdown "Usluge" radi na hover, klik, `Escape` i klik izvan
- [ ] Brojači se animiraju jednom, kad sekcija uđe u viewport
- [ ] Before/After radi na miš, touch i tastaturu
- [ ] Lightbox: otvaranje, prev/next, `Escape`, swipe, brojač
- [ ] Karusel iskustava: strelice, tačkice, autoplay sa pauzom, swipe
- [ ] Akordeon i tabovi rade sa ispravnim ARIA atributima
- [ ] Forma validira sva polja i prikazuje success stanje (bez mrežnog poziva)
- [ ] Floating actions + back-to-top rade i ne prekrivaju sadržaj
- [ ] `prefers-reduced-motion` isključuje animacije
- [ ] Svi tap targeti ≥ 44px, inputi 16px
- [ ] Svaka slika ima `alt`, `loading` i definisan aspect ratio
- [ ] Tekstovi su na srpskom, bez Lorem ipsum
- [ ] Nigde `fetch`/API poziv (nema backenda) — samo `console.log` + `// TODO`
- [ ] Sadržaj dolazi iz `src/data/*.ts`, ne hardkodovan u HTML (osim hero/footer)

---

## 15. Šta NE raditi u ovoj fazi

- ❌ Backend, API, baza, email servis, forma koja stvarno šalje
- ❌ SEO: `meta description`, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`
- ❌ i18n prevod (samo vizuelni SR/EN prekidač bez funkcije)
- ❌ Analitika, cookie banner, GDPR moduli
- ❌ Blog stranice, pojedinačne stranice usluga (samo `#` linkovi)
- ❌ Dodavanje animacionih ili UI biblioteka
- ❌ Bold serifni naslovi, jarke boje, gradijenti u više boja, veliki radijusi (>2rem na karticama), neon senke — ubijaju premium izgled
