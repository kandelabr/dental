import { $, $$, on } from '../lib/dom'
import { prefersReducedMotion } from '../lib/motion'

interface CarouselOptions {
  autoplay?: number
  loop?: boolean
}

export function initCarousels(): void {
  $$<HTMLElement>('[data-carousel]').forEach((root) => {
    const autoplay = Number(root.getAttribute('data-autoplay') ?? '0') || undefined
    createCarousel(root, { autoplay, loop: true })
  })
}

export function createCarousel(root: HTMLElement, opts: CarouselOptions = {}): void {
  const track = $<HTMLElement>('[data-carousel-track]', root)
  const slides = $$<HTMLElement>('[data-carousel-slide]', track ?? root)
  const prevBtn = $<HTMLButtonElement>('[data-carousel-prev]', root)
  const nextBtn = $<HTMLButtonElement>('[data-carousel-next]', root)
  const dotsWrap = $<HTMLElement>('[data-carousel-dots]', root)
  if (!track || !slides.length) return

  let activeIndex = 0

  dotsWrap?.replaceChildren(
    ...slides.map((_, i) => {
      const dot = document.createElement('button')
      dot.type = 'button'
      dot.setAttribute('aria-label', `Prikaz ${i + 1}`)
      dot.className = 'h-2.5 w-2.5 rounded-full bg-ivory-200 transition-colors data-[active=true]:bg-gold-500'
      dot.addEventListener('click', () => scrollToSlide(i))
      return dot
    }),
  )
  const dots = dotsWrap ? $$<HTMLButtonElement>('button', dotsWrap) : []

  const scrollToSlide = (index: number) => {
    const clamped = ((index % slides.length) + slides.length) % slides.length
    const slide = slides[clamped]
    if (!slide) return
    // Use track.scrollTo — scrollIntoView also moves the page vertically
    track.scrollTo({ left: slide.offsetLeft, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  const updateActive = () => {
    const trackRect = track.getBoundingClientRect()
    let closest = 0
    let closestDist = Infinity
    slides.forEach((slide, i) => {
      const dist = Math.abs(slide.getBoundingClientRect().left - trackRect.left)
      if (dist < closestDist) {
        closestDist = dist
        closest = i
      }
    })
    activeIndex = closest
    dots.forEach((dot, i) => dot.setAttribute('data-active', String(i === closest)))
  }

  on(prevBtn, 'click', () => scrollToSlide(activeIndex - 1))
  on(nextBtn, 'click', () => scrollToSlide(activeIndex + 1))
  on(track, 'scroll', () => {
    window.requestAnimationFrame(updateActive)
  })

  updateActive()

  on(root, 'keydown', (e) => {
    const key = (e as KeyboardEvent).key
    if (key === 'ArrowLeft') prevBtn?.click()
    if (key === 'ArrowRight') nextBtn?.click()
  })

  if (opts.autoplay && !prefersReducedMotion()) {
    let timer: number | undefined
    const start = () => {
      timer = window.setInterval(() => nextBtn?.click(), opts.autoplay)
    }
    const stop = () => window.clearInterval(timer)

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? start() : stop()))
      },
      { threshold: 0.3 },
    )
    visibilityObserver.observe(root)

    on(root, 'mouseenter', stop)
    on(root, 'mouseleave', start)
    on(root, 'focusin', stop)
    on(root, 'focusout', start)
  }
}
