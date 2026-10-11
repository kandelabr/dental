/**
 * Post-build SEO prerender: fills locale HTML in dist/ with real content
 * so crawlers see text without waiting for client JS.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { prerenderPage } from '../src/i18n/prerender'
import { isLocale, type Locale } from '../src/i18n/locales'

const distDir = join(fileURLToPath(new URL('..', import.meta.url)), 'dist')
const siteOrigin = (process.env.VITE_SITE_ORIGIN || 'https://www.houseofsmilebgd.rs').replace(/\/$/, '')

function walkHtml(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out.push(...walkHtml(full))
    else if (name.endsWith('.html')) out.push(full)
  }
  return out
}

function pageInfo(file: string): { locale: Locale; pagePath: string } {
  const rel = relative(distDir, file).replace(/\\/g, '/')
  const m = rel.match(/^(en|de|ru)\/(.*)$/)
  if (m && isLocale(m[1]!)) {
    return { locale: m[1] as Locale, pagePath: m[2] || 'index.html' }
  }
  return { locale: 'sr', pagePath: rel }
}

const files = walkHtml(distDir)
let count = 0
for (const file of files) {
  const { locale, pagePath } = pageInfo(file)
  const source = readFileSync(file, 'utf8')
  const next = prerenderPage(source, locale, pagePath)
  writeFileSync(file, next, 'utf8')
  count += 1
  console.log(`prerender ${locale} ${pagePath}`)
}
console.log(`SEO prerender done: ${count} HTML files`)

const locales = ['sr', 'en', 'de', 'ru'] as const
const hreflang: Record<(typeof locales)[number], string> = {
  sr: 'sr-RS',
  en: 'en',
  de: 'de',
  ru: 'ru',
}
const SerbianPages = files
  .map((file) => relative(distDir, file).replace(/\\/g, '/'))
  .filter((path) => !/^(en|de|ru)\//.test(path))
  .sort()

function publicUrl(locale: (typeof locales)[number], pagePath: string): string {
  const page = pagePath === 'index.html' ? '' : pagePath
  const localePath = locale === 'sr' ? '' : `${locale}/`
  return `${siteOrigin}/${localePath}${page}`
}

function xmlEscape(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
}

const sitemapUrls = SerbianPages.flatMap((pagePath) =>
  locales
    .filter((locale) => {
      const file = locale === 'sr' ? pagePath : `${locale}/${pagePath}`
      return existsSync(join(distDir, file))
    })
    .map((locale) => {
      const url = publicUrl(locale, pagePath)
      const alternates = locales
        .map(
          (alternateLocale) =>
            `    <xhtml:link rel="alternate" hreflang="${hreflang[alternateLocale]}" href="${xmlEscape(publicUrl(alternateLocale, pagePath))}" />`,
        )
        .concat(
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(publicUrl('sr', pagePath))}" />`,
        )
        .join('\n')
      const priority = pagePath === 'index.html' ? '1.0' : pagePath === 'nas-tim.html' ? '0.7' : '0.9'
      return [
        '  <url>',
        `    <loc>${xmlEscape(url)}</loc>`,
        alternates,
        '    <changefreq>monthly</changefreq>',
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n')
    }),
)

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...sitemapUrls,
  '</urlset>',
  '',
].join('\n')

writeFileSync(join(distDir, 'sitemap.xml'), sitemap, 'utf8')
writeFileSync(
  join(distDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`,
  'utf8',
)
console.log(`SEO discovery files done: ${sitemapUrls.length} sitemap URLs`)
