import type { GalleryImage, BeforeAfterCase } from '../types'

export const beforeAfterCases: BeforeAfterCase[] = [
  {
    before: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=70',
    after: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=70',
    label: 'Hollywood smile',
  },
  {
    before: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=70',
    after: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=70',
    label: 'Implantologija',
  },
  {
    before: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=70',
    after: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=70',
    label: 'Protetika',
  },
]

export const gallery: GalleryImage[] = [
  { src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=70', alt: 'Rezultat protetske terapije', tall: true },
  { src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=70', alt: 'Ugradnja implantata' },
  { src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=70', alt: 'Estetska stomatologija' },
  { src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=70', alt: 'Protetski rad', tall: true },
  { src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=70', alt: 'Parodontološka terapija' },
  { src: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=70', alt: 'Ortodontski rezultat' },
  { src: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=70', alt: 'Oralna hirurgija', tall: true },
  { src: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=70', alt: 'Osmeh pacijenta nakon terapije' },
]
