export function isSubPage(): boolean {
  if (typeof location === 'undefined') return false
  return /\/usluge\//.test(location.pathname) || /\/nas-tim\.html$/.test(location.pathname)
}

export function homeSection(id: string): string {
  return isSubPage() ? `/#${id}` : `#${id}`
}

export function homeHref(): string {
  return isSubPage() ? '/' : '#pocetna'
}

export function serviceHref(slug: string): string {
  return `/usluge/${slug}.html`
}

export function teamHref(): string {
  return '/nas-tim.html'
}
