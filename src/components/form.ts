import { $, on } from '../lib/dom'
import { ui } from '../i18n/content'

const PHONE_RE = /^[+0-9\s()-]{6,20}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FieldError {
  field: string
  message: string
}

export function initForm(): void {
  const form = $<HTMLFormElement>('#contact-form')
  if (!form) return

  const fieldsWrap = $<HTMLElement>('[data-form-fields]', form)
  const submitBtn = $<HTMLButtonElement>('[data-submit-btn]', form)
  const submitLabel = $<HTMLElement>('[data-submit-label]', form)
  const success = $<HTMLElement>('[data-success]', form)
  const resetBtn = $<HTMLButtonElement>('[data-reset-form]', form)
  const formUi = () => ui().form

  on(form, 'submit', (e) => {
    e.preventDefault()
    const errors = validate(form)
    clearErrors(form)

    if (errors.length) {
      errors.forEach(({ field, message }) => showError(form, field, message))
      const firstField = $<HTMLElement>(`[data-field="${errors[0]!.field}"]`, form)
      firstField?.focus()
      return
    }

    if (!submitBtn || !submitLabel || !fieldsWrap || !success) return
    submitBtn.disabled = true
    submitLabel.textContent = formUi().submitting
    submitBtn.classList.add('opacity-70')

    const data = Object.fromEntries(new FormData(form).entries())
    window.setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('Kontakt forma — podaci za slanje:', data)
      // TODO: backend integration
      fieldsWrap.classList.add('hidden')
      submitBtn.classList.add('hidden')
      success.classList.remove('hidden')
    }, 900)
  })

  on(resetBtn, 'click', () => {
    form.reset()
    clearErrors(form)
    fieldsWrap?.classList.remove('hidden')
    submitBtn?.classList.remove('hidden')
    success?.classList.add('hidden')
    if (submitBtn) {
      submitBtn.disabled = false
      submitBtn.classList.remove('opacity-70')
    }
    if (submitLabel) submitLabel.textContent = formUi().submit
  })
}

function validate(form: HTMLFormElement): FieldError[] {
  const errors: FieldError[] = []
  const err = ui().form.errors
  const name = (form.querySelector<HTMLInputElement>('[data-field="name"]')?.value ?? '').trim()
  const phone = (form.querySelector<HTMLInputElement>('[data-field="phone"]')?.value ?? '').trim()
  const email = (form.querySelector<HTMLInputElement>('[data-field="email"]')?.value ?? '').trim()
  const consent = form.querySelector<HTMLInputElement>('[data-field="consent"]')?.checked ?? false

  if (name.length < 3) errors.push({ field: 'name', message: err.name })
  if (!PHONE_RE.test(phone)) errors.push({ field: 'phone', message: err.phone })
  if (email && !EMAIL_RE.test(email)) errors.push({ field: 'email', message: err.email })
  if (!consent) errors.push({ field: 'consent', message: err.consent })

  return errors
}

function showError(form: HTMLFormElement, field: string, message: string): void {
  const input = form.querySelector<HTMLElement>(`[data-field="${field}"]`)
  const errorEl = form.querySelector<HTMLElement>(`[data-error-for="${field}"]`)
  input?.classList.add('border-red-400')
  input?.setAttribute('aria-invalid', 'true')
  if (errorEl) {
    errorEl.textContent = message
    errorEl.classList.remove('hidden')
  }
}

function clearErrors(form: HTMLFormElement): void {
  form.querySelectorAll<HTMLElement>('[data-field]').forEach((el) => {
    el.classList.remove('border-red-400')
    el.removeAttribute('aria-invalid')
  })
  form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((el) => {
    el.textContent = ''
    el.classList.add('hidden')
  })
}
