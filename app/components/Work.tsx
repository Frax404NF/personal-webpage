'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useInView } from '../hooks/useInView'

import { ExternalLink as ExternalIcon } from 'lucide-react'

type MajorProject = {
  name: string
  badge?: string
  image: string
  description: string
  tags: string[]
  github?: string
  docs?: string
  link?: string
}

const majorProjects: MajorProject[] = [
  {
    name: 'EMR Blockchain System',
    badge: 'HKI Registered',
    image: '/emr-things.jpg',
    description: 'Full-stack Electronic Medical Records system with blockchain-based data integrity verification. Two-tier architecture using React, Node.js/Express, and PostgreSQL, with Ethereum smart contracts for tamper-proof audit trails. Compliant with Indonesian healthcare regulations (PMK 24/2022).',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Solidity', 'Web3'],
    github: 'https://github.com/Frax404NF/BcHealth-EMR',
    docs: 'https://github.com/Frax404NF/BcHealth-EMR#readme',
  },
  {
    name: 'Driver Monitoring System',
    image: '/dms.png',
    description: 'IoT system for driver drowsiness detection using ESP32 CAM, computer vision, and sensor fusion. React dashboard with real-time alerts, deployed on Google Cloud. Bangkit Academy capstone project.',
    tags: ['React', 'GCP', 'IoT', 'Machine Learning'],
    link: 'https://www.linkedin.com/posts/frandi-andika_c241-ms02-activity-7214292277932802048-HNmu',
  },
  {
    name: 'Asclepius Cancer Detection API',
    badge: 'Machine Learning',
    image: '/asclepius-project.png',
    description: 'ML-powered REST API for skin cancer detection. Accepts image uploads, runs TensorFlow inference, and returns predictions with health recommendations. Deployed on Cloud Run with Firestore persistence.',
    tags: ['TensorFlow', 'GCP', 'Cloud Run', 'Firestore'],
    github: 'https://github.com/Frax404NF/Asclepius-dicoding-project',
  }
]

type CompactProject = {
  name: string
  year: string
  description: string
  tags: string[]
  href: string
  linkText: string
}

const compactProjects: CompactProject[] = [
  {
    name: 'User Directory Web App',
    year: '2024',
    description: 'User management interface with type safety & Jest tests',
    tags: ['Next.js 15', 'TypeScript', 'Jest'],
    href: 'https://github.com/Frax404NF/mampu-tech',
    linkText: 'GitHub',
  },
  {
    name: 'Employee Attendance API',
    year: '2024',
    description: 'High-concurrency clock-in service with Bull Queue & Redis',
    tags: ['Node.js', 'Express', 'Redis', 'Bull'],
    href: 'https://github.com/Frax404NF/attendance-system-api',
    linkText: 'GitHub',
  },
  {
    name: 'URL Analytics Platform',
    year: '2024',
    description: 'Engagement metrics and click analytics dashboard',
    tags: ['Flask', 'Tailwind', 'MySQL'],
    href: 'https://www.linkedin.com/posts/frandi-andika_url-analytics-project-activity-7246383976804720640-BfCW',
    linkText: 'View',
  },
  {
    name: 'Bookshelf API',
    year: '2023',
    description: 'RESTful book inventory management service',
    tags: ['Node.js', 'JavaScript', 'REST'],
    href: 'https://github.com/Frax404NF/Bookshelf-API-Fixed',
    linkText: 'GitHub',
  },
  {
    name: 'Bakoding Website',
    year: '2023',
    description: 'Semantic web application demonstrating core DOM & CSS3',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    href: 'https://github.com/Frax404NF/Belajar-Dasar-Pemrograman-Web-Submission',
    linkText: 'GitHub',
  },
]

function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags-group">
      {items.map(tag => <span key={tag} className="tag">{tag}</span>)}
    </div>
  )
}

function MajorProjectRow({ project, index }: { project: MajorProject; index: number }) {
  const { ref, inView } = useInView()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12

    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`work-editorial-grid animate-reveal${inView ? ' in-view' : ''} ${index % 2 !== 0 ? 'reverse-layout' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className="editorial-image"
        ref={imageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '1200px' }}
      >
        <div
          className="project-image-wrapper"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: isHovering ? 'transform 100ms ease-out' : 'transform 500ms ease-out',
          }}
        >
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
      <div className="editorial-content">
        <div className="project-header">
          <h3 className="project-title title-major">
            {project.name}
          </h3>
          {project.badge && <span className="tag">{project.badge}</span>}
        </div>
        <p className="project-desc desc-major">
          {project.description}
        </p>
        <Tags items={project.tags} />
        <div className="project-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-accent work-link">
              GitHub <ExternalIcon size={14} aria-hidden="true" />
            </a>
          )}
          {project.docs && (
            <a href={project.docs} target="_blank" rel="noopener noreferrer" className="link-muted work-link">
              Docs <ExternalIcon size={14} aria-hidden="true" />
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-accent work-link">
              View <ExternalIcon size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function CompactProjectRow({ project, index }: { project: CompactProject; index: number }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`project-index-row animate-fade-up${inView ? ' in-view' : ''}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="project-index-main">
        <span className="project-index-year">{project.year}</span>
        <div className="project-index-info">
          <span className="project-index-name">{project.name}</span>
          <span className="project-index-desc">{project.description}</span>
        </div>
      </div>

      <div className="project-index-meta">
        <div className="project-index-tags">
          {project.tags.map(tag => (
            <span key={tag} className="tag tag-compact">{tag}</span>
          ))}
        </div>

        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent project-index-link"
        >
          <span>{project.linkText}</span>
          <ExternalIcon size={13} className="project-index-icon" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

export default function Work() {
  const { ref: headingRef, inView: headingInView } = useInView()
  const { ref: compactRef } = useInView()

  return (
    <section id="work" aria-labelledby="work-heading" className="section-wrapper">
      <div className="container-bounds">

        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className={`animate-fade-up${headingInView ? ' in-view' : ''}`}
          style={{ marginBottom: '4rem' }}
        >
          <h2 id="work-heading" className="section-heading">Selected projects</h2>
        </div>

        <div className="section-divider">
          {majorProjects.map((project, i) => (
            <MajorProjectRow key={project.name} project={project} index={i} />
          ))}
        </div>

        <div
          ref={compactRef as React.RefObject<HTMLDivElement>}
          style={{ paddingTop: '2.5rem' }}
        >
          <div className="work-minor-header">
            <h2 className="section-heading">More projects</h2>
            <a
              href="https://github.com/Frax404NF"
              target="_blank"
              rel="noopener noreferrer"
              className="link-muted work-link"
              style={{ fontSize: 'var(--text-base)' }}
            >
              View GitHub archive <ExternalIcon size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="project-index-table">
            {compactProjects.map((project, i) => (
              <CompactProjectRow key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
