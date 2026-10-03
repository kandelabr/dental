import { $$ } from './dom'
import { site } from '../data/site'
import { services } from '../data/services'
import { steps } from '../data/steps'
import { stats } from '../data/stats'
import { about } from '../data/about'
import { advantages } from '../data/advantages'
import { testimonials } from '../data/testimonials'
import { gallery, beforeAfterCases } from '../data/gallery'
import { prices } from '../data/prices'
import { faq } from '../data/faq'
import { getServicePage } from '../data/servicePages'
import { teamIntro, teamMembers } from '../data/team'
import { quickLinks, quickLinkHref } from '../data/quickLinks'
import { homeHref, homeSection, serviceHref, teamHref } from './paths'

const socialIcons: Record<string, string> = {
  instagram:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.7-1.6h1.6V3.2C15.9 3 15 3 13.9 3c-2.5 0-4.2 1.5-4.2 4.3v2.5H7v3.2h2.7V21z"/></svg>',
}

function brandLink(opts?: { compact?: boolean; showTagline?: boolean }): string {
  const compact = opts?.compact ?? false
  const showTagline = opts?.showTagline ?? !compact
  const imgSize = compact ? 'h-9 w-9' : 'h-12 w-12'
  const titleSize = compact ? 'text-xl' : 'text-2xl'
  return `
  <a href="${homeHref()}" class="flex items-center gap-3 min-w-0">
    <img src="/assets/logo.jpg" alt="${site.name}" class="${imgSize} shrink-0 rounded-full object-cover ring-1 ring-white/15" width="48" height="48" decoding="async" />
    <span class="flex flex-col leading-none min-w-0">
      <span class="font-display ${titleSize} tracking-wide truncate">${site.name}</span>
      ${
        showTagline
          ? `<span class="mt-1.5 h-px w-8 bg-gold-500"></span>
      <span class="mt-1.5 text-[10px] tracking-[0.3em] uppercase">Stomatološka ordinacija</span>`
          : ''
      }
    </span>
  </a>`
}

function socialLinks(sizeClass: string): string {
  return Object.entries(site.social)
    .map(
      ([key, href]) => `
      <a href="${href}" target="_blank" rel="noopener noreferrer" class="${sizeClass} text-current hover:text-gold-500 transition-colors" aria-label="${key}">
        ${socialIcons[key] ?? ''}
      </a>`,
    )
    .join('')
}

function starIcon(filled: boolean): string {
  return `<svg class="h-4 w-4 ${filled ? 'text-gold-500' : 'text-ivory-200'}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.3l7.1-.7z"/></svg>`
}

function stars(rating: number): string {
  return Array.from({ length: 5 }, (_, i) => starIcon(i < rating)).join('')
}

// ---------- Topbar ----------

function renderTopbarSocial(): string {
  return `${socialLinks('h-4 w-4')}<span class="h-4 w-px bg-white/20"></span><button type="button" data-lang-switch class="flex items-center gap-1 text-[13px] tracking-wide"><span data-lang-option="sr" class="text-gold-500">SR</span>&nbsp;|&nbsp;<span data-lang-option="en" class="text-ivory-50/70 hover:text-gold-500 transition-colors">EN</span></button>`
}

// ---------- Header ----------

function renderHeader(): string {
  const navLinks: [string, string][] = [
    [homeSection('pocetna'), 'Početna'],
    [homeSection('usluge'), 'Usluge'],
    [homeSection('nas-rad'), 'Naš rad'],
    [homeSection('cenovnik'), 'Cenovnik'],
    [homeSection('o-nama'), 'O nama'],
    [homeSection('iskustva'), 'Iskustva'],
    [homeSection('kontakt'), 'Kontakt'],
  ]

  const navHtml = navLinks
    .map(([href, label]) => {
      if (label === 'Usluge') {
        return `
        <div class="relative" data-dropdown>
          <a href="${href}" data-nav-link data-dropdown-trigger class="nav-link" aria-expanded="false" aria-controls="services-dropdown">
            ${label} <span aria-hidden="true">▾</span>
          </a>
          <div id="services-dropdown" data-dropdown-panel class="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[720px] max-w-[90vw] rounded-2xl bg-ivory-50 p-8 shadow-lift grid grid-cols-2 gap-x-10 gap-y-3 opacity-0 invisible translate-y-2 transition-all duration-300 ease-lux">
            ${services
              .map(
                (s) => `
              <a href="${serviceHref(s.slug)}" data-service-link="${s.slug}" class="flex items-start gap-4 rounded-xl p-2 -m-2 hover:bg-ivory-100 transition-colors">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-100 text-petrol-700">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 4c-2 0-3.5 1.6-3.5 3.4 0 2 1 3 1.4 4.6.4 1.6.3 4.5 1.4 6.5.3.5 1 .5 1.3 0 .9-1.7.7-3.7 1.2-5.4"/><path d="M12 4c2 0 3.5 1.6 3.5 3.4 0 2-1 3-1.4 4.6-.3 1.3-.3 3.4-.9 5.1"/></svg>
                </span>
                <span>
                  <span class="block font-display text-lg text-ink-900">${s.name}</span>
                  <span class="block text-[13px] text-stone-500">${s.description}</span>
                </span>
              </a>`,
              )
              .join('')}
          </div>
        </div>`
      }
      return `<a href="${href}" data-nav-link class="nav-link">${label}</a>`
    })
    .join('')

  return `
  <div id="header-inner" class="transition-all duration-500 border-b border-transparent text-ivory-50">
    <div class="container-lux flex items-center justify-between h-24" id="header-bar">
      ${brandLink()}

      <nav class="hidden lg:flex items-center gap-9" aria-label="Glavna navigacija">
        ${navHtml}
      </nav>

      <div class="flex items-center gap-4">
        <a href="${homeSection('kontakt')}" class="btn-gold hidden lg:inline-flex">Zakaži pregled</a>
        <button type="button" data-drawer-open aria-label="Otvori meni" aria-expanded="false" class="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-current/25">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>

    <nav aria-label="Brzi linkovi" class="border-t border-white/10">
      <div class="container-lux flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar py-2.5 text-[12px] md:text-[13px] uppercase tracking-[0.12em]">
        ${quickLinks
          .map(
            (link, i) => `
          <a href="${quickLinkHref(link)}" class="shrink-0 text-ivory-50/75 hover:text-gold-300 transition-colors whitespace-nowrap ${i > 0 ? 'md:border-l md:border-white/15 md:pl-8' : ''}">${link.label}</a>`,
          )
          .join('')}
      </div>
    </nav>
  </div>

  <div data-drawer class="fixed inset-0 z-[60] bg-ink-950 text-ivory-50 translate-x-full transition-transform duration-500 ease-lux lg:hidden overflow-y-auto">
    <div class="container-lux flex items-center justify-between h-20">
      ${brandLink({ compact: true, showTagline: false })}
      <button type="button" data-drawer-close aria-label="Zatvori meni" class="flex h-11 w-11 items-center justify-center rounded-full border border-white/20">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <nav class="container-lux flex flex-col gap-1 pb-10" aria-label="Mobilna navigacija">
      ${navLinks
        .map(([href, label], i) =>
          label === 'Usluge'
            ? `
          <div data-drawer-accordion>
            <button type="button" data-drawer-accordion-trigger class="flex w-full items-center justify-between py-4 min-h-[52px] font-display text-3xl" style="transition-delay:${i * 60}ms" data-stagger>
              ${label} <span data-drawer-accordion-icon aria-hidden="true">+</span>
            </button>
            <div data-drawer-accordion-panel class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-400 ease-lux overflow-hidden">
              <div class="min-h-0 flex flex-col gap-3 pb-4">
                ${services.map((s) => `<a href="${serviceHref(s.slug)}" data-drawer-link class="text-lg text-stone-300 hover:text-gold-500 py-1.5 min-h-[44px] flex items-center">${s.name}</a>`).join('')}
              </div>
            </div>
          </div>`
            : `<a href="${href}" data-drawer-link data-stagger style="transition-delay:${i * 60}ms" class="py-4 min-h-[52px] flex items-center font-display text-3xl border-b border-white/10">${label}</a>`,
        )
        .join('')}
    </nav>
    <div class="container-lux flex flex-col gap-4 pb-12 border-t border-white/10 pt-8">
      <a href="${site.phoneHref}" class="text-xl font-display">${site.phone}</a>
      <span class="text-stone-300 text-sm">Pon–Pet 12:00–20:00 · Sub po pozivu</span>
      <div class="flex items-center gap-4 pt-2">${socialLinks('h-5 w-5')}</div>
      <a href="${homeSection('kontakt')}" data-drawer-link class="btn-gold w-full mt-2">Zakaži pregled</a>
    </div>
  </div>
  <div data-drawer-backdrop class="fixed inset-0 z-[55] bg-ink-950/60 opacity-0 pointer-events-none transition-opacity duration-500 lg:hidden"></div>
  `
}

