import { useEffect } from 'react'

export const useAnyKeyListener = (handler: () => void) => {
  useEffect(() => {
    window.addEventListener('keyup', handler)

    return () => {
      window.removeEventListener('keyup', handler)
    }
  }, [])
}
