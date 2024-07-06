import { useState, useRef, useEffect } from 'react'

type Timer = ReturnType<typeof setTimeout>
type SomeFunction = (args: any[] | any) => void

export const useDebounceFunc = <Func extends SomeFunction>(func: Func, delay = 500) => {
  const [timer, setTimer] = useState<Timer>()
  const stopExecution = useRef(false)

  const debounced = ((...args) => {
    if (stopExecution.current) return
    const newTimer = setTimeout(() => {
      func(...args)
    }, delay)
    clearTimeout(timer)
    setTimer(newTimer)
  }) as Func

  useEffect(() => {
    stopExecution.current = false

    return () => {
      stopExecution.current = true
    }
  }, [])

  return debounced
}
