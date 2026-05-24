'use client'

import { useEffect, useState } from 'react'

const links = [
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    // Track intersection ratios per section
    const ratios: Record<string, number> = {}

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          ratios[id] = entry.intersectionRatio
          // Set active to whichever section has the highest visible ratio
          const best = Object.entries(ratios).sort((a, b) => b[1] - a[1])[0]
          if (best && best[1] > 0) setActive(best[0])
          else setActive(null)
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [ids])

  return active
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(links.map(l => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: '-100%',
          left: '1rem',
          zIndex: 100,
          padding: '0.5rem 1rem',
          background: 'var(--color-bg)',
          color: 'var(--color-accent)',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          fontFamily: 'var(--font-sans)',
          textDecoration: 'none',
          borderRadius: '4px',
          border: '2px solid var(--color-accent)',
          transition: 'top 150ms',
        }}
        onFocus={e => (e.currentTarget.style.top = '1rem')}
        onBlur={e => (e.currentTarget.style.top = '-100%')}
      >
        Skip to content
      </a>

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background-color 200ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={scrolled || menuOpen ? 'nav-scrolled' : ''}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 2rem',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a href="#" className="nav-name-link">
            Frandi Andika
          </a>

          <nav aria-label="Primary navigation" className="nav-desktop">
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {links.map(({ label, href, id }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={`nav-link${activeSection === id ? ' nav-link-active' : ''}`}
                    aria-current={activeSection === id ? 'true' : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className="nav-menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" aria-label="Mobile navigation" style={{ borderTop: '1px solid var(--color-border)', padding: '1rem 2rem 1.5rem' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
              {links.map(({ label, href, id }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={handleLinkClick}
                    style={{
                      display: 'block',
                      padding: '0.75rem 0',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 500,
                      color: activeSection === id ? 'var(--color-accent)' : 'var(--color-text-body)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--color-border)',
                      transition: 'color 150ms var(--ease-out-quart)',
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  )
}
