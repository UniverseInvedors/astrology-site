import { useState, useEffect } from 'react'

// Shared language hook — reads from the global window.__astroLang set by Navbar
export function useLang() {
  const [lang, setLang] = useState(
    typeof window !== 'undefined' ? (window.__astroLang || 'bn') : 'bn'
  )
  useEffect(() => {
    const handler = (code) => setLang(code)
    if (typeof window !== 'undefined') {
      if (!window.__astroLangListeners) window.__astroLangListeners = []
      window.__astroLangListeners.push(handler)
      return () => {
        window.__astroLangListeners = window.__astroLangListeners.filter(fn => fn !== handler)
      }
    }
  }, [])
  return lang
}
