"use client"
import { useEffect, useState } from "react"

export default function useMediaQuery({ mediaString, initialMatch }: { mediaString: string, initialMatch?: boolean }) {
  const [isMatch, setIsMatch] = useState(initialMatch || false)

  useEffect(() => {
    const mql = window.matchMedia(mediaString)

    const listener = (e: MediaQueryListEvent) => {
      setIsMatch(e.matches)
    }

    mql.addEventListener('change', listener)

    return () => {
      mql.removeEventListener('change', listener)
    }
  }, [mediaString])

  return isMatch
}
