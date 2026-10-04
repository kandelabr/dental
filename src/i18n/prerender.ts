import { RENDERERS, renderServicePage, renderTeamPage } from '../lib/render'
import { localePrefix } from '../lib/paths'
import { LOCALE_HTML_LANG, type Locale } from './locales'
import { getMessages, setLocale } from './messages'
import { setPrerenderPath } from './prerender-context'
import { getServicePage, getSite, ui } from './content'

const SITE_ORIGIN = String(
  (import.meta as ImportMeta & { env?: { VITE_SITE_ORIGIN?: string } }).env?.VITE_SITE_ORIGIN ||
    'https://www.houseofsmilebgd.rs',
).replace(/\/$/, '')

const OG_LOCALE: Record<Locale, string> = {
  sr: 'sr_RS',
  en: 'en_US',
  de: 'de_DE',
  ru: 'ru_RU',
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function barePathFromPage(pagePath: string): string {
  if (pagePath === 'index.html') return '/'
  return `/${pagePath}`
}

function canonicalPath(locale: Locale, pagePath: string): string {
  const bare = barePathFromPage(pagePath)
  const prefix = localePrefix(locale)
  if (bare === '/') return prefix || '/'
  return `${prefix}${bare}`
}

function pageDescription(locale: Locale, pagePath: string): string {
  const m = getMessages(locale)
  if (pagePath === 'index.html') return m.home.hero.lead
  if (pagePath === 'nas-tim.html') return m.team.intro
  const serviceMatch = pagePath.match(/^usluge\/(.+)\.html$/)
  if (serviceMatch?.[1]) {
    const page = getServicePage(serviceMatch[1])
    if (page?.lead) return page.lead
  }
  return m.home.hero.lead
}

function pageTitle(locale: Locale, pagePath: string): string {
  const m = getMessages(locale)
  if (pagePath === 'index.html') return m.meta.home.title
  if (pagePath === 'nas-tim.html') return m.meta.team.title
  const serviceMatch = pagePath.match(/^usluge\/(.+)\.html$/)
  if (serviceMatch?.[1] && m.meta.services[serviceMatch[1] as keyof typeof m.meta.services]) {
    return m.meta.services[serviceMatch[1] as keyof typeof m.meta.services]
  }
  return m.meta.home.title
}

function fillRenderSlots(html: string): string {
  return html.replace(/<([a-zA-Z0-9-]+)([^>]*\sdata-render="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g, (full, tag, attrs, key: string) => {
    const renderer = RENDERERS[key]
    if (!renderer) return full
    return `<${tag}${attrs}>${renderer()}</${tag}>`
  })
}

function fillMainContent(html: string, pagePath: string): string {
  if (pagePath === 'nas-tim.html') {
    return html.replace(
      /(<main\b[^>]*\bdata-team-content\b[^>]*>)([\s\S]*?)(<\/main>)/i,
      `$1${renderTeamPage()}$3`,
    )
  }

  const serviceMatch = pagePath.match(/^usluge\/(.+)\.html$/)
  if (serviceMatch?.[1]) {
    return html.replace(
      /(<main\b[^>]*\bdata-service-content\b[^>]*>)([\s\S]*?)(<\/main>)/i,
      `$1${renderServicePage(serviceMatch[1])}$3`,
    )
  }

  return html
}

function applyAriaLabels(html: string): string {
  const aria = ui().aria
  const map: Record<string, string> = {
    pocetna: aria.homeSection,
    statistika: aria.stats,
    proces: aria.steps,
    'o-nama': aria.about,
    usluge: aria.services,
    spotlight: aria.spotlight,
    'nas-rad': aria.work,
    'zasto-mi': aria.advantages,
    iskustva: aria.testimonials,
    cenovnik: aria.prices,
    faq: aria.faq,
    kontakt: aria.contact,
  }

  let out = html
  for (const [id, label] of Object.entries(map)) {
    out = out.replace(
      new RegExp(`(<section\\b[^>]*\\bid="${id}"[^>]*\\baria-label=")[^"]*(")`, 'i'),
      `$1${escapeHtml(label)}$2`,
    )
  }

  // CTA section has no id
  out = out.replace(
    /(<section\b[^>]*\baria-label=")Zakažite pregled(")/i,
    `$1${escapeHtml(aria.cta)}$2`,
  )

  return out
}

function injectHeadSeo(html: string, locale: Locale, pagePath: string): string {
  const title = pageTitle(locale, pagePath)
  const description = pageDescription(locale, pagePath)
  const canonical = `${SITE_ORIGIN}${canonicalPath(locale, pagePath)}`
  const site = getSite()
  const skip = ui().skipLink

  const jsonLd =
    pagePath === 'index.html'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Dentist',
          name: site.name,
          url: `${SITE_ORIGIN}${localePrefix(locale) || '/'}`,
          telephone: site.phoneHref.replace('tel:', ''),
          email: site.email,
          image: `${SITE_ORIGIN}/assets/logo.jpg`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Prizrenska 7',
            addressLocality: 'Beograd',
            addressRegion: 'Stari grad',
            addressCountry: 'RS',
          },
          sameAs: [site.social.instagram, site.social.facebook],
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '12:00',
              closes: '20:00',
            },
          ],
        }
      : null

  const tags = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[locale]}" />`,
    `<meta property="og:image" content="${SITE_ORIGIN}/assets/o-nama/o_nama.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  ]

  if (jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`)
  }

  let out = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`)

  // Avoid duplicating SEO tags on rebuild
  if (!out.includes('rel="canonical"')) {
    out = out.replace('</head>', `    ${tags.join('\n    ')}\n  </head>`)
  }

  out = out.replace(
    /(<a\b[^>]*\bid="skip-link"[^>]*>)([\s\S]*?)(<\/a>)/i,
    `$1${escapeHtml(skip)}$3`,
  )

  // Mark body as prerendered for optional client hints
  if (!/\bdata-prerendered\b/.test(out)) {
    out = out.replace(/<body\b([^>]*)>/i, `<body data-prerendered="true"$1>`)
  }

  return out
}

/**
 * Build-time / transform-time HTML fill: locale content in the document source for crawlers.
 * Client JS still re-hydrates the same slots for interactivity.
 */
export function prerenderPage(html: string, locale: Locale, pagePath: string): string {
  const runtimePath =
    locale === 'sr'
      ? barePathFromPage(pagePath)
      : `${localePrefix(locale)}${barePathFromPage(pagePath) === '/' ? '/' : barePathFromPage(pagePath)}`

  setLocale(locale)
  setPrerenderPath(runtimePath.endsWith('.html') || runtimePath === '/' ? (runtimePath === '/' ? '/' : runtimePath) : runtimePath)

  // Prefer concrete file path for subpage detection
  if (pagePath !== 'index.html') {
    setPrerenderPath(`/${pagePath}`)
  } else {
    setPrerenderPath('/')
  }

  let out = html
  out = out.replace(/<html\b([^>]*)>/i, (_m, attrs: string) => {
    let next = String(attrs).replace(/\slang="[^"]*"/i, '').replace(/\sdata-locale="[^"]*"/i, '')
    return `<html lang="${LOCALE_HTML_LANG[locale]}" data-locale="${locale}"${next}>`
  })

  out = fillRenderSlots(out)
  out = fillMainContent(out, pagePath)
  out = applyAriaLabels(out)
  out = injectHeadSeo(out, locale, pagePath)

  setPrerenderPath(null)
  return out
}
