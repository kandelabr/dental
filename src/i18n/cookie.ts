import { LOCALE_COOKIE, type Locale, isLocale } from './locales'

const MAX_AGE_DAYS = 365

export function getLocaleCookie(): Locale | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`))
  const value = match?.[1] ? decodeURIComponent(match[1]) : null
  return isLocale(value) ? value : null
}

export function setLocaleCookie(locale: Locale): void {
  const maxAge = MAX_AGE_DAYS * 24 * 60 * 60
  const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`
}

export function isLikelyBot(userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''): boolean {
  return /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|redditbot|twitterbot|linkedinbot|whatsapp|telegram|discord|preview/i.test(
    userAgent,
  )
}
