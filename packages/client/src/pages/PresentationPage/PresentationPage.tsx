import { useToggle } from '../../hooks/useToggle'
import { Crawl } from './components/Crawl'
import { Greeting } from './components/Greeting'
import { useAnyKeyListener } from './hooks/useAnyKeyListener'

export const PresentationPage = () => {
  const [needShowCrawl, setNeedShowCrawl] = useToggle(false)
  useAnyKeyListener(setNeedShowCrawl)

  return <>{needShowCrawl ? <Crawl /> : <Greeting />}</>
}
