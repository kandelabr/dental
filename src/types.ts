export interface Service {
  slug: string
  name: string
  description: string
  image: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string[]
  image: string
  /** Tailwind object-position class when the crop needs a custom focus point */
  imagePosition?: string
}

export interface ServicePageContent {
  slug: string
  eyebrow: string
  headline: string
  lead: string
  heroImage: string
  /** Tailwind object-position class when the hero crop needs a custom focus point */
  heroImagePosition?: string
  introTitle: string
  introText: string[]
  introImage: string
  /** Tailwind object-position class when the intro image crop needs a custom focus point */
  introImagePosition?: string
  /** Optional italic line under intro paragraphs */
  introTagline?: string
  /** Optional anchor id on the intro section (for quick-link hashes) */
  introId?: string
  /** Method cards under the intro (e.g. fasete, krunice) */
  introMethods?: { id?: string; title: string; text: string; image?: string }[]
  benefitsTitle: string
  benefits: string[]
  /** When set, renders titled situation cards instead of a simple checklist */
  situations?: { title: string; text: string }[]
  processTitle: string
  processEyebrow?: string
  process: { title: string; text: string }[]
  /** Extra in-page sections (e.g. All-on-4, proteze) with anchor ids for menu links */
  featureSections?: {
    id: string
    eyebrow: string
    title: string
    text: string[]
    tagline?: string
    stepsTitle?: string
    steps?: { title: string; text: string }[]
    highlightsTitle?: string
    highlights?: string[]
  }[]
  gallery?: { src: string; alt: string }[]
  /** When true, feature sections render before the process block */
  featuresBeforeProcess?: boolean
  ctaTitle: string
  ctaText: string
}

export interface Step {
  number: string
  title: string
  description: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
  decimals?: number
}

export interface Advantage {
  number: string
  title: string
  description: string
}

export interface Testimonial {
  name: string
  quote: string
  rating: number
}

export interface GalleryImage {
  src: string
  alt: string
  tall?: boolean
}

export interface BeforeAfterCase {
  before: string
  after: string
  label: string
}

export interface PriceRow {
  name: string
  /** Formatted display price, e.g. "500 €", "4.000 din", "500–1.000 €" */
  price: string
}

export interface PriceCategory {
  key: string
  label: string
  rows: PriceRow[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface WorkingHours {
  day: string
  time: string
}

export interface SiteInfo {
  name: string
  phone: string
  phoneHref: string
  mobile: string
  whatsapp: string
  viber: string
  email: string
  address: string
  hours: WorkingHours[]
  social: {
    instagram: string
    facebook: string
  }
}