// ---------- Stats ----------

function renderStats(): string {
  return `
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:divide-x divide-ivory-200">
    ${stats
      .map(
        (s, i) => `
      <div class="text-center reveal" data-delay="${i * 80}">
        <p class="font-display text-5xl md:text-6xl text-petrol-700">
          <span data-count="${s.value}" data-decimals="${s.decimals ?? 0}">0</span><span class="text-gold-500">${s.suffix}</span>
        </p>
        <p class="eyebrow justify-center mt-3 text-stone-500">${s.label}</p>
      </div>`,
      )
      .join('')}
  </div>`
}

// ---------- Steps ----------

function renderSteps(): string {
  return `
  <div class="text-center reveal">
    <p class="eyebrow justify-center">Kako počinjemo</p>
    <h2 class="mt-5 text-3xl md:text-5xl lg:text-[3.5rem] text-ink-900">Tri koraka do vašeg novog osmeha</h2>
  </div>
  <div class="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
    <div class="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"></div>
    ${steps
      .map(
        (s, i) => `
      <div class="relative text-center reveal" data-delay="${i * 120}">
        <div class="mx-auto flex h-[104px] w-[104px] items-center justify-center rounded-full border border-gold-500/40 bg-ivory-50 relative z-10">
          <span class="font-display text-2xl text-gold-500">${s.number}</span>
        </div>
        <h3 class="mt-6 text-xl md:text-2xl text-ink-900">${s.title}</h3>
        <p class="mt-3 text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-stone-500 max-w-[36ch] mx-auto">${s.description}</p>
      </div>`,
      )
      .join('')}
  </div>`
}

// ---------- About ----------

function renderAbout(): string {
  return `
  <div class="grid lg:grid-cols-2 gap-16 items-center">
    <div class="relative reveal max-w-lg mx-auto lg:mx-0">
      <div class="arch relative aspect-[4/5] overflow-hidden bg-[#d4dae0]">
        <img
          src="${about.image}"
          alt="${about.imageAlt}"
          class="absolute left-1/2 top-1/2 max-w-none h-full w-auto"
          style="transform: translate(-50%, -50%) scale(0.7)"
          loading="lazy"
          decoding="async"
        />
      </div>
      <span class="absolute -top-6 -left-6 hidden sm:flex h-28 w-28 -rotate-12 items-center justify-center rounded-full bg-gold-500 text-center text-ink-900 shadow-gold">
        <span class="font-display text-sm leading-tight px-3">${about.badge.toUpperCase()}</span>
      </span>
    </div>
    <div class="reveal" data-delay="100">
      <p class="eyebrow">O nama</p>
      ${about.paragraphs.map((p) => `<p class="mt-6 text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-stone-500">${p}</p>`).join('')}
      <a href="${teamHref()}" class="btn-dark mt-10">Upoznajte naš tim</a>
    </div>
  </div>`
}

// ---------- Services ----------

function renderServices(): string {
  return `
  <div class="text-center reveal">
    <p class="eyebrow justify-center">Naše usluge</p>
    <h2 class="mt-5 text-3xl md:text-5xl lg:text-[3.5rem] text-ink-900">Kompletna stomatologija na jednom mestu</h2>
    <p class="mt-5 max-w-[56ch] mx-auto text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-stone-500">
      Od preventivne do kompleksnih rekonstrukcija - sve usluge objedinjene u jednoj ordinaciji
    </p>
  </div>
  <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    ${services
      .map(
        (s, i) => `
      <a href="${serviceHref(s.slug)}" class="group card-lux reveal" data-delay="${(i % 4) * 80}">
        <div class="aspect-[4/5] overflow-hidden">
          <img src="${s.image}" alt="${s.name}" class="h-full w-full object-cover transition-transform duration-700 ease-lux group-hover:scale-[1.06]" loading="lazy" decoding="async" />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent"></div>
        <span class="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-ink-900 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        <div class="absolute inset-x-0 bottom-0 p-5">
          <h3 class="font-display text-2xl text-ivory-50">${s.name}</h3>
          <p class="mt-2 max-h-24 opacity-100 sm:max-h-0 sm:opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 text-[13px] leading-relaxed text-ivory-50/85">
            ${s.description}
          </p>
        </div>
      </a>`,
      )
      .join('')}
  </div>`
}

