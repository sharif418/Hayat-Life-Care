'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return ''
  
  let visitorId = localStorage.getItem('hayat_visitor_id')
  if (!visitorId) {
    visitorId = `v_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    localStorage.setItem('hayat_visitor_id', visitorId)
  }
  return visitorId
}

export default function SiteVisitTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const visitorId = getOrCreateVisitorId()
    if (!visitorId) return

    // Small delay to not block page rendering
    const timer = setTimeout(() => {
      fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId,
          page: pathname,
          referrer: document.referrer || null,
        }),
      }).catch((err) => console.error('Visit tracking failed:', err))
    }, 500)

    return () => clearTimeout(timer)
  }, [pathname])

  return null // This component renders nothing
}
