/** Build-time page path (e.g. `/usluge/implantologija.html`) so locale links resolve correctly without `location`. */
let prerenderPath: string | null = null

export function setPrerenderPath(path: string | null): void {
  prerenderPath = path
}

export function getPrerenderPath(): string | null {
  return prerenderPath
}

export function getRuntimePathname(): string {
  if (prerenderPath) return prerenderPath
  if (typeof location !== 'undefined') return location.pathname
  return '/'
}
