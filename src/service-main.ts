import './style.css'
import { bootstrapI18n } from './i18n/bootstrap'
import { metaCopy } from './i18n/content'
import { mountSections, renderServicePage } from './lib/render'
import { initHeader } from './components/header'
import { initReveal } from './components/reveal'
import { initLightbox } from './components/lightbox'
import { initFloatingActions } from './components/floatingActions'
import { initLangSwitch } from './components/langSwitch'
import { $ } from './lib/dom'

document.addEventListener('DOMContentLoaded', () => {
  bootstrapI18n()

  const slug = document.body.dataset.service ?? ''
  const serviceTitles = metaCopy().services as Record<string, string | undefined>
  const title = slug ? serviceTitles[slug] : undefined
  if (title) document.title = title

  mountSections()

  const mount = $<HTMLElement>('[data-service-content]')
  if (mount && slug) mount.innerHTML = renderServicePage(slug)

  initHeader()
  initReveal()
  initLightbox()
  initFloatingActions()
  initLangSwitch()
})
