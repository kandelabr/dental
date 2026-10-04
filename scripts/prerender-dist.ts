/**
 * Post-build SEO prerender: fills locale HTML in dist/ with real content
 * so crawlers see text without waiting for client JS.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { prerenderPage } from '../src/i18n/prerender'
import { isLocale, type Locale } from '../src/i18n/locales'

const distDir = join(fileURLToPath(new URL('..', import.meta.url)), 'dist')

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
