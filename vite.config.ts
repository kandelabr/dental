import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { i18nPlugin, localeBuildInputs } from './vite-plugin-i18n'

const rootDir = dirname(fileURLToPath(import.meta.url))

const serviceSlugs = [
  'implantologija',
  'estetska-stomatologija',
  'protetika',
  'ortodoncija',
  'opsta-stomatologija',
  'parodontologija',
  'oralna-hirurgija',
  'decja-stomatologija',
] as const

export default defineConfig({
  plugins: [i18nPlugin(rootDir)],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        team: resolve(rootDir, 'nas-tim.html'),
        ...Object.fromEntries(
          serviceSlugs.map((slug) => [slug, resolve(rootDir, `usluge/${slug}.html`)]),
        ),
        ...localeBuildInputs(rootDir),
      },
    },
  },
})
