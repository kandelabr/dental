import './style.css'
import { mountSections, renderServicePage } from './lib/render'
import { getServicePage } from './data/servicePages'
import { initHeader } from './components/header'
import { initReveal } from './components/reveal'
import { initLightbox } from './components/lightbox'
import { initFloatingActions } from './components/floatingActions'
import { initLangSwitch } from './components/langSwitch'
import { $ } from './lib/dom'

document.addEventListener('DOMContentLoaded', () => {
  const slug = document.body.dataset.service ?? ''
  const page = getServicePage(slug)
  if (page) document.title = `${page.eyebrow} — House of Smile`

  mountSections()

  const mount = $<HTMLElement>('[data-service-content]')
  if (mount && slug) mount.innerHTML = renderServicePage(slug)

  initHeader()
  initReveal()
  initLightbox()
  initFloatingActions()
  initLangSwitch()
})
