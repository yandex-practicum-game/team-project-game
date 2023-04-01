import { useEffect } from 'react'

export const useAnyKeyListener = (handler: () => void) => {
  const eventListener = () => {
    handler()
  }

  useEffect(() => {
    window.addEventListener('keyup', eventListener)
    window.addEventListener('mouseup', eventListener)

    return () => {
      window.removeEventListener('keyup', eventListener)
      window.removeEventListener('mouseup', eventListener)
    }
  }, [])
}
