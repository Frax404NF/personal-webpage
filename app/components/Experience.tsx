'use client'

import { useInView } from '../hooks/useInView'

const experiences = [
  {
    period: '2024',
    company: 'Telkom Indonesia',
    role: 'Programming Intern',
    note: 'MSIB Batch 7, selected from 64,000+ applicants',
    bullets: [
      'Managed and optimized WordPress-based websites, integrating plugins and testing features.',
      'Developed systematic approaches to technical problem-solving in a cross-functional team.',
    ],
    links: [{ label: 'Certificate', href: 'https://drive.google.com/file/d/1ntZOwapZGfHStuGExNCgi3hBYL0Rk2X2/view?usp=sharing' }],
  },
  {
    period: '2024',
    company: 'Braincore.id',
    role: 'Full-Stack Software Engineer',
    note: 'Remote',
    bullets: [
      'Built production features in React (Next.js) and TypeScript, integrating RESTful APIs with custom hooks and reusable components.',
      'Supported cloud deployment on GCP and collaborated in an Agile team using GitHub workflows.',
    ],
    links: [{ label: 'Company', href: 'https://braincore.id/' }],
  },
  {
    period: '2024',
    company: 'Bangkit Academy',
    role: 'Cloud Computing Cohort',
    note: 'Top 10% of 57,000+ applicants, led by Google, Tokopedia, Gojek, Traveloka',
    bullets: [
      'Graduated with distinction; recognized as one of the 1,000 most active students in ILT sessions.',
      'Led multiple study group sessions and implemented GCP best practices across capstone project.',
    ],
    links: [{ label: 'Certificate', href: 'https://drive.google.com/file/d/1yK8pXNswXeWGqHos7xp81_6YxO3vwNyE/view?usp=sharing' }],
  },
  {
    period: '2023',
    company: 'PT. Mekar Investama Teknologi',
    role: 'Full Stack Engineer',
    note: '',
    bullets: [
      'Built RESTful APIs integrating JIRA and Google Cloud using Django.',
      'Configured Docker Compose environments and managed collaboration via GitLab.',
    ],
    links: [{ label: 'Company', href: 'https://mekar.id/' }],
  },
  {
    period: '2023',
    company: 'Universitas Sam Ratulangi',
    role: 'Teaching Assistant, Algorithms & Programming',
    note: '',
    bullets: [
      'Supervised practicum sessions and helped students understand loops, functions, and OOP fundamentals.',
    ],
    links: [],
  },
]

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M2.5 11.5L11.5 2.5M11.5 2.5H6M11.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Experience() {
  const seenYears = new Set<string>()
  const { ref: headingRef, inView: headingInView } = useInView()
  const { ref: listRef, inView: listInView } = useInView()

  return (
    <section id="experience" aria-labelledby="experience-heading" style={{ background: 'var(--color-bg-subtle)', padding: '96px 0', fontFamily: 'var(--font-sans)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className={`animate-fade-up${headingInView ? ' in-view' : ''}`}
          style={{ marginBottom: '3.5rem' }}
        >
          <span className="section-label">Experience</span>
          <h2 id="experience-heading" className="section-heading">Where I&apos;ve worked</h2>
        </div>

        <div
          ref={listRef as React.RefObject<HTMLDivElement>}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {experiences.map((exp, i) => {
            const showYear = !seenYears.has(exp.period)
            seenYears.add(exp.period)
            const delay = Math.min(i, 4) * 60

            return (
              <div
                key={i}
                className={`exp-row animate-fade-up${listInView ? ' in-view' : ''}`}
                style={{ animationDelay: `${delay}ms` }}
              >
                <div className="exp-year" aria-hidden={!showYear}>
                  {showYear ? exp.period : ''}
                </div>

                <div>
                  <div className="exp-header">
                    <span className="exp-company">{exp.company}</span>
                    <span className="exp-role">{exp.role}</span>
                  </div>

                  {exp.note && <p className="exp-note">{exp.note}</p>}

                  <ul className="exp-bullets">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="exp-bullet">{bullet}</li>
                    ))}
                  </ul>

                  {exp.links.length > 0 && (
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {exp.links.map(link => (
                        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="link-accent exp-link">
                          {link.label} <ExternalIcon />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
