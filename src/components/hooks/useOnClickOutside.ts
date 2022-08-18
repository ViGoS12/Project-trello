import { KeyboardEvent, useEffect } from 'react'

function useOnClickOutside(
  ref: React.RefObject<HTMLInputElement>,
  handler: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export default useOnClickOutside
