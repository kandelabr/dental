import './style.css'
import { bootstrapI18n } from './i18n/bootstrap'
import { mountSections } from './lib/render'
import { initHeader } from './components/header'
import { initReveal } from './components/reveal'
import { initCounters } from './components/counters'
import { initBeforeAfter } from './components/beforeAfter'
import { initAccordions } from './components/accordion'
import { initTabs } from './components/tabs'
import { initLightbox } from './components/lightbox'
import { initCarousels } from './components/carousel'
import { initForm } from './components/form'
import { initFloatingActions } from './components/floatingActions'
import { initLangSwitch } from './components/langSwitch'

document.addEventListener('DOMContentLoaded', () => {
  bootstrapI18n()
  mountSections()
  initHeader()
  initReveal()
  initCounters()
  initBeforeAfter()
  initAccordions()
  initTabs()
  initLightbox()
  initCarousels()
  initForm()
  initFloatingActions()
  initLangSwitch()
})
