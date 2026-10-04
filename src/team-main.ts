import './style.css'
import { bootstrapI18n } from './i18n/bootstrap'
import { metaCopy } from './i18n/content'
import { mountSections, renderTeamPage } from './lib/render'
import { initHeader } from './components/header'
import { initReveal } from './components/reveal'
import { initFloatingActions } from './components/floatingActions'
import { initLangSwitch } from './components/langSwitch'
import { $ } from './lib/dom'

document.addEventListener('DOMContentLoaded', () => {
  bootstrapI18n()
  document.title = metaCopy().team.title

  mountSections()

  const mount = $<HTMLElement>('[data-team-content]')
  if (mount) mount.innerHTML = renderTeamPage()

  initHeader()
  initReveal()
  initFloatingActions()
  initLangSwitch()
})
