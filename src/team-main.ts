import './style.css'
import { mountSections, renderTeamPage } from './lib/render'
import { initHeader } from './components/header'
import { initReveal } from './components/reveal'
import { initFloatingActions } from './components/floatingActions'
import { initLangSwitch } from './components/langSwitch'
import { $ } from './lib/dom'

document.addEventListener('DOMContentLoaded', () => {
  document.title = 'Naš tim — House of Smile'
  mountSections()

  const mount = $<HTMLElement>('[data-team-content]')
  if (mount) mount.innerHTML = renderTeamPage()

  initHeader()
  initReveal()
  initFloatingActions()
  initLangSwitch()
})
