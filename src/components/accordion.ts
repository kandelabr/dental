import { $, $$, on } from '../lib/dom'

export function initAccordions(): void {
  $$<HTMLElement>('[data-accordion]').forEach((root) => setupAccordion(root))
}

function setupAccordion(root: HTMLElement): void {
  const mode = root.getAttribute('data-mode') === 'multi' ? 'multi' : 'single'
  const items = $$<HTMLElement>('[data-accordion-item]', root)

  const closeItem = (item: HTMLElement) => {
    const trigger = $<HTMLButtonElement>('[data-accordion-trigger]', item)
    const panel = $<HTMLElement>('[data-accordion-panel]', item)
    const icon = $<HTMLElement>('[data-accordion-icon]', item)
    trigger?.setAttribute('aria-expanded', 'false')
    panel?.classList.remove('grid-rows-[1fr]')
    panel?.classList.add('grid-rows-[0fr]')
    if (icon) icon.style.transform = 'rotate(0deg)'
  }

  const openItem = (item: HTMLElement) => {
    const trigger = $<HTMLButtonElement>('[data-accordion-trigger]', item)
    const panel = $<HTMLElement>('[data-accordion-panel]', item)
    const icon = $<HTMLElement>('[data-accordion-icon]', item)
    trigger?.setAttribute('aria-expanded', 'true')
    panel?.classList.add('grid-rows-[1fr]')
    panel?.classList.remove('grid-rows-[0fr]')
    if (icon) icon.style.transform = 'rotate(45deg)'
  }

  items.forEach((item) => {
    const trigger = $<HTMLButtonElement>('[data-accordion-trigger]', item)
    if (!trigger) return
    on(trigger, 'click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true'
      if (mode === 'single' && !isOpen) {
        items.forEach((other) => other !== item && closeItem(other))
      }
      if (isOpen) closeItem(item)
      else openItem(item)
    })
  })
}
