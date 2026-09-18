import { serviceHref } from '../lib/paths'

export interface QuickLink {
  label: string
  /** Service page slug — hash can be added later for in-page scroll */
  slug: string
  hash?: string
}

export const quickLinks: QuickLink[] = [
  { label: 'All on 4', slug: 'implantologija', hash: 'all-on-4' },
  { label: 'All on 6', slug: 'implantologija', hash: 'all-on-6' },
  { label: 'Hollywood smile', slug: 'estetska-stomatologija', hash: 'hollywood-smile' },
  { label: 'Fasete – Viniri', slug: 'estetska-stomatologija', hash: 'fasete-viniri' },
  { label: 'Bezmetalne krunice', slug: 'protetika', hash: 'bezmetalne-krunice' },
]

export function quickLinkHref(link: QuickLink): string {
  // TODO: append `#${link.hash}` when section anchors exist on service pages
  return serviceHref(link.slug)
}
