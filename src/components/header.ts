import { $, $$, on } from '../lib/dom'

const SCROLL_THRESHOLD = 80

export function initHeader(): void {
  const header = $<HTMLElement>('#site-header')
  const headerInner = $<HTMLElement>('#header-inner')
  const topbar = $<HTMLElement>('#topbar')
  if (!header || !headerInner) return

  initScrollState(header, headerInner, topbar)
  initDropdown()
  initDrawer()
  initDrawerAccordion()
  initActiveLink()
  initFitNav()
}

/** Shrink main nav / quick-links scale until labels fit (longer DE/RU strings). */
function initFitNav(): void {
  const nav = $<HTMLElement>('[data-fit-nav]')
  const quick = $<HTMLElement>('[data-fit-quicklinks]')
  const bar = $<HTMLElement>('#header-bar')
  const header = $<HTMLElement>('#site-header')

  const fitFlexRow = (el: HTMLElement | null, varName: '--nav-scale' | '--ql-scale', min = 0.78) => {
    if (!el || getComputedStyle(el).display === 'none') return
    let scale = 1
    el.style.setProperty(varName, '1')
    for (let i = 0; i < 10; i += 1) {
      if (el.scrollWidth <= el.clientWidth + 1) break
      scale = Math.max(min, scale - 0.04)
      el.style.setProperty(varName, String(scale))
    }
  }

  const run = () => {
    fitFlexRow(nav, '--nav-scale', 0.7)
    fitFlexRow(quick, '--ql-scale', 0.75)
  }

  const schedule = () => requestAnimationFrame(run)
  schedule()
  void document.fonts?.ready.then(schedule)
  window.addEventListener('resize', schedule)
  if (bar && typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(schedule).observe(bar)
  }
  if (header && typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(schedule).observe(header)
  }
}

function initScrollState(header: HTMLElement, headerInner: HTMLElement, topbar: HTMLElement | null): void {
  let ticking = false

  const apply = () => {
    const scrolled = window.scrollY > SCROLL_THRESHOLD
    header.style.top = scrolled ? '0px' : topbar ? `${topbar.offsetHeight}px` : '0px'
    if (scrolled) {
      headerInner.classList.add('bg-ink-900/85', 'backdrop-blur-xl', 'border-white/10', 'shadow-lift')
      headerInner.classList.remove('border-transparent')
      header.querySelectorAll<HTMLElement>('#header-bar').forEach((bar) => bar.classList.add('h-[72px]'))
      header.querySelectorAll<HTMLElement>('#header-bar').forEach((bar) => bar.classList.remove('h-24'))
    } else {
      headerInner.classList.remove('bg-ink-900/85', 'backdrop-blur-xl', 'border-white/10', 'shadow-lift')
      headerInner.classList.add('border-transparent')
      header.querySelectorAll<HTMLElement>('#header-bar').forEach((bar) => bar.classList.remove('h-[72px]'))
      header.querySelectorAll<HTMLElement>('#header-bar').forEach((bar) => bar.classList.add('h-24'))
    }
    // Dark bar when scrolled — keep ivory so inactive nav stays readable; active stays gold via text-gold-500
    headerInner.classList.add('text-ivory-50')
    ticking = false
  }

  apply()

  on(window, 'scroll', () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(apply)
  })
}

function initDropdown(): void {
  const dropdown = $<HTMLElement>('[data-dropdown]')
  if (!dropdown) return
  const trigger = $<HTMLElement>('[data-dropdown-trigger]', dropdown)
  const panel = $<HTMLElement>('[data-dropdown-panel]', dropdown)
  if (!trigger || !panel) return

  let closeTimer: number | undefined

  const open = () => {
    window.clearTimeout(closeTimer)
    panel.classList.remove('opacity-0', 'invisible', 'translate-y-2')
    trigger.setAttribute('aria-expanded', 'true')
  }
  const close = () => {
    panel.classList.add('opacity-0', 'invisible', 'translate-y-2')
    trigger.setAttribute('aria-expanded', 'false')
  }
  const scheduleClose = () => {
    window.clearTimeout(closeTimer)
    closeTimer = window.setTimeout(close, 120)
  }

  // Desktop: hover opens list; click on "Usluge" navigates to #usluge
  on(dropdown, 'mouseenter', open)
  on(dropdown, 'mouseleave', scheduleClose)
  on(trigger, 'click', () => close())
  on(document, 'keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Escape') close()
  })
  on(document, 'click', (e) => {
    if (!dropdown.contains(e.target as Node)) close()
  })
}

function initDrawer(): void {
  const drawer = $<HTMLElement>('[data-drawer]')
  const shell = drawer?.parentElement
  const backdrop = $<HTMLElement>('[data-drawer-backdrop]')
  const openBtn = $<HTMLButtonElement>('[data-drawer-open]')
  const closeBtn = $<HTMLButtonElement>('[data-drawer-close]')
  if (!drawer || !openBtn) return

  const open = () => {
    drawer.classList.remove('translate-x-full')
    shell?.setAttribute('aria-hidden', 'false')
    backdrop?.classList.remove('opacity-0', 'pointer-events-none')
    document.body.classList.add('overflow-hidden')
    openBtn.setAttribute('aria-expanded', 'true')
  }
  const close = () => {
    drawer.classList.add('translate-x-full')
    shell?.setAttribute('aria-hidden', 'true')
    backdrop?.classList.add('opacity-0', 'pointer-events-none')
    document.body.classList.remove('overflow-hidden')
    openBtn.setAttribute('aria-expanded', 'false')
  }

  on(openBtn, 'click', open)
  on(closeBtn, 'click', close)
  on(backdrop, 'click', close)
  $$('[data-drawer-link]', drawer).forEach((link) => on(link, 'click', close))
  on(document, 'keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Escape') close()
  })
}

function initDrawerAccordion(): void {
  $$('[data-drawer-accordion]').forEach((wrap) => {
    const trigger = $<HTMLButtonElement>('[data-drawer-accordion-trigger]', wrap)
    const panel = $<HTMLElement>('[data-drawer-accordion-panel]', wrap)
    const icon = $<HTMLElement>('[data-drawer-accordion-icon]', wrap)
    if (!trigger || !panel) return
    on(trigger, 'click', () => {
      const isOpen = panel.classList.toggle('grid-rows-[1fr]')
      panel.classList.toggle('grid-rows-[0fr]', !isOpen)
      if (icon) icon.textContent = isOpen ? '−' : '+'
    })
  })
}

function initActiveLink(): void {
  const navLinks = $$<HTMLAnchorElement>('[data-nav-link]')
  if (!navLinks.length) return
  const sections = navLinks
    .map((link) => {
      const href = link.getAttribute('href') ?? ''
      const hash = href.includes('#') ? `#${href.split('#')[1]}` : href
      return document.querySelector<HTMLElement>(hash)
    })
    .filter((el): el is HTMLElement => !!el)
  if (!sections.length) return

  const setActive = (id: string) => {
    navLinks.forEach((link) => {
      const href = link.getAttribute('href') ?? ''
      const hash = href.includes('#') ? `#${href.split('#')[1]}` : href
      link.classList.toggle('text-gold-500', hash === `#${id}`)
    })
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id)
      })
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
  )
  sections.forEach((section) => observer.observe(section))
}
