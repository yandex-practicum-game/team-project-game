import { useState } from 'react'
import { UseToggleType } from '../pages/PresentationPage/types'

export const useToggle: UseToggleType = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const toggleValue = () => {
    setValue(previousValue => !previousValue)
  }

  return [value, toggleValue]
}
