import { $, on } from '../lib/dom'
import { ui } from '../i18n/content'

const PHONE_RE = /^[+0-9\s()-]{6,20}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = '6d1c6b88-2435-4ba1-802c-f45ae07997c2'

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
  const formError = $<HTMLElement>('[data-form-error]', form)
  const formUi = () => ui().form

  const setSubmitting = (busy: boolean) => {
    if (!submitBtn || !submitLabel) return
    submitBtn.disabled = busy
    submitBtn.classList.toggle('opacity-70', busy)
    submitLabel.textContent = busy ? formUi().submitting : formUi().submit
  }

  const showFormError = (message: string) => {
    if (!formError) return
    formError.textContent = message
    formError.classList.remove('hidden')
  }

  const clearFormError = () => {
    if (!formError) return
    formError.textContent = ''
    formError.classList.add('hidden')
  }

  on(form, 'submit', async (e) => {
    e.preventDefault()
    const errors = validate(form)
    clearErrors(form)
    clearFormError()

    if (errors.length) {
      errors.forEach(({ field, message }) => showError(form, field, message))
      const firstField = $<HTMLElement>(`[data-field="${errors[0]!.field}"]`, form)
      firstField?.focus()
      return
    }

    if (!submitBtn || !submitLabel || !fieldsWrap || !success) return
    setSubmitting(true)

    try {
      const payload = new FormData(form)
      payload.set('access_key', WEB3FORMS_ACCESS_KEY)
      payload.set('subject', 'Novi zahtev sa sajta — House of Smile')
      payload.set('from_name', 'House of Smile kontakt forma')

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: payload,
      })
      const result = (await response.json()) as { success?: boolean; message?: string }

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Web3Forms error')
      }

      fieldsWrap.classList.add('hidden')
      submitBtn.classList.add('hidden')
      success.classList.remove('hidden')
    } catch {
      showFormError(formUi().submitError)
      setSubmitting(false)
    }
  })

  on(resetBtn, 'click', () => {
    form.reset()
    clearErrors(form)
    clearFormError()
    fieldsWrap?.classList.remove('hidden')
    submitBtn?.classList.remove('hidden')
    success?.classList.add('hidden')
    setSubmitting(false)
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
