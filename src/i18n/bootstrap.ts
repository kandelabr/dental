import { DEFAULT_LOCALE, LOCALE_HTML_LANG, type Locale } from './locales'
import { getLocaleCookie, isLikelyBot, setLocaleCookie } from './cookie'
import { getMessages, initLocaleFromDocument, setLocale } from './messages'
import { localizeCurrentUrl, stripLocalePrefix, withLocale } from '../lib/paths'

/**
 * Initialize locale from URL / data-locale, apply document lang,
 * optionally redirect when cookie prefers another locale (never for bots).
 */
export function bootstrapI18n(options?: { redirectFromCookie?: boolean }): Locale {
  const locale = initLocaleFromDocument()

  if (options?.redirectFromCookie !== false) {
    maybeRedirectFromCookie(locale)
  }

  applyDocumentMeta(locale)
  return locale
}

function maybeRedirectFromCookie(pathLocale: Locale): void {
  if (typeof location === 'undefined') return
  if (isLikelyBot()) return

  const preferred = getLocaleCookie()
  if (!preferred || preferred === pathLocale) return

  // Only auto-redirect from the default (unprefixed) locale to a stored preference.
  // Explicit /en /de /ru URLs always win — important for SEO and shareable links.
  if (pathLocale !== DEFAULT_LOCALE) return

  const targetPath = stripLocalePrefix(location.pathname)
  const next = `${withLocale(targetPath, preferred)}${location.search}${location.hash}`
  const current = `${location.pathname}${location.search}${location.hash}`
  if (next !== current) location.replace(next)
}

export function applyDocumentMeta(locale: Locale): void {
  const m = getMessages(locale)
  document.documentElement.lang = LOCALE_HTML_LANG[locale]
  document.documentElement.setAttribute('data-locale', locale)

  if (!document.body.dataset.service && !document.body.dataset.team) {
    document.title = m.meta.home.title
  }

  const skip = document.getElementById('skip-link')
  if (skip) skip.textContent = m.ui.skipLink
}

export function rememberAndGo(locale: Locale): void {
  setLocale(locale)
  setLocaleCookie(locale)
  location.assign(localizeCurrentUrl(locale))
}
