import { useEffect } from 'react'

export const useAnyKeyListener = (handler: () => void) => {
  useEffect(() => {
    window.addEventListener('keyup', handler)
    window.addEventListener('mouseup', handler)

    return () => {
      window.removeEventListener('keyup', handler)
      window.removeEventListener('mouseup', handler)
    }
  }, [])
}
