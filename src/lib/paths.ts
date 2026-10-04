import { DEFAULT_LOCALE, type Locale, isPrefixedLocale } from '../i18n/locales'
import { detectLocaleFromPath, getLocale } from '../i18n/messages'
import { getRuntimePathname } from '../i18n/prerender-context'

/** Strip optional locale prefix and normalize pathname */
export function stripLocalePrefix(pathname: string): string {
  const clean = pathname.startsWith('/') ? pathname : `/${pathname}`
  const parts = clean.split('/')
  if (parts[1] && isPrefixedLocale(parts[1])) {
    const rest = parts.slice(2).join('/')
    return rest ? `/${rest}` : '/'
  }
  return clean || '/'
}

export function localePrefix(locale: Locale = getLocale()): string {
  return locale === DEFAULT_LOCALE ? '' : `/${locale}`
}

/** Prefix a site-absolute path with the active (or given) locale */
export function withLocale(path: string, locale: Locale = getLocale()): string {
  if (path.startsWith('#')) {
    if (isSubPage()) {
      const home = localePrefix(locale)
      return `${home || ''}/#${path.slice(1)}`.replace(/\/{2,}/g, '/')
    }
    return path
  }

  const normalized = path.startsWith('/') ? path : `/${path}`
  // Support "/#section" form used by homeSection on subpages
  if (normalized.startsWith('/#')) {
    const home = localePrefix(locale)
    return `${home || ''}${normalized}`.replace(/\/{2,}/g, '/')
  }

  const bare = stripLocalePrefix(normalized)
  const prefix = localePrefix(locale)
  if (bare === '/') return prefix || '/'
  return `${prefix}${bare}`
}

/** Swap locale for the current URL (keeps path/query/hash under that locale) */
export function localizeCurrentUrl(nextLocale: Locale): string {
  const bare = stripLocalePrefix(getRuntimePathname())
  const prefix = localePrefix(nextLocale)
  const path = bare === '/' ? prefix || '/' : `${prefix}${bare}`
  const search = typeof location !== 'undefined' ? location.search : ''
  const hash = typeof location !== 'undefined' ? location.hash : ''
  return `${path}${search}${hash}`
}

export function isSubPage(): boolean {
  const bare = stripLocalePrefix(getRuntimePathname())
  return /\/usluge\//.test(bare) || /\/nas-tim\.html$/.test(bare)
}

export function homeSection(id: string): string {
  if (isSubPage()) return withLocale(`/#${id}`)
  return `#${id}`
}

export function homeHref(): string {
  if (isSubPage()) return withLocale('/')
  return '#pocetna'
}

export function serviceHref(slug: string): string {
  return withLocale(`/usluge/${slug}.html`)
}

export function teamHref(): string {
  return withLocale('/nas-tim.html')
}

export function currentBarePath(): string {
  return stripLocalePrefix(getRuntimePathname())
}

export function activeLocale(): Locale {
  return getLocale() || detectLocaleFromPath(getRuntimePathname())
}
