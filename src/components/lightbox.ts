import { $$, on } from '../lib/dom'
import { ui } from '../i18n/content'

let overlay: HTMLElement | null = null
let currentIndex = 0
let lastTrigger: HTMLElement | null = null
let touchStartX = 0
let items: { src: string; alt: string }[] = []

export function initLightbox(): void {
  const triggers = $$<HTMLButtonElement>('[data-lightbox]')
  if (!triggers.length) return

  items = triggers.map((btn) => {
    const img = btn.querySelector('img')
    return {
      src: btn.getAttribute('data-lightbox-src') ?? img?.getAttribute('src') ?? '',
      alt: btn.getAttribute('data-lightbox-alt') ?? img?.getAttribute('alt') ?? '',
    }
  })

  triggers.forEach((trigger) => {
    on(trigger, 'click', () => {
      lastTrigger = trigger
      const index = Number(trigger.getAttribute('data-lightbox-index') ?? '0')
      open(index)
    })
  })
}

function buildOverlay(): HTMLElement {
  const labels = ui().lightbox
  const el = document.createElement('div')
  el.className =
    'fixed inset-0 z-[80] bg-ink-950/95 backdrop-blur flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300'
  el.innerHTML = `
    <button type="button" data-lightbox-close aria-label="${labels.close}" class="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-ivory-50">
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <button type="button" data-lightbox-prev aria-label="${labels.prev}" class="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-ivory-50">←</button>
    <button type="button" data-lightbox-next aria-label="${labels.next}" class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-ivory-50">→</button>
    <img data-lightbox-image src="" alt="" class="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain" />
    <p data-lightbox-counter class="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory-50/80 text-sm tracking-wide"></p>
  `
  document.body.appendChild(el)

  on(el, 'click', (e) => {
    if (e.target === el) close()
  })
  el.querySelector('[data-lightbox-close]')?.addEventListener('click', close)
  el.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => show(currentIndex - 1))
  el.querySelector('[data-lightbox-next]')?.addEventListener('click', () => show(currentIndex + 1))

  on(el, 'touchstart', (e) => {
    touchStartX = (e as TouchEvent).touches[0]?.clientX ?? 0
  })
  on(el, 'touchend', (e) => {
    const endX = (e as TouchEvent).changedTouches[0]?.clientX ?? 0
    const diff = endX - touchStartX
    if (Math.abs(diff) > 40) show(currentIndex + (diff < 0 ? 1 : -1))
  })

  return el
}

function show(index: number): void {
  if (!overlay || !items.length) return
  currentIndex = (index + items.length) % items.length
  const item = items[currentIndex]
  if (!item) return
  const img = overlay.querySelector<HTMLImageElement>('[data-lightbox-image]')
  const counter = overlay.querySelector<HTMLElement>('[data-lightbox-counter]')
  if (img) {
    img.src = item.src
    img.alt = item.alt
  }
  if (counter) counter.textContent = `${currentIndex + 1} / ${items.length}`
}

function open(index: number): void {
  if (!overlay) overlay = buildOverlay()
  show(index)
  overlay.classList.remove('opacity-0', 'pointer-events-none')
  document.body.classList.add('overflow-hidden')
  document.addEventListener('keydown', onKeydown)
}

function close(): void {
  if (!overlay) return
  overlay.classList.add('opacity-0', 'pointer-events-none')
  document.body.classList.remove('overflow-hidden')
  document.removeEventListener('keydown', onKeydown)
  lastTrigger?.focus()
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') show(currentIndex - 1)
  if (e.key === 'ArrowRight') show(currentIndex + 1)
}
