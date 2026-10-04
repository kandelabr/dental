import type {
  Advantage,
  FaqItem,
  GalleryImage,
  BeforeAfterCase,
  PriceCategory,
  Service,
  ServicePageContent,
  SiteInfo,
  Stat,
  Step,
  TeamMember,
  Testimonial,
} from '../types'
import { about as aboutBase } from '../data/about'
import { services as servicesBase } from '../data/services'
import { steps as stepsBase } from '../data/steps'
import { stats as statsBase } from '../data/stats'
import { advantages as advantagesBase } from '../data/advantages'
import { site as siteBase } from '../data/site'
import { getServicePage as getServicePageBase } from '../data/servicePages'
import { teamMembers as teamBase } from '../data/team'
import { quickLinks as quickLinksBase, type QuickLink } from '../data/quickLinks'
import { serviceHref } from '../lib/paths'
import { getMessages, type Messages } from './messages'

function msg(): Messages {
  return getMessages()
}

export function getSite(): SiteInfo {
  const m = msg().site
  return {
    ...siteBase,
    name: m.name,
    phone: m.phone,
    mobile: m.mobile,
    email: m.email,
    address: m.address,
    hours: m.hours.map((h) => ({ day: h.day, time: h.time })),
  }
}

export function getAbout() {
  const m = msg().about
  return {
    ...aboutBase,
    badge: m.badge,
    paragraphs: m.paragraphs,
    imageAlt: m.imageAlt,
  }
}

export function getServices(): Service[] {
  const list = msg().services
  return servicesBase.map((s, i) => ({
    ...s,
    name: list[i]?.name ?? s.name,
    description: list[i]?.description ?? s.description,
  }))
}

export function getSteps(): Step[] {
  const list = msg().steps.items
  return stepsBase.map((s, i) => ({
    ...s,
    number: list[i]?.number ?? s.number,
    title: list[i]?.title ?? s.title,
    description: list[i]?.description ?? s.description,
  }))
}

export function getStats(): Stat[] {
  const list = msg().stats
  return statsBase.map((s, i) => ({
    ...s,
    label: list[i]?.label ?? s.label,
    suffix: list[i]?.suffix ?? s.suffix,
  }))
}

export function getAdvantages(): Advantage[] {
  const list = msg().advantages
  return advantagesBase.map((a, i) => ({
    ...a,
    number: list[i]?.number ?? a.number,
    title: list[i]?.title ?? a.title,
    description: list[i]?.description ?? a.description,
  }))
}

export function getFaq(): FaqItem[] {
  return msg().faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  }))
}

export function getPrices(): PriceCategory[] {
  return msg().prices.map((cat) => ({
    key: cat.key,
    label: cat.label,
    rows: cat.rows.map((row) => ({ name: row.name, price: row.price })),
  }))
}

export function getTestimonials(): Testimonial[] {
  return msg().testimonials.map((t) => ({
    name: t.name,
    quote: t.quote,
    rating: 5,
  }))
}

export function getTeamIntro(): string {
  return msg().team.intro
}

export function getTeamMembers(): TeamMember[] {
  const list = msg().team.members
  return teamBase.map((member, i) => ({
    ...member,
    name: list[i]?.name ?? member.name,
    role: list[i]?.role ?? member.role,
    bio: list[i]?.bio ?? member.bio,
  }))
}

export function getQuickLinks(): QuickLink[] {
  const list = msg().quickLinks
  return quickLinksBase.map((link, i) => ({
    ...link,
    label: list[i]?.label ?? link.label,
  }))
}

export function quickLinkHref(link: QuickLink): string {
  const base = serviceHref(link.slug)
  return link.hash ? `${base}#${link.hash}` : base
}

export function getBeforeAfterCases(): BeforeAfterCase[] {
  const labels = msg().gallery.beforeAfterCases
  return Array.from({ length: 10 }, (_, i) => {
    const n = i + 1
    return {
      before: `/assets/nas-rad/${n}_b.jpg`,
      after: `/assets/nas-rad/${n}_a.jpg`,
      label: labels[i]?.label ?? `Slučaj ${n}`,
    }
  })
}

