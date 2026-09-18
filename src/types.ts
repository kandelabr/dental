export interface Service {
  slug: string
  name: string
  description: string
  image: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

export interface ServicePageContent {
  slug: string
  eyebrow: string
  headline: string
  lead: string
  heroImage: string
  introTitle: string
  introText: string[]
  introImage: string
  benefitsTitle: string
  benefits: string[]
  processTitle: string
  process: { title: string; text: string }[]
  gallery: { src: string; alt: string }[]
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
  city: string
  service: string
  quote: string
  rating: number
  avatar: string
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
  price: number
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

export interface BlogPost {
  title: string
  excerpt: string
  date: string
  category: string
  image: string
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
