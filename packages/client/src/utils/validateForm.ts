export const validateForm = (form: HTMLFormElement): boolean => {
  const inputs = form.querySelectorAll('input')
  const results: string[] = []
  const isInvalid = 'isInvalid'

  Array.from(inputs).forEach(input => {
    if (!input.value || !input.validity.valid) {
      input.setCustomValidity(isInvalid)
      results.push(isInvalid)
    }
  })

  return results.every(value => value !== isInvalid)
}
