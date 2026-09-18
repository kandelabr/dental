export const $ = <T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): T | null => root.querySelector<T>(selector)

export const $$ = <T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): T[] => Array.from(root.querySelectorAll<T>(selector))

export function on<K extends keyof HTMLElementEventMap>(
  el: EventTarget | null,
  type: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions,
): void {
  if (!el) return
  el.addEventListener(type, handler as EventListener, options)
}
