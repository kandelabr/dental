import { $$ } from '../lib/dom'
import { prefersReducedMotion } from '../lib/motion'

export function initReveal(): void {
  const elements = $$<HTMLElement>('.reveal')
  if (!elements.length) return

  if (prefersReducedMotion()) {
    elements.forEach((el) => el.classList.add('is-in'))
    return
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        const delay = el.getAttribute('data-delay')
        if (delay) el.style.transitionDelay = `${delay}ms`
        el.classList.add('is-in')
        obs.unobserve(el)
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  )

  elements.forEach((el) => observer.observe(el))
}
