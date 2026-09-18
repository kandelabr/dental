import { $, on } from '../lib/dom'
import { site } from '../data/site'

const BACK_TO_TOP_THRESHOLD = 600

export function initFloatingActions(): void {
  initFab()
  initBackToTop()
}

function initFab(): void {
  const mainBtn = $<HTMLButtonElement>('[data-fab-main]')
  const menu = $<HTMLElement>('[data-fab-menu]')
  if (!mainBtn || !menu) return

  const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches

  let open = false
  const setOpen = (value: boolean) => {
    open = value
    mainBtn.setAttribute('aria-expanded', String(open))
    menu.classList.toggle('opacity-0', !open)
    menu.classList.toggle('pointer-events-none', !open)
    menu.classList.toggle('translate-y-2', !open)
  }

  on(mainBtn, 'click', (e) => {
    if (!isDesktop()) {
      window.location.href = site.phoneHref
      return
    }
    e.preventDefault()
    setOpen(!open)
  })

  on(document, 'click', (e) => {
    if (open && !mainBtn.contains(e.target as Node) && !menu.contains(e.target as Node)) setOpen(false)
  })
}

function initBackToTop(): void {
  const btn = $<HTMLButtonElement>('[data-back-to-top]')
  if (!btn) return

  const update = () => {
    const visible = window.scrollY > BACK_TO_TOP_THRESHOLD
    btn.classList.toggle('flex', visible)
    btn.classList.toggle('hidden', !visible)
  }
  update()

  let ticking = false
  on(window, 'scroll', () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      update()
      ticking = false
    })
  })

  on(btn, 'click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
