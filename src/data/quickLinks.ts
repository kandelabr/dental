import { serviceHref } from '../lib/paths'

export interface QuickLink {
  label: string
  /** Service page slug — hash scrolls to in-page section when present */
  slug: string
  hash?: string
}

export const quickLinks: QuickLink[] = [
  { label: 'All on 4 / All on 6', slug: 'implantologija', hash: 'all-on-4' },
  { label: 'Proteze na implantatima', slug: 'implantologija', hash: 'proteze-na-implantatima' },
  { label: 'Hollywood smile', slug: 'estetska-stomatologija', hash: 'hollywood-smile' },
  { label: 'Fasete – Viniri', slug: 'estetska-stomatologija', hash: 'fasete-viniri' },
  { label: 'Lasersko izbeljivanje', slug: 'estetska-stomatologija', hash: 'lasersko-izbeljivanje' },
  { label: 'Bezmetalne krunice', slug: 'protetika', hash: 'bezmetalne-krunice' },
  { label: 'Keramički viniri', slug: 'protetika', hash: 'keramicki-viniri' },
]

export function quickLinkHref(link: QuickLink): string {
  const base = serviceHref(link.slug)
  return link.hash ? `${base}#${link.hash}` : base
}
