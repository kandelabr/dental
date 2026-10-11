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

const META_COPY: Record<Locale, { homeDescription: string; locationSuffix: string; homeLabel: string; teamLabel: string }> = {
  sr: {
    homeDescription:
      'Stomatološka ordinacija House of Smile u centru Beograda. Implantologija, protetika, ortodoncija, oralna hirurgija i estetska stomatologija.',
    locationSuffix: 'House of Smile, Stari grad, Beograd. Zakažite pregled.',
    homeLabel: 'Početna',
    teamLabel: 'Naš tim',
  },
  en: {
    homeDescription:
      'House of Smile dental clinic in central Belgrade. Dental implants, prosthodontics, orthodontics, oral surgery and cosmetic dentistry.',
    locationSuffix: 'House of Smile, central Belgrade. Book an appointment.',
    homeLabel: 'Home',
    teamLabel: 'Our team',
  },
  de: {
    homeDescription:
      'Zahnarztpraxis House of Smile im Zentrum von Belgrad. Implantologie, Prothetik, Kieferorthopädie, Oralchirurgie und ästhetische Zahnmedizin.',
    locationSuffix: 'House of Smile im Zentrum von Belgrad. Termin vereinbaren.',
    homeLabel: 'Startseite',
    teamLabel: 'Unser Team',
  },
  ru: {
    homeDescription:
      'Стоматологическая клиника House of Smile в центре Белграда. Имплантация, протезирование, ортодонтия, хирургия и эстетическая стоматология.',
    locationSuffix: 'House of Smile в центре Белграда. Запишитесь на приём.',
    homeLabel: 'Главная',
    teamLabel: 'Наша команда',
  },
}

const SEO_TITLES: Record<Locale, { home: string; team: string; services: Record<string, string> }> = {
  sr: {
    home: 'Stomatolog Beograd | House of Smile, Stari grad',
    team: 'Stomatološki tim Beograd | House of Smile',
    services: {
      implantologija: 'Zubni implantati Beograd | House of Smile',
      'estetska-stomatologija': 'Estetska stomatologija Beograd | House of Smile',
      protetika: 'Zubna protetika Beograd | House of Smile',
      ortodoncija: 'Ortodoncija Beograd | House of Smile',
      'opsta-stomatologija': 'Opšta stomatologija Beograd | House of Smile',
      parodontologija: 'Parodontologija Beograd | House of Smile',
      'oralna-hirurgija': 'Oralna hirurgija Beograd | House of Smile',
      'decja-stomatologija': 'Dečji stomatolog Beograd | House of Smile',
    },
  },
  en: {
    home: 'Dentist in Belgrade | House of Smile',
    team: 'Dental Team in Belgrade | House of Smile',
    services: {
      implantologija: 'Dental Implants Belgrade | House of Smile',
      'estetska-stomatologija': 'Cosmetic Dentistry Belgrade | House of Smile',
      protetika: 'Dental Prosthetics Belgrade | House of Smile',
      ortodoncija: 'Orthodontics Belgrade | House of Smile',
      'opsta-stomatologija': 'General Dentistry Belgrade | House of Smile',
      parodontologija: 'Periodontics Belgrade | House of Smile',
      'oralna-hirurgija': 'Oral Surgery Belgrade | House of Smile',
      'decja-stomatologija': 'Pediatric Dentist Belgrade | House of Smile',
    },
  },
  de: {
    home: 'Zahnarzt in Belgrad | House of Smile',
    team: 'Zahnarztteam in Belgrad | House of Smile',
    services: {
      implantologija: 'Zahnimplantate Belgrad | House of Smile',
      'estetska-stomatologija': 'Ästhetische Zahnmedizin Belgrad | House of Smile',
      protetika: 'Zahnersatz Belgrad | House of Smile',
      ortodoncija: 'Kieferorthopädie Belgrad | House of Smile',
      'opsta-stomatologija': 'Allgemeine Zahnmedizin Belgrad | House of Smile',
      parodontologija: 'Parodontologie Belgrad | House of Smile',
      'oralna-hirurgija': 'Oralchirurgie Belgrad | House of Smile',
      'decja-stomatologija': 'Kinderzahnarzt Belgrad | House of Smile',
    },
  },
  ru: {
    home: 'Стоматолог в Белграде | House of Smile',
    team: 'Стоматологи в Белграде | House of Smile',
    services: {
      implantologija: 'Имплантация зубов в Белграде | House of Smile',
      'estetska-stomatologija': 'Эстетическая стоматология Белград | House of Smile',
      protetika: 'Протезирование зубов в Белграде | House of Smile',
      ortodoncija: 'Ортодонт в Белграде | House of Smile',
      'opsta-stomatologija': 'Лечение зубов в Белграде | House of Smile',
      parodontologija: 'Пародонтолог в Белграде | House of Smile',
      'oralna-hirurgija': 'Хирургическая стоматология Белград | House of Smile',
      'decja-stomatologija': 'Детский стоматолог в Белграде | House of Smile',
    },
  },
}