// ---------- Spotlight (osiguranje) ----------

function renderSpotlight(): string {
  const insurers = ['Dunav osiguranje', 'Triglav', 'Globos', 'Delta Generali']
  return `
  <div class="absolute inset-0 opacity-[0.035] pointer-events-none" aria-hidden="true">
    <svg width="100%" height="100%"><filter id="grain-spotlight"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#grain-spotlight)" /></svg>
  </div>
  <div class="absolute inset-x-0 top-0 h-2/3 pointer-events-none" aria-hidden="true" style="background: radial-gradient(60% 50% at 50% 0%, rgba(159,212,206,0.16), transparent 70%);"></div>

  <div class="relative grid lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
    <div class="reveal">
      <p class="eyebrow">Osiguranje</p>
      <h2 class="mt-5 text-3xl md:text-5xl lg:text-[3.5rem] text-ivory-50">Refundacija uz <span class="italic text-gold-300">10%</span> niže cene</h2>
      <p class="mt-6 max-w-[52ch] text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-stone-300">
        Sklopljeni su ugovori sa vodećim osiguravajućim kućama u cilju refundacije — korisnici osiguranja ostvaruju terapiju po cenama nižim za 10%.
      </p>
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
        ${insurers
          .map(
            (name) => `
          <div class="flex items-center gap-3">
            <svg class="h-5 w-5 shrink-0 text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L19 7"/></svg>
            <span class="text-ivory-50">${name}</span>
          </div>`,
          )
          .join('')}
      </div>
      <div class="mt-10 flex flex-col sm:flex-row gap-4">
        <a href="#kontakt" class="btn-gold">Zakažite konsultaciju</a>
        <a href="${site.phoneHref}" class="btn-ghost text-ivory-50 border-ivory-50/25">${site.phone}</a>
      </div>
    </div>
    <div class="relative reveal" data-delay="120">
      <div class="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 md:p-10 shadow-lift">
        <p class="font-display text-6xl md:text-7xl text-gold-300">10%</p>
        <p class="mt-4 text-xl text-ivory-50">niže cene za korisnike osiguranja</p>
        <p class="mt-4 text-[0.9375rem] leading-relaxed text-stone-300">
          Dunav osiguranje, Triglav, Globos i Delta Generali — refundacija putem sklopljenih ugovora.
        </p>
        <div class="mt-8 grid grid-cols-2 gap-3">
          ${insurers
            .map(
              (name) => `
            <div class="rounded-xl border border-white/10 bg-ink-950/40 px-4 py-3 text-center text-[12px] uppercase tracking-[0.12em] text-ivory-50/85">
              ${name}
            </div>`,
            )
            .join('')}
        </div>
      </div>
    </div>
  </div>`
}

// ---------- Work (before/after + gallery) ----------

function renderWork(): string {
  return `
  <div class="text-center reveal">
    <p class="eyebrow justify-center">Naš rad</p>
    <h2 class="mt-5 text-3xl md:text-5xl lg:text-[3.5rem] text-ink-900">Rezultati govore umesto nas</h2>
  </div>

  <div class="mt-16 reveal">
    <div data-before-after class="relative aspect-[16/10] rounded-[1.75rem] overflow-hidden select-none touch-none max-w-3xl mx-auto shadow-soft" tabindex="0" role="slider" aria-label="Poređenje pre i posle terapije" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
      <img data-ba-after src="${beforeAfterCases[0]!.after}" alt="Posle terapije" class="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      <div data-ba-before-wrap class="absolute inset-0 overflow-hidden" style="clip-path: inset(0 50% 0 0);">
        <img data-ba-before src="${beforeAfterCases[0]!.before}" alt="Pre terapije" class="h-full w-full object-cover" loading="lazy" decoding="async" />
      </div>
      <span class="absolute top-4 left-4 rounded-full bg-ink-950/70 px-3 py-1 text-[11px] tracking-widest text-ivory-50">PRE</span>
      <span class="absolute top-4 right-4 rounded-full bg-ink-950/70 px-3 py-1 text-[11px] tracking-widest text-ivory-50">POSLE</span>
      <div data-ba-handle class="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gold-500">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-ink-900 shadow-gold">↔</span>
      </div>
    </div>
    <div class="mt-6 flex flex-wrap justify-center gap-3">
      ${beforeAfterCases
        .map(
          (c, i) => `
        <button type="button" data-ba-thumb data-case-index="${i}" class="h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden ${i === 0 ? 'ring-2 ring-gold-500' : 'ring-1 ring-ivory-200'}" aria-label="${c.label}">
          <img src="${c.after}" alt="" class="h-full w-full object-cover" loading="lazy" decoding="async" />
        </button>`,
        )
        .join('')}
    </div>
  </div>

  <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
    ${gallery
      .map(
        (g, i) => `
      <button type="button" data-lightbox data-lightbox-index="${i}" class="reveal block w-full overflow-hidden rounded-2xl ${g.tall ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}" data-delay="${(i % 4) * 60}">
        <img src="${g.src}" alt="${g.alt}" class="h-full w-full object-cover transition-transform duration-700 ease-lux hover:scale-[1.06]" loading="lazy" decoding="async" />
      </button>`,
      )
      .join('')}
  </div>`
}

// ---------- Advantages ----------

function renderAdvantages(): string {
  return `
  <div class="text-center reveal max-w-3xl mx-auto">
    <p class="eyebrow justify-center text-gold-300">Prednosti</p>
    <h2 class="mt-5 text-3xl md:text-5xl lg:text-[3.5rem] text-ivory-50">Zašto pacijenti biraju nas</h2>
  </div>
  <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
    ${advantages
      .map(
        (a, i) => `
      <article class="reveal flex flex-col items-center text-center" data-delay="${(i % 3) * 80}">
        <div class="flex h-44 w-44 md:h-48 md:w-48 flex-col items-center justify-center rounded-full border-2 border-double border-gold-500/60 px-5">
          <span class="font-display text-sm text-gold-300">${a.number}</span>
          <h3 class="mt-2 font-display text-lg leading-snug text-ivory-50">${a.title}</h3>
        </div>
        <p class="mt-5 max-w-[28ch] text-[0.9375rem] leading-relaxed text-stone-300">${a.description}</p>
      </article>`,
      )
      .join('')}
  </div>`
}

