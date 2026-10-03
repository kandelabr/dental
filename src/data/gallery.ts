import type { GalleryImage, BeforeAfterCase } from '../types'
import { servicePages } from './servicePages'

export const beforeAfterCases: BeforeAfterCase[] = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1
  return {
    before: `/assets/nas-rad/${n}_b.jpg`,
    after: `/assets/nas-rad/${n}_a.jpg`,
    label: `Slučaj ${n}`,
  }
})

const aboutGallery: Omit<GalleryImage, 'tall'>[] = Array.from({ length: 24 }, (_, i) => {
  const n = i + 1
  return {
    src: `/assets/o-nama/d${n}.jpg`,
    alt: `Ordinacija — detalj ${n}`,
  }
})

const serviceGallery: Omit<GalleryImage, 'tall'>[] = servicePages.flatMap((page) =>
  (page.gallery ?? []).map((img) => ({
    src: img.src,
    alt: img.alt,
  })),
)

const seen = new Set<string>()

export const gallery: GalleryImage[] = [...aboutGallery, ...serviceGallery]
  .filter((img) => {
    if (seen.has(img.src)) return false
    seen.add(img.src)
    return true
  })
  .map((img, i) => ({
    ...img,
    tall: (i + 1) % 4 === 1,
  }))
