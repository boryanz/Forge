import { useEffect, useRef } from 'react'

// Screens register what "back" means while they are mounted; the most recently mounted one wins.
// App calls runBackHandler() on the Android hardware back button.
const stack = []

export function useBackHandler(handler, active = true) {
  const ref = useRef(handler)
  ref.current = handler
  useEffect(() => {
    if (!active) return undefined
    const h = () => ref.current?.()
    stack.push(h)
    return () => {
      const i = stack.lastIndexOf(h)
      if (i >= 0) stack.splice(i, 1)
    }
  }, [active])
}

export function runBackHandler() {
  const h = stack.at(-1)
  h?.()
  return !!h
}
