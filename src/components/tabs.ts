import { $$, on } from '../lib/dom'

export function initTabs(): void {
  $$<HTMLElement>('[data-tabs]').forEach((root) => setupTabs(root))
}

function setupTabs(root: HTMLElement): void {
  const triggers = $$<HTMLButtonElement>('[data-tab-trigger]', root)
  const panels = $$<HTMLElement>('[data-tab-panel]')
  if (!triggers.length) return

  const activate = (key: string) => {
    triggers.forEach((t) => {
      const active = t.getAttribute('data-tab-target') === key
      t.setAttribute('aria-selected', String(active))
      t.classList.toggle('bg-petrol-700', active)
      t.classList.toggle('text-ivory-50', active)
      t.classList.toggle('bg-ivory-100', !active)
      t.classList.toggle('text-stone-500', !active)
    })
    panels.forEach((p) => {
      p.classList.toggle('hidden', p.getAttribute('data-tab-key') !== key)
    })
  }

  triggers.forEach((trigger, index) => {
    on(trigger, 'click', () => {
      const key = trigger.getAttribute('data-tab-target')
      if (key) activate(key)
    })
    on(trigger, 'keydown', (e) => {
      const key = (e as KeyboardEvent).key
      if (key !== 'ArrowRight' && key !== 'ArrowLeft') return
      e.preventDefault()
      const next = key === 'ArrowRight' ? (index + 1) % triggers.length : (index - 1 + triggers.length) % triggers.length
      triggers[next]?.focus()
      const nextKey = triggers[next]?.getAttribute('data-tab-target')
      if (nextKey) activate(nextKey)
    })
  })
}