// ---------- Testimonials ----------

function renderTestimonials(): string {
  return `
  <div class="text-center reveal">
    <p class="eyebrow justify-center">Iskustva</p>
    <h2 class="mt-5 text-3xl md:text-5xl lg:text-[3.5rem] text-ink-900">Šta kažu naši pacijenti</h2>
    <div class="mt-4 flex items-center justify-center gap-2">
      <span class="font-display text-2xl text-petrol-700">4,8 / 5</span>
      <span class="flex gap-0.5">${stars(5)}</span>
    </div>
  </div>
  <div class="mt-16 reveal">
    <div data-carousel class="relative">
      <div data-carousel-track class="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth">
        ${testimonials
          .map(
            (t) => `
          <article data-carousel-slide class="snap-start shrink-0 w-[86%] sm:w-[46%] lg:w-[31%] rounded-2xl border-t-2 border-gold-500 bg-white p-8 shadow-soft relative overflow-hidden">
            <span class="absolute -top-2 right-4 font-display text-8xl text-gold-100 select-none" aria-hidden="true">&rdquo;</span>
            <div class="relative flex gap-0.5">${stars(t.rating)}</div>
            <p class="relative mt-4 text-[0.9375rem] leading-relaxed text-stone-500 line-clamp-5">${t.quote}</p>
            <p class="relative mt-6 text-ink-900 text-sm font-medium">${t.name}</p>
          </article>`,
          )
          .join('')}
      </div>
      <div class="mt-8 flex items-center justify-center gap-4">
        <button type="button" data-carousel-prev aria-label="Prethodno" class="flex h-11 w-11 items-center justify-center rounded-full border border-ivory-200 hover:bg-petrol-700 hover:text-ivory-50 hover:border-petrol-700 transition-colors">←</button>
        <button type="button" data-carousel-next aria-label="Sledeće" class="flex h-11 w-11 items-center justify-center rounded-full border border-ivory-200 hover:bg-petrol-700 hover:text-ivory-50 hover:border-petrol-700 transition-colors">→</button>
      </div>
    </div>
  </div>`
}

// ---------- Prices ----------

function renderPrices(): string {
  return `
  <div class="text-center reveal">
    <p class="eyebrow justify-center">Cenovnik</p>
    <h2 class="mt-5 text-3xl md:text-5xl lg:text-[3.5rem] text-ink-900">Transparentne cene, bez skrivenih troškova</h2>
    <p class="mt-4 text-[13px] text-stone-500">Cene su informativne; konačan plan terapije dobijate nakon pregleda.</p>
  </div>

  <div class="mt-14 reveal">
    <div data-tabs role="tablist" aria-label="Kategorije cenovnika" class="flex w-full min-w-0 max-w-full gap-2 overflow-x-auto no-scrollbar pb-2 lg:flex-wrap lg:justify-center lg:gap-3 lg:overflow-visible lg:pb-0">
      ${prices
        .map(
          (cat, i) => `
        <button type="button" role="tab" data-tab-trigger data-tab-target="${cat.key}" aria-selected="${i === 0}" class="shrink-0 rounded-full px-5 py-3 text-[13px] font-medium tracking-wide transition-colors lg:px-6 ${i === 0 ? 'bg-petrol-700 text-ivory-50' : 'bg-ivory-100 text-stone-500 hover:text-ink-900'}">
          ${cat.label}
        </button>`,
        )
        .join('')}
    </div>

    <div class="mt-8">
      ${prices
        .map(
          (cat, i) => `
        <div role="tabpanel" data-tab-panel data-tab-key="${cat.key}" class="${i === 0 ? '' : 'hidden'}">
          ${cat.rows
            .map(
              (row) => `
            <div class="flex justify-between items-baseline py-4 border-b border-dashed border-ivory-200">
              <span class="text-ink-900">${row.name}</span>
              <span class="flex-1 mx-4 border-b border-dotted border-ivory-200 translate-y-[-4px]"></span>
              <span class="font-display text-xl text-petrol-700 whitespace-nowrap">${row.price}</span>
            </div>`,
            )
            .join('')}
        </div>`,
        )
        .join('')}
    </div>

    <div class="mt-10 text-center">
      <a href="#kontakt" class="btn-ghost">Zakažite besplatan pregled</a>
    </div>
  </div>`
}

// ---------- FAQ ----------

function renderFaq(): string {
  return `
  <div class="text-center reveal">
    <p class="eyebrow justify-center">Česta pitanja</p>
    <h2 class="mt-5 text-3xl md:text-5xl lg:text-[3.5rem] text-ink-900">Sve što želite da znate pre terapije</h2>
  </div>
  <div class="mt-14 max-w-3xl mx-auto reveal" data-accordion data-mode="single">
    ${faq
      .map(
        (item, i) => `
      <div data-accordion-item class="border-b border-ivory-200">
        <button type="button" data-accordion-trigger id="faq-trigger-${i}" aria-expanded="false" aria-controls="faq-panel-${i}" class="flex w-full items-center justify-between gap-4 py-6 text-left min-h-[44px]">
          <span class="text-lg text-ink-900">${item.question}</span>
          <span data-accordion-icon class="shrink-0 text-gold-500 text-2xl leading-none transition-transform duration-400">+</span>
        </button>
        <div data-accordion-panel id="faq-panel-${i}" role="region" aria-labelledby="faq-trigger-${i}" class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-400 ease-lux overflow-hidden">
          <div class="min-h-0">
            <p class="pb-6 text-[0.9375rem] leading-relaxed text-stone-500">${item.answer}</p>
          </div>
        </div>
      </div>`,
      )
      .join('')}
  </div>`
}

// ---------- CTA banner ----------

function renderCta(): string {
  return `
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true" style="background: radial-gradient(60% 60% at 50% 30%, rgba(200,169,107,0.18), transparent 70%);"></div>
  <div class="absolute inset-0 opacity-[0.035] pointer-events-none" aria-hidden="true">
    <svg width="100%" height="100%"><filter id="grain-cta"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#grain-cta)" /></svg>
  </div>
  <div class="relative reveal">
    <h2 class="text-3xl md:text-5xl lg:text-[3.5rem] text-ivory-50">Vaš novi osmeh počinje jednim pozivom</h2>
    <p class="mt-5 max-w-[52ch] mx-auto text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-stone-300">
      Zakažite besplatan pregled već danas i saznajte tačan plan i cenu vaše terapije.
    </p>
    <div class="mt-9 flex flex-col sm:flex-row items-center justify-center gap-6">
      <a href="#kontakt" class="btn-gold">Zakaži pregled</a>
      <a href="${site.phoneHref}" class="flex items-center gap-2 font-display text-2xl text-ivory-50 hover:text-gold-300 transition-colors">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z"/></svg>
        ${site.phone}
      </a>
    </div>
    <p class="mt-5 text-[13px] tracking-wide text-stone-300/80">Prvi pregled je besplatan.</p>
  </div>`
}

