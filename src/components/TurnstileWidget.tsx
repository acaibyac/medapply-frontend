'use client'
import { useEffect, useRef } from 'react'

type Props = { siteKey: string; onToken: (token: string | null) => void }

export default function TurnstileWidget({ siteKey, onToken }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const w: any = (window as any)
    const el = ref.current
    if (!el) return
    function render() {
      if (!w.turnstile) return
      const id = w.turnstile.render(el, {
        sitekey: siteKey,
        callback: (t: string) => onToken(t),
        'error-callback': () => onToken(null),
        'timeout-callback': () => onToken(null),
        'refresh-expired': 'auto',
        theme: 'light',
      })
      return () => { try { w.turnstile.reset(id) } catch {} }
    }
    const cleanup = render()
    return () => { if (cleanup) cleanup() }
  }, [siteKey, onToken])
  return <div ref={ref} className="cf-turnstile" />
}
