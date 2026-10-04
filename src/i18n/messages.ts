import sr from './sr.json'
import en from './en.json'
import de from './de.json'
import ru from './ru.json'
import { DEFAULT_LOCALE, type Locale, isLocale } from './locales'

export type Messages = typeof sr

const catalogs: Record<Locale, Messages> = {
  sr: sr as Messages,
  en: en as Messages,
  de: de as Messages,
  ru: ru as Messages,
}

let currentLocale: Locale = DEFAULT_LOCALE

export function getLocale(): Locale {
  return currentLocale
}

export function setLocale(locale: Locale): void {
  currentLocale = locale
}

export function detectLocaleFromPath(pathname = typeof location !== 'undefined' ? location.pathname : '/'): Locale {
  const seg = pathname.replace(/^\//, '').split('/')[0] ?? ''
  return isLocale(seg) && seg !== 'sr' ? seg : DEFAULT_LOCALE
}

export function initLocaleFromDocument(): Locale {
  const attr = document.documentElement.getAttribute('data-locale')
  const locale = isLocale(attr) ? attr : detectLocaleFromPath()
  setLocale(locale)
  document.documentElement.lang = locale === 'sr' ? 'sr' : locale
  document.documentElement.setAttribute('data-locale', locale)
  return locale
}

export function getMessages(locale: Locale = currentLocale): Messages {
  return catalogs[locale] ?? catalogs[DEFAULT_LOCALE]
}

/** Dot-path lookup, e.g. `ui.nav.items.home` */
export function t(path: string, locale: Locale = currentLocale): string {
  const parts = path.split('.')
  let node: unknown = getMessages(locale)
  for (const part of parts) {
    if (node == null || typeof node !== 'object') return path
    node = (node as Record<string, unknown>)[part]
  }
  return typeof node === 'string' ? node : path
}
