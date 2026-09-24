'use client'

import { useEffect, useState } from 'react'

export default function StatusPill() {
  const [timeStr, setTimeStr] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now)
      setTimeStr(`${formatted} WIB`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!timeStr) return null

  return (
    <aside
      aria-label="Current location and local time"
      className="status-pill"
    >
      <span className="status-pill-dot" aria-hidden="true" />
      <span className="status-pill-location">Tangerang, ID</span>
      <span className="status-pill-sep" aria-hidden="true">·</span>
      <span className="status-pill-time">{timeStr}</span>
      <span className="status-pill-extra">
        (UTC+7 · Open to full-time & freelance)
      </span>
    </aside>
  )
}

