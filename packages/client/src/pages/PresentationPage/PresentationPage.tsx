import { useState } from 'react'
import { Crawl } from './components/Crawl'
import { useAnyKeyListener } from '../../hooks/useAnyKeyListener'
import { StartGame } from '../StartGame'

export const PresentationPage = () => {
  const [value, setValue] = useState(false)

  const toggleValue = () => {
    setValue(previousValue => !previousValue)
  }

  useAnyKeyListener(toggleValue)

  return value ? <StartGame /> : <Crawl />
}