export function getGallery(): GalleryImage[] {
  const aboutAlts = msg().gallery.aboutAlts
  const aboutGallery: Omit<GalleryImage, 'tall'>[] = aboutAlts.map((alt, i) => ({
    src: `/assets/o-nama/d${i + 1}.jpg`,
    alt,
  }))

  const pages = msg().servicePages
  const serviceGallery: Omit<GalleryImage, 'tall'>[] = Object.values(pages).flatMap((page) => {
    const gallery = 'gallery' in page && Array.isArray(page.gallery) ? page.gallery : []
    return gallery.map((img: { src: string; alt: string }) => ({ src: img.src, alt: img.alt }))
  })

  const seen = new Set<string>()
  return [...aboutGallery, ...serviceGallery]
    .filter((img) => {
      if (seen.has(img.src)) return false
      seen.add(img.src)
      return true
    })
    .map((img, i) => ({
      ...img,
      tall: (i + 1) % 4 === 1,
    }))
}

type PageMsg = Record<string, unknown> & {
  slug?: string
  eyebrow?: string
  headline?: string
  lead?: string
  introTitle?: string
  introText?: string[]
  introTagline?: string
  introId?: string
  introMethods?: { id?: string; title: string; text: string; image?: string }[]
  benefitsTitle?: string
  benefits?: string[]
  situations?: { title: string; text: string }[]
  processTitle?: string
  processEyebrow?: string
  process?: { title: string; text: string }[]
  featureSections?: NonNullable<ServicePageContent['featureSections']>
  gallery?: { src: string; alt: string }[]
  ctaTitle?: string
  ctaText?: string
}

function mergeMethods(
  base: ServicePageContent['introMethods'],
  text: PageMsg['introMethods'],
): ServicePageContent['introMethods'] {
  if (!base?.length && !text) return undefined
  const src = base ?? []
  const tx = text ?? []
  const len = Math.max(src.length, tx.length)
  return Array.from({ length: len }, (_, i) => ({
    id: tx[i]?.id ?? src[i]?.id,
    title: tx[i]?.title ?? src[i]?.title ?? '',
    text: tx[i]?.text ?? src[i]?.text ?? '',
    image: src[i]?.image ?? tx[i]?.image,
  }))
}

function mergeFeatures(
  base: ServicePageContent['featureSections'],
  text: PageMsg['featureSections'],
): ServicePageContent['featureSections'] {
  if (!base?.length && !text) return undefined
  const src = base ?? []
  const tx = text ?? []
  const len = Math.max(src.length, tx.length)
  return Array.from({ length: len }, (_, i) => {
    const b = src[i]
    const t = tx[i]
    return {
      id: t?.id ?? b?.id ?? `section-${i}`,
      eyebrow: t?.eyebrow ?? b?.eyebrow ?? '',
      title: t?.title ?? b?.title ?? '',
      text: t?.text ?? b?.text ?? [],
      tagline: t?.tagline ?? b?.tagline,
      stepsTitle: t?.stepsTitle ?? b?.stepsTitle,
      steps: t?.steps ?? b?.steps,
      highlightsTitle: t?.highlightsTitle ?? b?.highlightsTitle,
      highlights: t?.highlights ?? b?.highlights,
    }
  })
}

export function getServicePage(slug: string): ServicePageContent | undefined {
  const base = getServicePageBase(slug)
  const pages = msg().servicePages as Record<string, PageMsg>
  const text = pages[slug]
  if (!base) return undefined
  if (!text) return base

  return {
    ...base,
    slug: text.slug ?? base.slug,
    eyebrow: text.eyebrow ?? base.eyebrow,
    headline: text.headline ?? base.headline,
    lead: text.lead ?? base.lead,
    introTitle: text.introTitle ?? base.introTitle,
    introText: text.introText ?? base.introText,
    introTagline: text.introTagline ?? base.introTagline,
    introId: base.introId ?? text.introId,
    benefitsTitle: text.benefitsTitle ?? base.benefitsTitle,
    benefits: text.benefits ?? base.benefits,
    situations: text.situations ?? base.situations,
    processTitle: text.processTitle ?? base.processTitle,
    processEyebrow: text.processEyebrow ?? base.processEyebrow,
    process: text.process ?? base.process,
    ctaTitle: text.ctaTitle ?? base.ctaTitle,
    ctaText: text.ctaText ?? base.ctaText,
    introMethods: mergeMethods(base.introMethods, text.introMethods),
    featureSections: mergeFeatures(base.featureSections, text.featureSections),
    gallery: text.gallery ?? base.gallery,
    // keep media / layout flags from base
    heroImage: base.heroImage,
    introImage: base.introImage,
    heroImagePosition: base.heroImagePosition,
    introImagePosition: base.introImagePosition,
    featuresBeforeProcess: base.featuresBeforeProcess,
  }
}

export function ui() {
  return msg().ui
}

export function homeCopy() {
  return msg().home
}

export function metaCopy() {
  return msg().meta
}
