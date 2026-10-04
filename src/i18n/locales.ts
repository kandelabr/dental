export const LOCALES = ['sr', 'en', 'de', 'ru'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'sr'

/** Locales that use a URL prefix (`/en`, `/de`, `/ru`). Serbian stays at `/`. */
export const PREFIX_LOCALES = ['en', 'de', 'ru'] as const satisfies readonly Locale[]

export type PrefixedLocale = (typeof PREFIX_LOCALES)[number]

export const LOCALE_LABELS: Record<Locale, string> = {
  sr: 'SR',
  en: 'EN',
  de: 'DE',
  ru: 'RU',
}

/** BCP 47 tags for <html lang> and hreflang */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  sr: 'sr',
  en: 'en',
  de: 'de',
  ru: 'ru',
}

export const LOCALE_HREFLANG: Record<Locale, string> = {
  sr: 'sr-RS',
  en: 'en',
  de: 'de',
  ru: 'ru',
}

export const LOCALE_COOKIE = 'hos_locale'

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value)
}

export function isPrefixedLocale(value: string): value is PrefixedLocale {
  return (PREFIX_LOCALES as readonly string[]).includes(value)
}
