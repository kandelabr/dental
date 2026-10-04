import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin, ViteDevServer } from 'vite'
import { PREFIX_LOCALES, LOCALE_HTML_LANG, LOCALE_HREFLANG, type Locale, type PrefixedLocale } from './src/i18n/locales'

const pluginRoot = dirname(fileURLToPath(import.meta.url))

type MetaCatalog = {
  home: { title: string }
  team: { title: string }
  services: Record<string, string>
}

const SERVICE_SLUGS = [
  'implantologija',
  'estetska-stomatologija',
  'protetika',
  'ortodoncija',
  'opsta-stomatologija',
  'parodontologija',
  'oralna-hirurgija',
  'decja-stomatologija',
] as const

const ROOT_PAGES = ['index.html', 'nas-tim.html', ...SERVICE_SLUGS.map((s) => `usluge/${s}.html`)] as const

/** Must be absolute http(s) so Vite does not try to resolve `/en/` as a project directory. */
const SITE_ORIGIN = (process.env.VITE_SITE_ORIGIN || 'https://www.houseofsmilebgd.rs').replace(/\/$/, '')

function hreflangLinks(pagePath: string): string {
  const bare = pagePath === 'index.html' ? '/' : `/${pagePath}`
  const hrefFor = (locale: string) => {
    if (locale === 'sr') return bare === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${bare}`
    return bare === '/' ? `${SITE_ORIGIN}/${locale}/` : `${SITE_ORIGIN}/${locale}${bare}`
  }
  const lines = [
    ...(['sr', 'en', 'de', 'ru'] as const).map(
      (loc) => `    <link rel="alternate" hreflang="${LOCALE_HREFLANG[loc]}" href="${hrefFor(loc)}" />`,
    ),
    `    <link rel="alternate" hreflang="x-default" href="${hrefFor('sr')}" />`,
  ]
  return lines.join('\n')
}

function pageTitle(locale: Locale, pagePath: string): string | null {
  try {
    const catalog = JSON.parse(readFileSync(join(pluginRoot, `src/i18n/${locale}.json`), 'utf8')) as {
      meta: MetaCatalog
    }
    const meta = catalog.meta
    if (pagePath === 'index.html') return meta.home.title
    if (pagePath === 'nas-tim.html') return meta.team.title
    const serviceMatch = pagePath.match(/^usluge\/(.+)\.html$/)
    if (serviceMatch?.[1] && meta.services[serviceMatch[1]]) return meta.services[serviceMatch[1]]!
  } catch {
    /* catalogs optional during early boot */
  }
  return null
}

function localizeHtml(source: string, locale: Locale, pagePath: string): string {
  let html = source
  html = html.replace(/<html\b([^>]*)>/i, (_m, attrs: string) => {
    let next = attrs.replace(/\slang="[^"]*"/i, '')
    next = next.replace(/\sdata-locale="[^"]*"/i, '')
    return `<html lang="${LOCALE_HTML_LANG[locale]}" data-locale="${locale}"${next}>`
  })

  const title = pageTitle(locale, pagePath)
  if (title) {
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
  }

  html = html.replace(/(src|href)="\.?\.?\/src\//g, '$1="/src/')
  html = html.replace(/(src|href)="\.?\.?\/assets\//g, '$1="/assets/')

  if (!html.includes('hreflang=')) {
    html = html.replace('</head>', `${hreflangLinks(pagePath)}\n  </head>`)
  }

  return html
}

function ensureLocaleHtml(rootDir: string): string[] {
  const inputs: string[] = []
  for (const locale of PREFIX_LOCALES) {
    for (const page of ROOT_PAGES) {
      const srcPath = join(rootDir, page)
      if (!existsSync(srcPath)) continue
      const outPath = join(rootDir, locale, page)
      mkdirSync(dirname(outPath), { recursive: true })
      const source = readFileSync(srcPath, 'utf8')
      writeFileSync(outPath, localizeHtml(source, locale, page), 'utf8')
      inputs.push(outPath)
    }
  }
  return inputs
}

export function i18nPlugin(rootDir: string): Plugin {
  let server: ViteDevServer | undefined

  return {
    name: 'hos-i18n',
    config() {
      ensureLocaleHtml(rootDir)
      return {}
    },
    configureServer(devServer) {
      server = devServer
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? ''
        const match = url.match(/^\/(en|de|ru)(\/.*)?$/)
        if (!match) return next()

        const locale = match[1] as PrefixedLocale
        let rest = match[2] ?? '/'
        if (rest === '/') rest = '/index.html'
        if (rest.endsWith('/')) rest = `${rest}index.html`

        const filePath = join(rootDir, locale, rest.replace(/^\//, ''))
        if (existsSync(filePath) && filePath.endsWith('.html')) {
          const page = rest.replace(/^\//, '')
          const sourcePath = join(rootDir, page === 'index.html' ? 'index.html' : page)
          if (existsSync(sourcePath)) {
            writeFileSync(filePath, localizeHtml(readFileSync(sourcePath, 'utf8'), locale, page), 'utf8')
          }
          req.url = `/${locale}${rest}`
        }
        next()
      })
    },
    buildStart() {
      ensureLocaleHtml(rootDir)
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(html, ctx) {
        const rel = relative(rootDir, ctx.filename).replace(/\\/g, '/')
        const localeMatch = rel.match(/^(en|de|ru)\//)
        const locale = (localeMatch?.[1] ?? 'sr') as Locale
        const pagePath = (locale === 'sr' ? rel : rel.replace(/^(en|de|ru)\//, '')) || 'index.html'

        let out = localizeHtml(html, locale, pagePath)

        // Dev: prerender via Vite SSR module loader so /en shows real content without a full build
        if (server) {
          try {
            const mod = (await server.ssrLoadModule('/src/i18n/prerender.ts')) as {
              prerenderPage: (h: string, l: Locale, p: string) => string
            }
            out = mod.prerenderPage(out, locale, pagePath)
          } catch (err) {
            console.warn('[hos-i18n] dev prerender skipped:', err)
          }
        }

        return out
      },
    },
  }
}

export function localeBuildInputs(rootDir: string): Record<string, string> {
  ensureLocaleHtml(rootDir)
  const inputs: Record<string, string> = {}
  for (const locale of PREFIX_LOCALES) {
    for (const page of ROOT_PAGES) {
      const key = `${locale}-${page.replace(/[/.]/g, '-')}`
      inputs[key] = join(rootDir, locale, page)
    }
  }
  return inputs
}
