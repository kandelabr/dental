import { $$, on } from '../lib/dom'
import { LOCALES, LOCALE_LABELS, type Locale } from '../i18n/locales'
import { getLocale } from '../i18n/messages'
import { rememberAndGo } from '../i18n/bootstrap'
import { setLocaleCookie } from '../i18n/cookie'

export function initLangSwitch(): void {
  const roots = $$<HTMLElement>('[data-lang-switch]')
  if (!roots.length) return

  const active = getLocale()
  roots.forEach((root) => {
    root.innerHTML = LOCALES.map((locale) => {
      const isActive = locale === active
      return `<button type="button" data-lang-option="${locale}" class="text-[12px] tracking-[0.14em] uppercase transition-colors ${
        isActive ? 'text-gold-500' : 'text-current/55 hover:text-gold-500'
      }" aria-pressed="${isActive}" aria-label="${LOCALE_LABELS[locale]}">${LOCALE_LABELS[locale]}</button>`
    }).join('<span class="text-current/25 mx-1" aria-hidden="true">|</span>')

    $$<HTMLButtonElement>('[data-lang-option]', root).forEach((btn) => {
      on(btn, 'click', () => {
        const locale = btn.getAttribute('data-lang-option') as Locale | null
        if (!locale || locale === getLocale()) {
          if (locale) setLocaleCookie(locale)
          return
        }
        rememberAndGo(locale)
      })
    })
  })
}