// ---------- Contact ----------

function renderContact(): string {
  return `
  <div class="grid lg:grid-cols-2 gap-14">
    <div class="reveal">
      <p class="eyebrow">Kontakt</p>
      <h2 class="mt-5 text-3xl md:text-5xl lg:text-[3.5rem] text-ink-900">Zakažite svoj termin</h2>
      <p class="mt-4 text-[0.9375rem] md:text-[1.0625rem] text-petrol-700 font-medium tracking-wide">Prvi pregled je besplatan.</p>

      <form id="contact-form" novalidate class="mt-10 rounded-[1.75rem] border border-ivory-200 bg-ivory-100 p-8 md:p-10">
        <div data-form-fields class="space-y-5">
          <div>
            <label for="field-name" class="block text-sm text-stone-500 mb-2">Ime i prezime*</label>
            <input id="field-name" name="name" type="text" autocomplete="name" class="field" data-field="name" />
            <p data-error-for="name" class="mt-1.5 hidden text-[13px] text-red-500"></p>
          </div>
          <div>
            <label for="field-phone" class="block text-sm text-stone-500 mb-2">Telefon*</label>
            <input id="field-phone" name="phone" type="tel" autocomplete="tel" class="field" data-field="phone" />
            <p data-error-for="phone" class="mt-1.5 hidden text-[13px] text-red-500"></p>
          </div>
          <div>
            <label for="field-email" class="block text-sm text-stone-500 mb-2">Email</label>
            <input id="field-email" name="email" type="email" autocomplete="email" class="field" data-field="email" />
            <p data-error-for="email" class="mt-1.5 hidden text-[13px] text-red-500"></p>
          </div>
          <div>
            <label for="field-service" class="block text-sm text-stone-500 mb-2">Usluga</label>
            <select id="field-service" name="service" class="field" data-field="service">
              ${services.map((s) => `<option value="${s.slug}">${s.name}</option>`).join('')}
              <option value="nesiguran" selected>Nisam siguran/na</option>
            </select>
          </div>
          <div>
            <label for="field-message" class="block text-sm text-stone-500 mb-2">Poruka</label>
            <textarea id="field-message" name="message" rows="4" class="field" data-field="message"></textarea>
          </div>
          <label class="flex items-start gap-3 text-[13px] text-stone-500">
            <input type="checkbox" name="consent" data-field="consent" class="mt-1 h-5 w-5 shrink-0 rounded border-ivory-200 text-gold-500 focus:ring-gold-500/30" />
            <span>Slažem se sa obradom podataka*</span>
          </label>
          <p data-error-for="consent" class="hidden text-[13px] text-red-500"></p>
        </div>

        <button type="submit" data-submit-btn class="btn-gold w-full mt-8">
          <span data-submit-label>Pošalji zahtev</span>
        </button>

        <div data-success class="hidden text-center py-6">
          <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-ink-900">
            <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L19 7"/></svg>
          </span>
          <h3 class="mt-5 font-display text-2xl text-ink-900">Hvala vam!</h3>
          <p class="mt-2 text-stone-500">Kontaktiraćemo vas u roku od 24h.</p>
          <button type="button" data-reset-form class="mt-5 text-petrol-500 hover:text-gold-600 text-sm font-medium">Pošalji novi zahtev</button>
        </div>
      </form>
    </div>

    <div class="reveal" data-delay="120">
      <div class="space-y-1">
        <div class="flex gap-4 py-5 border-b border-ivory-200">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-petrol-700">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>
          </span>
          <div><p class="text-sm text-stone-500">Adresa</p><p class="text-ink-900">${site.address}</p></div>
        </div>
        <div class="flex gap-4 py-5 border-b border-ivory-200">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-petrol-700">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z"/></svg>
          </span>
          <div><p class="text-sm text-stone-500">Telefon</p><a href="${site.phoneHref}" class="text-ink-900 hover:text-gold-600">${site.phone}</a></div>
        </div>
        <div class="flex gap-4 py-5 border-b border-ivory-200">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-petrol-700">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 6h18v12H3z"/><path d="M3 6l9 7 9-7"/></svg>
          </span>
          <div><p class="text-sm text-stone-500">Email</p><a href="mailto:${site.email}" class="text-ink-900 hover:text-gold-600">${site.email}</a></div>
        </div>
        <div class="flex gap-4 py-5 border-b border-ivory-200">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-petrol-700">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>
          </span>
          <div>
            <p class="text-sm text-stone-500">Radno vreme</p>
            ${site.hours.map((h) => `<p class="text-ink-900">${h.day}: ${h.time}</p>`).join('')}
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center gap-3">
        ${Object.entries(site.social)
          .map(
            ([key, href]) => `
          <a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${key}" class="flex h-11 w-11 items-center justify-center rounded-full bg-gold-100 text-petrol-700 hover:bg-gold-500 hover:text-ink-900 transition-colors">
            <span class="h-5 w-5 block">${socialIcons[key] ?? ''}</span>
          </a>`,
          )
          .join('')}
      </div>

      <div class="mt-8 overflow-hidden rounded-2xl aspect-[16/10] grayscale hover:grayscale-0 transition duration-700">
        <iframe
          title="Lokacija ordinacije na mapi"
          src="https://www.google.com/maps?q=Prizrenska+7+Stari+grad+Beograd&output=embed"
          class="h-full w-full border-0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>`
}

// ---------- Footer ----------

