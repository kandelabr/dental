import { $, $$, on } from '../lib/dom'
import { beforeAfterCases } from '../data/gallery'

export function initBeforeAfter(): void {
  $$<HTMLElement>('[data-before-after]').forEach((container) => setupInstance(container))
}

function setupInstance(container: HTMLElement): void {
  const beforeWrap = $<HTMLElement>('[data-ba-before-wrap]', container)
  const handle = $<HTMLElement>('[data-ba-handle]', container)
  const beforeImg = $<HTMLImageElement>('[data-ba-before]', container)
  const afterImg = $<HTMLImageElement>('[data-ba-after]', container)
  if (!beforeWrap || !handle) return

  let percent = 50
  let dragging = false

  const setPercent = (value: number) => {
    percent = Math.min(100, Math.max(0, value))
    beforeWrap.style.clipPath = `inset(0 ${100 - percent}% 0 0)`
    handle.style.left = `${percent}%`
    container.setAttribute('aria-valuenow', String(Math.round(percent)))
  }

  const percentFromEvent = (clientX: number): number => {
    const rect = container.getBoundingClientRect()
    return ((clientX - rect.left) / rect.width) * 100
  }

  setPercent(50)

  on(container, 'pointerdown', (e) => {
    dragging = true
    setPercent(percentFromEvent(e.clientX))
    container.setPointerCapture(e.pointerId)
  })
  on(container, 'pointermove', (e) => {
    if (!dragging) return
    setPercent(percentFromEvent(e.clientX))
  })
  on(container, 'pointerup', () => {
    dragging = false
  })
  on(container, 'pointercancel', () => {
    dragging = false
  })

  on(container, 'keydown', (e) => {
    const key = (e as KeyboardEvent).key
    if (key === 'ArrowLeft') {
      e.preventDefault()
      setPercent(percent - 4)
    } else if (key === 'ArrowRight') {
      e.preventDefault()
      setPercent(percent + 4)
    }
  })

  const thumbs = $$<HTMLButtonElement>('[data-ba-thumb]')
  thumbs.forEach((thumb) => {
    on(thumb, 'click', () => {
      const index = Number(thumb.getAttribute('data-case-index'))
      const item = beforeAfterCases[index]
      if (!item || !beforeImg || !afterImg) return
      beforeImg.src = item.before
      afterImg.src = item.after
      setPercent(50)
      thumbs.forEach((t) => {
        t.classList.remove('ring-2', 'ring-gold-500')
        t.classList.add('ring-1', 'ring-ivory-200')
      })
      thumb.classList.add('ring-2', 'ring-gold-500')
      thumb.classList.remove('ring-1', 'ring-ivory-200')
    })
  })
}
