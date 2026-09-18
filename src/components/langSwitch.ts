import { $, $$, on } from '../lib/dom'

export function initLangSwitch(): void {
  const toggle = $<HTMLButtonElement>('[data-lang-switch]')
  if (!toggle) return

  on(toggle, 'click', () => {
    const options = $$<HTMLElement>('[data-lang-option]', toggle)
    options.forEach((opt) => {
      const active = opt.classList.contains('text-gold-500')
      opt.classList.toggle('text-gold-500', !active)
      opt.classList.toggle('text-ivory-50/70', active)
    })
    // eslint-disable-next-line no-console
    console.info('i18n TODO')
  })
}