function renderFooter(): string {
  const navLinks: [string, string][] = [
    [homeSection('pocetna'), 'Početna'],
    [homeSection('usluge'), 'Usluge'],
    [homeSection('nas-rad'), 'Naš rad'],
    [homeSection('cenovnik'), 'Cenovnik'],
    [homeSection('o-nama'), 'O nama'],
    [homeSection('kontakt'), 'Kontakt'],
  ]
  return `
  <div class="container-lux">
    <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
      <div>
        ${brandLink({ showTagline: false })}
        <p class="mt-4 text-[0.9375rem] leading-relaxed text-stone-300 max-w-[32ch]">
          Premium stomatološka ordinacija posvećena bezbolnoj terapiji, digitalnoj dijagnostici i dugotrajnim rezultatima.
        </p>
        <div class="mt-6 flex items-center gap-4">${socialLinks('h-5 w-5')}</div>
      </div>
      <div>
        <p class="eyebrow">Navigacija</p>
        <ul class="mt-5 space-y-3">
          ${navLinks.map(([href, label]) => `<li><a href="${href}" class="hover:text-gold-500 transition-colors">${label}</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <p class="eyebrow">Usluge</p>
        <ul class="mt-5 space-y-3">
          ${services
            .slice(0, 6)
            .map((s) => `<li><a href="${serviceHref(s.slug)}" class="hover:text-gold-500 transition-colors">${s.name}</a></li>`)
            .join('')}
        </ul>
      </div>
      <div>
        <p class="eyebrow">Kontakt</p>
        <ul class="mt-5 space-y-3">
          <li>${site.address}</li>
          <li><a href="${site.phoneHref}" class="hover:text-gold-500 transition-colors">${site.phone}</a></li>
          <li><a href="mailto:${site.email}" class="hover:text-gold-500 transition-colors">${site.email}</a></li>
          <li>Pon–Pet 12:00–20:00 · Sub po pozivu</li>
        </ul>
      </div>
    </div>

    <div class="hairline mt-16"></div>

    <div class="pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] flex flex-col md:flex-row gap-3 justify-between text-[13px]">
      <span>© 2026 ${site.name}. Sva prava zadržana.</span>
      <span class="flex gap-4">
        <a href="#" class="hover:text-gold-500 transition-colors">Uslovi korišćenja</a>
        <a href="#" class="hover:text-gold-500 transition-colors">Politika privatnosti</a>
      </span>
    </div>
  </div>`
}

// ---------- Floating actions ----------

function renderFloatingActions(): string {
  return `
  <div class="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
    <button type="button" data-back-to-top aria-label="Nazad na vrh" class="hidden h-12 w-12 items-center justify-center rounded-full border border-ivory-200 bg-white/80 backdrop-blur shadow-soft transition-opacity">
      <svg class="h-5 w-5 text-ink-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>

    <div data-fab-menu class="flex flex-col items-end gap-3 opacity-0 pointer-events-none translate-y-2 transition-all duration-300">
      <a href="${site.whatsapp}" target="_blank" rel="noopener" data-fab-item style="transition-delay:0ms" class="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1s-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a2.7 2.7 0 0 0-.8 2c0 1.1.8 2.2 1 2.4.1.1 1.7 2.6 4.1 3.6.6.2 1 .4 1.4.5.6.2 1.1.1 1.5-.1.5-.2 1.4-.6 1.6-1.1s.2-.9.1-1l-.1-.1z"/></svg>
      </a>
      <a href="${site.viber}" data-fab-item style="transition-delay:60ms" class="flex h-12 w-12 items-center justify-center rounded-full bg-[#7360F2] text-white shadow-lift">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 3 5 3 9.6c0 2.6 1.3 4.7 3.4 6l-.5 3 3-1.7c1 .3 2.1.4 3.1.4 5.5 0 9-3 9-7.7S17.5 2 12 2zm3.9 10.6c-.2.5-1 1-1.5 1.1-.4.1-.9.1-3.2-.8-2.7-1.1-4.4-3.9-4.5-4.1-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-1.9 1-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.8 1.9c.1.2.1.4 0 .5l-.5.6c-.1.2-.2.3-.1.5.2.3.8 1.3 1.7 2.1 1.1 1 1.9 1.3 2.2 1.5.2.1.3.1.5-.1l.7-.8c.2-.2.4-.2.6-.1l1.7.9c.2.1.3.2.4.3.1.2.1.7-.1 1.4z"/></svg>
      </a>
      <a href="${site.phoneHref}" data-fab-item style="transition-delay:120ms" class="flex h-12 w-12 items-center justify-center rounded-full bg-petrol-700 text-ivory-50 shadow-lift">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z"/></svg>
      </a>
    </div>

    <button type="button" data-fab-main aria-label="Kontakt opcije" aria-expanded="false" class="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-ink-900 shadow-gold">
      <span class="absolute inset-0 rounded-full bg-gold-500 animate-ping opacity-40" aria-hidden="true"></span>
      <svg class="relative h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z"/></svg>
    </button>
  </div>`
}

const RENDERERS: Record<string, () => string> = {
  'topbar-social': renderTopbarSocial,
  header: renderHeader,
  stats: renderStats,
  steps: renderSteps,
  about: renderAbout,
  services: renderServices,
  spotlight: renderSpotlight,
  work: renderWork,
  advantages: renderAdvantages,
  testimonials: renderTestimonials,
  prices: renderPrices,
  faq: renderFaq,
  cta: renderCta,
  contact: renderContact,
  footer: renderFooter,
  'floating-actions': renderFloatingActions,
}

export function renderServicePage(slug: string): string {
  const page = getServicePage(slug)
  if (!page) {
    return `
    <div class="container-lux py-32 text-center">
      <h1 class="text-4xl text-ink-900">Usluga nije pronađena</h1>
      <a href="${homeSection('usluge')}" class="btn-gold mt-8 inline-flex">Nazad na usluge</a>
    </div>`
  }

  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 4)
  const hasSituations = Boolean(page.situations?.length)

  const benefitsSection = hasSituations
    ? `
  <section class="bg-ink-900 text-ivory-50 py-20 md:py-28">
    <div class="container-lux">
      <div class="reveal max-w-3xl">
        <p class="eyebrow text-gold-300">Indikacije</p>
        <h2 class="mt-5 text-3xl md:text-5xl text-ivory-50">${page.benefitsTitle}</h2>
      </div>
      <div class="mt-14 grid gap-8 md:grid-cols-3">
        ${page.situations!
          .map(
            (s, i) => `
          <article class="reveal border-t border-gold-500/40 pt-6" data-delay="${i * 80}">
            <span class="font-display text-4xl text-gold-500">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="mt-4 text-xl text-ivory-50">${s.title}</h3>
            <p class="mt-3 text-[0.9375rem] leading-relaxed text-stone-300">${s.text}</p>
          </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>`
    : `
  <section class="bg-ink-900 text-ivory-50 py-20 md:py-28">
    <div class="container-lux grid lg:grid-cols-2 gap-14">
      <div class="reveal">
        <p class="eyebrow text-gold-300">${page.benefitsTitle}</p>
        <h2 class="mt-5 text-3xl md:text-5xl text-ivory-50">Jasan odgovor na vašu situaciju</h2>
      </div>
      <ul class="reveal space-y-4" data-delay="80">
        ${page.benefits
          .map(
            (b) => `
          <li class="flex items-start gap-4 border-b border-white/10 pb-4">
            <svg class="mt-1 h-5 w-5 shrink-0 text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L19 7"/></svg>
            <span class="text-[0.9375rem] leading-relaxed text-stone-300">${b}</span>
          </li>`,
          )
          .join('')}
      </ul>
    </div>
  </section>`

  const featureSections = (page.featureSections ?? [])
    .map((section, index) => {
      const tone = index % 2 === 0 ? 'bg-ivory-50' : 'bg-ivory-100'
      return `
  <section id="${section.id}" class="${tone} py-20 md:py-28 scroll-mt-28">
    <div class="container-lux">
      <div class="reveal max-w-3xl">
        <p class="eyebrow">${section.eyebrow}</p>
        <h2 class="mt-5 text-3xl md:text-5xl text-ink-900">${section.title}</h2>
        ${section.text.map((t) => `<p class="mt-5 text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-stone-500">${t}</p>`).join('')}
        ${section.tagline ? `<p class="mt-8 font-display italic text-xl md:text-2xl text-petrol-700">${section.tagline}</p>` : ''}
      </div>
      ${
        section.steps?.length
          ? `
      <div class="mt-14">
        ${section.stepsTitle ? `<h3 class="reveal font-display text-2xl md:text-3xl text-ink-900">${section.stepsTitle}</h3>` : ''}
        <div class="mt-10 grid gap-8 md:grid-cols-2">
          ${section.steps
            .map(
              (step, i) => `
            <article class="reveal flex gap-5" data-delay="${i * 60}">
              <span class="font-display text-3xl text-gold-500 shrink-0">${String(i + 1).padStart(2, '0')}</span>
              <div>
                <h4 class="text-lg text-ink-900">${step.title}</h4>
                <p class="mt-2 text-[0.9375rem] leading-relaxed text-stone-500">${step.text}</p>
              </div>
            </article>`,
            )
            .join('')}
        </div>
      </div>`
          : ''
      }
      ${
        section.highlights?.length
          ? `
      <div class="mt-14 reveal">
        ${section.highlightsTitle ? `<h3 class="font-display text-2xl md:text-3xl text-ink-900">${section.highlightsTitle}</h3>` : ''}
        <ul class="mt-8 space-y-4 max-w-3xl">
          ${section.highlights
            .map(
              (item) => `
            <li class="flex items-start gap-4 border-b border-ivory-200 pb-4">
              <svg class="mt-1 h-5 w-5 shrink-0 text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L19 7"/></svg>
              <span class="text-[0.9375rem] leading-relaxed text-stone-500">${item}</span>
            </li>`,
            )
            .join('')}
        </ul>
      </div>`
          : ''
      }
    </div>
  </section>`
    })
    .join('')

  return `
  <section class="relative min-h-[72svh] flex items-end overflow-hidden">
    <img src="${page.heroImage}" alt="" class="absolute inset-0 h-full w-full object-cover ${page.heroImagePosition ?? 'object-center'}" loading="eager" fetchpriority="high" decoding="async" />
    <div class="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-900/75 to-ink-900/35"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40"></div>
    <div class="relative container-lux pb-16 pt-40 md:pb-24 md:pt-48">
      <a href="${homeSection('usluge')}" class="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.14em] text-ivory-50/70 hover:text-gold-300 transition-colors">
        ← Sve usluge
      </a>
      <p class="eyebrow text-gold-300 mt-8">${page.eyebrow}</p>
      <h1 class="mt-5 max-w-[18ch] text-[2.35rem] leading-[1.08] md:text-6xl lg:text-[4.5rem] text-ivory-50">${page.headline}</h1>
      <p class="mt-6 max-w-[48ch] text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-stone-300">${page.lead}</p>
      <div class="mt-10 flex flex-col sm:flex-row gap-4">
        <a href="${homeSection('kontakt')}" class="btn-gold">Zakažite besplatan pregled</a>
        <a href="${homeSection('cenovnik')}" class="btn-ghost text-ivory-50 border-ivory-50/25">Pogledajte cenovnik</a>
      </div>
      <p class="mt-4 text-[13px] tracking-wide text-stone-300/80">Prvi pregled je besplatan.</p>
    </div>
  </section>

  <section ${page.introId ? `id="${page.introId}"` : ''} class="bg-ivory-50 py-20 md:py-28 scroll-mt-28">
    <div class="container-lux grid lg:grid-cols-2 gap-14 items-center">
      <div class="reveal">
        <p class="eyebrow">O usluzi</p>
        <h2 class="mt-5 text-3xl md:text-5xl text-ink-900">${page.introTitle}</h2>
        ${page.introText.map((t) => `<p class="mt-5 text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-stone-500">${t}</p>`).join('')}
        ${page.introTagline ? `<p class="mt-8 font-display italic text-xl md:text-2xl text-petrol-700">${page.introTagline}</p>` : ''}
      </div>
      <div class="reveal overflow-hidden rounded-[1.75rem] shadow-lift bg-ivory-100" data-delay="100">
        <img src="${page.introImage}" alt="${page.eyebrow}" class="w-full aspect-[4/5] ${slug === 'implantologija' ? 'object-contain bg-white p-6' : `object-cover ${page.introImagePosition ?? 'object-center'}`}" loading="lazy" decoding="async" />
      </div>
    </div>
    ${
      page.introMethods?.length
        ? `
    <div class="container-lux mt-14 grid gap-8 md:grid-cols-2">
      ${page.introMethods
        .map(
          (method, i) => `
        <article ${method.id ? `id="${method.id}"` : ''} class="reveal scroll-mt-28 ${method.image ? '' : 'border-t border-gold-500/50 pt-6'}" data-delay="${i * 80}">
          ${
            method.image
              ? `<div class="overflow-hidden rounded-[1.5rem] aspect-[4/5] mb-6">
              <img src="${method.image}" alt="${method.title}" class="h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>`
              : ''
          }
          <h3 class="font-display text-2xl text-ink-900">${method.title}</h3>
          <p class="mt-3 text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-stone-500">${method.text}</p>
        </article>`,
        )
        .join('')}
    </div>`
        : ''
    }
  </section>

  ${benefitsSection}

  ${page.featuresBeforeProcess ? featureSections : ''}

  <section class="bg-ivory-100 py-20 md:py-28">
    <div class="container-lux">
      <div class="text-center reveal max-w-3xl mx-auto">
        <p class="eyebrow justify-center">${page.processEyebrow ?? 'Proces'}</p>
        <h2 class="mt-5 text-3xl md:text-5xl text-ink-900">${page.processTitle}</h2>
      </div>
      <div class="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        ${page.process
          .map(
            (step, i) => `
          <article class="reveal" data-delay="${i * 80}">
            <span class="font-display text-4xl text-gold-500">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="mt-4 text-xl text-ink-900">${step.title}</h3>
            <p class="mt-3 text-[0.9375rem] leading-relaxed text-stone-500">${step.text}</p>
          </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>

  ${page.featuresBeforeProcess ? '' : featureSections}

  ${
    page.gallery?.length
      ? `
  <section class="bg-ivory-50 py-20 md:py-28">
    <div class="container-lux">
      <div class="reveal text-center">
        <p class="eyebrow justify-center">Galerija</p>
      </div>
      <div class="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
        ${page.gallery
          .map((img, i) => {
            const tall = i % 4 === 1
            return `
          <button type="button" data-lightbox data-lightbox-index="${i}" class="reveal block w-full overflow-hidden rounded-2xl ${tall ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}" data-delay="${(i % 4) * 60}">
            <img src="${img.src}" alt="${img.alt}" class="h-full w-full object-cover transition-transform duration-700 ease-lux hover:scale-[1.06]" loading="lazy" decoding="async" />
          </button>`
          })
          .join('')}
      </div>
    </div>
  </section>`
      : ''
  }

  <section class="relative overflow-hidden bg-petrol-700 py-20 md:py-28 text-center text-ivory-50">
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true" style="background: radial-gradient(60% 60% at 50% 30%, rgba(200,169,107,0.18), transparent 70%);"></div>
    <div class="relative container-lux reveal">
      <h2 class="text-3xl md:text-5xl text-ivory-50">${page.ctaTitle}</h2>
      <p class="mt-5 max-w-[48ch] mx-auto text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-stone-300">${page.ctaText}</p>
      <a href="${homeSection('kontakt')}" class="btn-gold mt-9 inline-flex">Zakažite besplatan pregled</a>
      <p class="mt-4 text-[13px] tracking-wide text-stone-300/80">Prvi pregled je besplatan.</p>
    </div>
  </section>

  <section class="bg-ivory-50 py-20 md:py-28">
    <div class="container-lux">
      <div class="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p class="eyebrow">Još usluga</p>
          <h2 class="mt-5 text-3xl md:text-4xl text-ink-900">Pogledajte i ostale specijalnosti</h2>
        </div>
        <a href="${homeSection('usluge')}" class="btn-ghost">Sve usluge</a>
      </div>
      <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${otherServices
          .map(
            (s) => `
          <a href="${serviceHref(s.slug)}" class="group rounded-2xl border border-ivory-200 bg-white p-6 transition-colors hover:border-gold-500/40">
            <span class="font-display text-2xl text-ink-900 group-hover:text-petrol-700 transition-colors">${s.name}</span>
            <p class="mt-3 text-[13px] leading-relaxed text-stone-500">${s.description}</p>
            <span class="mt-5 inline-flex text-gold-600 text-sm tracking-wide">Saznajte više →</span>
          </a>`,
          )
          .join('')}
      </div>
    </div>
  </section>`
}

export function renderTeamPage(): string {
  return `
  <section class="relative min-h-[60svh] flex items-end overflow-hidden">
    <img src="/assets/o-nama/o_nama.jpg" alt="" class="absolute inset-0 h-full w-full object-cover object-center" loading="eager" fetchpriority="high" decoding="async" />
    <div class="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-900/80 to-ink-900/40"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40"></div>
    <div class="relative container-lux pb-16 pt-40 md:pb-24 md:pt-48">
      <a href="${homeSection('o-nama')}" class="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.14em] text-ivory-50/70 hover:text-gold-300 transition-colors">
        ← O nama
      </a>
      <p class="eyebrow text-gold-300 mt-8">Naš tim</p>
      <h1 class="mt-5 max-w-[16ch] text-[2.35rem] leading-[1.08] md:text-6xl lg:text-[4.5rem] text-ivory-50">Ljudi iza vašeg novog osmeha</h1>
      <p class="mt-6 max-w-[52ch] text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-stone-300">
        ${teamIntro}
      </p>
    </div>
  </section>

  <section class="bg-ivory-50 py-20 md:py-28 lg:py-36">
    <div class="container-lux">
      <div class="space-y-20 md:space-y-28">
        ${teamMembers
          .map(
            (m, i) => `
          <article class="reveal grid gap-10 lg:grid-cols-2 lg:gap-16 items-start ${i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}" data-delay="80">
            <div class="overflow-hidden rounded-[1.5rem] aspect-[4/5] max-w-md mx-auto lg:mx-0 lg:max-w-none">
              <img src="${m.image}" alt="${m.name}" class="h-full w-full object-cover ${m.imagePosition ?? 'object-top'}" loading="lazy" decoding="async" />
            </div>
            <div>
              <h2 class="font-display text-3xl md:text-4xl text-ink-900">${m.name}</h2>
              <p class="mt-2 text-[13px] uppercase tracking-[0.14em] text-gold-600">${m.role}</p>
              ${m.bio.map((p) => `<p class="mt-5 text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-stone-500">${p}</p>`).join('')}
            </div>
          </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="relative overflow-hidden bg-petrol-700 py-20 md:py-28 text-center text-ivory-50">
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true" style="background: radial-gradient(60% 60% at 50% 30%, rgba(200,169,107,0.18), transparent 70%);"></div>
    <div class="relative container-lux reveal">
      <h2 class="text-3xl md:text-5xl text-ivory-50">Spremni da započnete terapiju?</h2>
      <p class="mt-5 max-w-[48ch] mx-auto text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-stone-300">
        Zakažite besplatan pregled i upoznajte tim koji će voditi vašu terapiju od prvog dana.
      </p>
      <a href="${homeSection('kontakt')}" class="btn-gold mt-9 inline-flex">Zakažite besplatan pregled</a>
      <p class="mt-4 text-[13px] tracking-wide text-stone-300/80">Prvi pregled je besplatan.</p>
    </div>
  </section>`
}

export function mountSections(): void {
  $$('[data-render]').forEach((el) => {
    const key = el.getAttribute('data-render')
    if (!key) return
    const renderer = RENDERERS[key]
    if (!renderer) return
    el.innerHTML = renderer()
  })
}
