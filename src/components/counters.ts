import { $$ } from '../lib/dom'
import { easeOutExpo, prefersReducedMotion } from '../lib/motion'

const DURATION = 1600
const formatter = (decimals: number) =>
  new Intl.NumberFormat('sr-RS', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

export function initCounters(): void {
  const elements = $$<HTMLElement>('[data-count]')
  if (!elements.length) return

  if (prefersReducedMotion()) {
    elements.forEach((el) => {
      const target = Number(el.getAttribute('data-count'))
      const decimals = Number(el.getAttribute('data-decimals') ?? '0')
      el.textContent = formatter(decimals).format(target)
    })
    return
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        animate(entry.target as HTMLElement)
        obs.unobserve(entry.target)
      })
    },
    { threshold: 0.4 },
  )

  elements.forEach((el) => observer.observe(el))
}

function animate(el: HTMLElement): void {
  const target = Number(el.getAttribute('data-count'))
  const decimals = Number(el.getAttribute('data-decimals') ?? '0')
  const fmt = formatter(decimals)
  const start = performance.now()

  const tick = (now: number) => {
    const progress = Math.min((now - start) / DURATION, 1)
    const value = target * easeOutExpo(progress)
    el.textContent = fmt.format(value)
    if (progress < 1) requestAnimationFrame(tick)
    else el.textContent = fmt.format(target)
  }
  requestAnimationFrame(tick)
}
