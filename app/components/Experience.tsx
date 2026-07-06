'use client'

import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { ExternalLink as ExternalIcon } from 'lucide-react'

const experiences = [
  {
    period: '2025 - Present',
    company: 'Blue Bridge Corp',
    role: 'Front End Developer',
    note: 'Freelance, Remote',
    bullets: [
      'Shipped client-facing web apps (dashboards, company profiles, learning platforms) in React, Next.js, and TypeScript with Ant Design and Tailwind CSS.',
      'Integrated frontend with backend APIs, handling auth, data fetching, and client-side routing across multiple projects.',
    ],
    links: [],
  },
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
    links: [{ label: 'Certificate', href: 'https://drive.google.com/file/d/1yK8pXNswXeWGqHos7xp81_6YxO3vwNyE/view?usp=sharing' }, { label: 'Highlights journey', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7220382040213372928/' }],
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
    links: [{ label: 'Company', href: 'https://mekar.id/' }, { label: 'Details', href: 'https://www.linkedin.com/in/frandi-andika/details/experience/' }],
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

type ExperienceType = {
  period: string
  company: string
  role: string
  note?: string
  bullets: string[]
  links: { label: string; href: string }[]
}

function ExperienceRow({ exp, showYear, delay, listInView }: { exp: ExperienceType, showYear: boolean, delay: number, listInView: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return
    const rect = rowRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    rowRef.current.style.setProperty('--mouse-x', `${x}px`)
    rowRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      className={`exp-row animate-fade-up${listInView ? ' in-view' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="exp-year" aria-hidden={!showYear}>
        {showYear ? exp.period : ''}
      </div>

      <div className="exp-content">
        <div className="exp-header">
          <span className="exp-company">{exp.company}</span>
          <span className="exp-role">{exp.role}</span>
        </div>

        {exp.note && <p className="exp-note">{exp.note}</p>}

        <ul className="exp-bullets">
          {exp.bullets.map((bullet: string, j: number) => (
            <li key={j} className="exp-bullet">{bullet}</li>
          ))}
        </ul>

        {exp.links.length > 0 && (
          <div className="exp-links-wrapper">
            {exp.links.map((link: {label: string, href: string}) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="link-accent exp-link">
                {link.label} <ExternalIcon size={14} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  const seenYears = new Set<string>()
  const { ref: headingRef, inView: headingInView } = useInView()
  const { ref: listRef, inView: listInView } = useInView()

  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-wrapper" style={{ background: 'var(--color-bg-subtle)' }}>
      <div className="container-bounds">

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
          className="exp-list-wrapper"
        >
          {experiences.map((exp, i) => {
            const showYear = !seenYears.has(exp.period)
            seenYears.add(exp.period)
            const delay = Math.min(i, 4) * 60

            return (
              <ExperienceRow 
                key={i} 
                exp={exp} 
                showYear={showYear} 
                delay={delay} 
                listInView={listInView} 
              />
            )
          })}
        </div>

      </div>
    </section>
  )
}
