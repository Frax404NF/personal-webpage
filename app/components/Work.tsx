'use client'

import { useInView } from '../hooks/useInView'

const featuredProject = {
  name: 'EMR Blockchain System',
  badge: 'HKI Registered',
  description:
    'Full-stack Electronic Medical Records system with blockchain-based data integrity verification. Two-tier architecture using React, Node.js/Express, and PostgreSQL, with Ethereum smart contracts for tamper-proof audit trails. Compliant with Indonesian healthcare regulations (PMK 24/2022).',
  tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Solidity', 'Web3'],
  github: 'https://github.com/Frax404NF/BcHealth-EMR',
  docs: 'https://github.com/Frax404NF/BcHealth-EMR#readme',
}

const secondaryProjects = [
  {
    name: 'Driver Monitoring System',
    description:
      'IoT system for driver drowsiness detection using ESP32 CAM, computer vision, and sensor fusion. React dashboard with real-time alerts, deployed on Google Cloud. Bangkit Academy capstone project.',
    tags: ['React', 'GCP', 'IoT', 'Machine Learning'],
    link: 'https://www.linkedin.com/posts/frandi-andika_c241-ms02-activity-7214292277932802048-HNmu',
  },
  {
    name: 'Asclepius Cancer Detection API',
    description:
      'ML-powered REST API for skin cancer detection. Accepts image uploads, runs TensorFlow inference, and returns predictions with health recommendations. Deployed on Cloud Run with Firestore persistence.',
    tags: ['TensorFlow', 'GCP', 'Cloud Run', 'Firestore'],
    github: 'https://github.com/Frax404NF/Asclepius-dicoding-project',
  },
]

const compactProjects = [
  {
    name: 'Employee Attendance System API',
    tags: ['Node.js', 'Express', 'Redis', 'MySQL', 'Bull Queue'],
    github: 'https://github.com/Frax404NF/attendance-system-api',
  },
  {
    name: 'URL Analytics Platform',
    tags: ['Flask', 'Tailwind', 'MySQL'],
    link: 'https://www.linkedin.com/posts/frandi-andika_url-analytics-project-activity-7246383976804720640-BfCW',
  },
  {
    name: 'React Jobs Platform',
    tags: ['React', 'Tailwind', 'Vite'],
    github: 'https://github.com/Frax404NF/React-Jobs',
  },
  {
    name: 'Bookshelf API',
    tags: ['Node.js', 'JavaScript', 'REST API'],
    github: 'https://github.com/Frax404NF/Bookshelf-API-Fixed',
  },
  {
    name: 'Bakoding Website',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/Frax404NF/Belajar-Dasar-Pemrograman-Web-Submission',
  },
]

function ExternalIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M2.5 11.5L11.5 2.5M11.5 2.5H6M11.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Tags({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
      {items.map(tag => <span key={tag} className="tag">{tag}</span>)}
    </div>
  )
}

export default function Work() {
  const { ref: headingRef, inView: headingInView } = useInView()
  const { ref: featuredRef, inView: featuredInView } = useInView()
  const { ref: secondaryRef, inView: secondaryInView } = useInView()
  const { ref: compactRef, inView: compactInView } = useInView()

  return (
    <section id="work" aria-labelledby="work-heading" style={{ padding: '96px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className={`animate-fade-up${headingInView ? ' in-view' : ''}`}
          style={{ marginBottom: '4rem' }}
        >
          <span className="section-label">Work</span>
          <h2 id="work-heading" className="section-heading">Selected projects</h2>
        </div>

        <div
          ref={featuredRef as React.RefObject<HTMLDivElement>}
          className={`work-featured-grid animate-fade-up${featuredInView ? ' in-view' : ''}`}
          style={{ marginBottom: '4rem', paddingBottom: '4rem', borderBottom: '1px solid var(--color-border)', animationDelay: '80ms' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.2, margin: 0, letterSpacing: '-0.02em' }}>
                {featuredProject.name}
              </h3>
              <span className="tag">{featuredProject.badge}</span>
            </div>
            <Tags items={featuredProject.tags} />
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <a href={featuredProject.github} target="_blank" rel="noopener noreferrer" className="link-accent work-link">GitHub <ExternalIcon /></a>
              <a href={featuredProject.docs} target="_blank" rel="noopener noreferrer" className="link-muted work-link">Docs <ExternalIcon /></a>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-body)', lineHeight: 1.7, maxWidth: '60ch', margin: 0 }}>
              {featuredProject.description}
            </p>
          </div>
        </div>

        <div
          ref={secondaryRef as React.RefObject<HTMLDivElement>}
          className={`work-secondary-grid${secondaryInView ? ' in-view' : ''}`}
          style={{ marginBottom: '4rem', paddingBottom: '4rem', borderBottom: '1px solid var(--color-border)' }}
        >
          {secondaryProjects.map((project, i) => (
            <div
              key={project.name}
              className={`animate-fade-up${secondaryInView ? ' in-view' : ''} stagger-${i + 1}`}
            >
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.25, margin: '0 0 0.75rem', letterSpacing: '-0.015em' }}>
                {project.name}
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-body)', lineHeight: 1.65, margin: '0 0 1rem', maxWidth: '52ch' }}>
                {project.description}
              </p>
              <Tags items={project.tags} />
              <div style={{ marginTop: '1rem' }}>
                {'github' in project && project.github ? (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-accent work-link">GitHub <ExternalIcon /></a>
                ) : (
                  <a href={(project as { link?: string }).link} target="_blank" rel="noopener noreferrer" className="link-accent work-link">View <ExternalIcon /></a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div ref={compactRef as React.RefObject<HTMLDivElement>}>
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
            More projects
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {compactProjects.map((project, i) => (
              <li
                key={project.name}
                className={`project-row animate-fade-in${compactInView ? ' in-view' : ''} stagger-${Math.min(i + 1, 5)}`}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    {project.name}
                  </span>
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                    {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>
                {'github' in project && project.github ? (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-muted row-icon" aria-label={`View ${project.name} on GitHub`} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <ExternalIcon size={13} />
                  </a>
                ) : (
                  <a href={(project as { link?: string }).link} target="_blank" rel="noopener noreferrer" className="link-muted row-icon" aria-label={`View ${project.name}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <ExternalIcon size={13} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
