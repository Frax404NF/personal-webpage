'use client'

import { useInView } from '../hooks/useInView'

const skillGroups = [
  {
    label: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Express.js', 'Python', 'Django', 'PostgreSQL', 'MySQL', 'Redis', 'Supabase'],
  },
  {
    label: 'Tools & Cloud',
    skills: ['Git', 'Docker', 'Google Cloud', 'Cloud Run', 'Firestore', 'Linux', 'Postman', 'Jira'],
  },
]

export default function About() {
  const { ref: headingRef, inView: headingInView } = useInView()
  const { ref: contentRef, inView: contentInView } = useInView()

  return (
    <section id="about" aria-labelledby="about-heading" style={{ padding: '96px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className={`animate-fade-up${headingInView ? ' in-view' : ''}`}
          style={{ marginBottom: '3.5rem' }}
        >
          <span className="section-label">About</span>
          <h2 id="about-heading" className="section-heading">Background</h2>
        </div>

        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}
        >
          <div className={`animate-fade-up${contentInView ? ' in-view' : ''}`} style={{ animationDelay: '60ms' }}>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-body)', lineHeight: 1.75, maxWidth: '60ch', margin: '0 0 1.25rem' }}>
              I build full-stack web applications with a focus on clean architecture and
              maintainable code. My work spans React frontends, Node.js and Python backends,
              and cloud infrastructure on GCP.
            </p>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-body)', lineHeight: 1.75, maxWidth: '60ch', margin: '0 0 1.25rem' }}>
              CS graduate from Universitas Sam Ratulangi. Selected for Bangkit Academy&apos;s
              Cloud Computing track, graduating top 10% of 57,000+ applicants. Interned at
              Telkom Indonesia (MSIB Batch 7) and PT. Mekar Investama Teknologi. Previously
              at Braincore.id building production features.
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.65, maxWidth: '60ch', margin: 0 }}>
              Outside of work: hiking and trail running in the mountains.
            </p>
          </div>

          <div
            className={`animate-fade-up${contentInView ? ' in-view' : ''}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', animationDelay: '140ms' }}
          >
            {skillGroups.map(group => (
              <div key={group.label}>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-muted)', margin: '0 0 0.6rem', letterSpacing: '0.02em' }}>
                  {group.label}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {group.skills.map(skill => <span key={skill} className="tag">{skill}</span>)}
                </div>
              </div>
            ))}

            <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-muted)', margin: '0 0 0.4rem', letterSpacing: '0.02em' }}>
                Education
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-body)', margin: 0, lineHeight: 1.5 }}>
                Universitas Sam Ratulangi
                <br />
                <span style={{ color: 'var(--color-text-muted)' }}>Computer Science</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