const runtimeEnv = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> }
}).process?.env
const GOOGLE_SITE_VERIFICATION = runtimeEnv?.GOOGLE_SITE_VERIFICATION?.trim()

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
  if (pagePath === 'index.html') return META_COPY[locale].homeDescription
  if (pagePath === 'nas-tim.html') return `${m.team.intro} ${META_COPY[locale].locationSuffix}`
  const serviceMatch = pagePath.match(/^usluge\/(.+)\.html$/)
  if (serviceMatch?.[1]) {
    const page = getServicePage(serviceMatch[1])
    if (page?.lead) return `${page.lead} ${META_COPY[locale].locationSuffix}`
  }
  return META_COPY[locale].homeDescription
}

function pageTitle(locale: Locale, pagePath: string): string {
  if (pagePath === 'index.html') return SEO_TITLES[locale].home
  if (pagePath === 'nas-tim.html') return SEO_TITLES[locale].team
  const serviceMatch = pagePath.match(/^usluge\/(.+)\.html$/)
  if (serviceMatch?.[1] && SEO_TITLES[locale].services[serviceMatch[1]]) {
    return SEO_TITLES[locale].services[serviceMatch[1]]!
  }
  return SEO_TITLES[locale].home
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
  const businessId = `${SITE_ORIGIN}/#dentist`
  const websiteId = `${SITE_ORIGIN}/#website`
  const webpageId = `${canonical}#webpage`
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${SITE_ORIGIN}/`,
      name: site.name,
      inLanguage: ['sr-RS', 'en', 'de', 'ru'],
      publisher: { '@id': businessId },
    },
    {
      '@type': pagePath === 'nas-tim.html' ? 'AboutPage' : 'WebPage',
      '@id': webpageId,
      url: canonical,
      name: title,
      description,
      inLanguage: LOCALE_HTML_LANG[locale],
      isPartOf: { '@id': websiteId },
      about: { '@id': businessId },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/assets/o-nama/o_nama.jpg`,
        contentUrl: `${SITE_ORIGIN}/assets/o-nama/o_nama.jpg`,
        width: 1584,
        height: 993,
      },
    },
  ]

  if (pagePath === 'index.html') {
    graph.unshift({
      '@type': ['Dentist', 'LocalBusiness'],
      '@id': businessId,
      name: site.name,
      description: META_COPY[locale].homeDescription,
      url: `${SITE_ORIGIN}/`,
      telephone: site.phoneHref.replace('tel:', ''),
      email: site.email,
      image: `${SITE_ORIGIN}/assets/o-nama/o_nama.jpg`,
      logo: `${SITE_ORIGIN}/assets/logo.jpg`,
      priceRange: '$$',
      currenciesAccepted: 'RSD, EUR',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Prizrenska 7',
        addressLocality: 'Beograd',
        addressRegion: 'Stari grad',
        postalCode: '11000',
        addressCountry: 'RS',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 44.813697,
        longitude: 20.458852,
      },
      hasMap: 'https://www.google.com/maps/search/?api=1&query=44.813697%2C20.458852',
      areaServed: {
        '@type': 'City',
        name: 'Beograd',
      },
      sameAs: [site.social.instagram, site.social.facebook],
      availableLanguage: ['Serbian', 'English', 'German', 'Russian'],
      medicalSpecialty: 'Dentistry',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '12:00',
          closes: '20:00',
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: site.phoneHref.replace('tel:', ''),
        contactType: 'appointments',
        availableLanguage: ['Serbian', 'English', 'German', 'Russian'],
      },
    })

    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: getMessages(locale).faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  } else {
    const serviceMatch = pagePath.match(/^usluge\/(.+)\.html$/)
    const page = serviceMatch?.[1] ? getServicePage(serviceMatch[1]) : null
    const currentLabel = page?.eyebrow ?? META_COPY[locale].teamLabel
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: META_COPY[locale].homeLabel,
          item: `${SITE_ORIGIN}${localePrefix(locale) || '/'}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: currentLabel,
          item: canonical,
        },
      ],
    })

    if (page) {
      graph.push({
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name: page.eyebrow,
        description: page.lead,
        url: canonical,
        provider: { '@id': businessId },
        areaServed: { '@type': 'City', name: 'Beograd' },
        serviceType: page.eyebrow,
      })
    }
  }

  const tags = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[locale]}" />`,
    `<meta property="og:image" content="${SITE_ORIGIN}/assets/o-nama/o_nama.jpg" />`,
    `<meta property="og:image:width" content="1584" />`,
    `<meta property="og:image:height" content="993" />`,
    `<meta property="og:image:alt" content="${escapeHtml(`${site.name} — stomatološka ordinacija u Beogradu`)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${SITE_ORIGIN}/assets/o-nama/o_nama.jpg" />`,
    `<meta name="geo.region" content="RS-00" />`,
    `<meta name="geo.placename" content="Beograd" />`,
    `<meta name="geo.position" content="44.813697;20.458852" />`,
    `<meta name="ICBM" content="44.813697, 20.458852" />`,
    `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    }).replace(/</g, '\\u003c')}</script>`,
  ]

  if (GOOGLE_SITE_VERIFICATION) {
    tags.push(
      `<meta name="google-site-verification" content="${escapeHtml(GOOGLE_SITE_VERIFICATION)}" />`,
    )
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
