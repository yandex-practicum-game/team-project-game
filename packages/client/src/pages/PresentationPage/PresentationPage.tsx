import { useState } from 'react'
import { Crawl } from './components/Crawl'
import { Greeting } from './components/Greeting'
import { useAnyKeyListener } from './hooks/useAnyKeyListener'

export const PresentationPage = () => {
  const [value, setValue] = useState(false)

  const toggleValue = () => {
    setValue(previousValue => !previousValue)
  }

  useAnyKeyListener(toggleValue)

  return value ? <Crawl /> : <Greeting />
}
