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

const compactProjects = [
  {
    name: 'User Directory Web Apps',
    image: '/user-directory.png',
    description: 'A comprehensive user management interface built with Next.js 15, featuring robust type safety and comprehensive Jest testing.',
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind v4', 'Jest'],
    github: 'https://github.com/Frax404NF/mampu-tech',
  },
  {
    name: 'Employee Attendance System API',
    image: '/back-end-pic.jpg',
    description: 'A highly concurrent backend service managing employee clock-ins, utilizing Redis caching and Bull queues for asynchronous task processing.',
    tags: ['Node.js', 'Express', 'Redis', 'MySQL', 'Bull Queue'],
    github: 'https://github.com/Frax404NF/attendance-system-api',
  },
  {
    name: 'URL Analytics Platform',
    image: '/url-analytics.png',
    description: 'A full-stack analytics tool tracking link engagement metrics, built with Flask and styled with Tailwind CSS.',
    tags: ['Flask', 'Tailwind', 'MySQL'],
    link: 'https://www.linkedin.com/posts/frandi-andika_url-analytics-project-activity-7246383976804720640-BfCW',
  },
  {
    name: 'Bookshelf API',
    image: '/back-end-pic.jpg',
    description: 'A RESTful service for book inventory management, built with core Node.js principles and vanilla JavaScript.',
    tags: ['Node.js', 'JavaScript', 'REST API'],
    github: 'https://github.com/Frax404NF/Bookshelf-API-Fixed',
  },
  {
    name: 'Bakoding Website',
    image: '/bakoding.png',
    description: 'A fundamental web development project demonstrating semantic HTML5, modern CSS3 styling, and interactive JavaScript.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/Frax404NF/Belajar-Dasar-Pemrograman-Web-Submission',
  },
]

function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags-group">
      {items.map(tag => <span key={tag} className="tag">{tag}</span>)}
    </div>
  )
}

function MajorProjectRow({ project, index }: { project: MajorProject, index: number }) {
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
    
    // Max rotation is 12 degrees
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
            transition: isHovering ? 'transform 100ms ease-out' : 'transform 500ms ease-out'
          }}
        >
          <Image src={project.image} alt={`${project.name} preview`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
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
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-accent work-link">GitHub <ExternalIcon /></a>}
          {project.docs && <a href={project.docs} target="_blank" rel="noopener noreferrer" className="link-muted work-link">Docs <ExternalIcon /></a>}
          {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-accent work-link">View <ExternalIcon /></a>}
        </div>
      </div>
    </div>
  )
}

function MinorProjectRow({ project, index }: { project: MajorProject, index: number }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`work-minor-grid animate-fade-up${inView ? ' in-view' : ''} stagger-${Math.min(index + 1, 5)}`}
    >
      <div style={{ position: 'relative', aspectRatio: '16/9', width: '100%' }}>
        <div className="project-image-wrapper">
          <Image src={project.image} alt={`${project.name} preview`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 30vw" />
        </div>
      </div>
      <div className="project-info-stack">
        <div className="project-header minor">
          <h3 className="project-title title-minor">
            {project.name}
          </h3>
          <Tags items={project.tags} />
        </div>
        <p className="project-desc desc-minor">
          {project.description}
        </p>
        <div className="project-links minor">
          {'github' in project && project.github ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-accent work-link">GitHub <ExternalIcon /></a>
          ) : (
            <a href={(project as { link?: string }).link} target="_blank" rel="noopener noreferrer" className="link-accent work-link">View <ExternalIcon /></a>
          )}
        </div>
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
          <span className="section-label">Work</span>
          <h2 id="work-heading" className="section-heading">Selected projects</h2>
        </div>

        <div className="section-divider">
          {majorProjects.map((project, i) => (
            <MajorProjectRow key={project.name} project={project} index={i} />
          ))}
        </div>

        <div
          ref={compactRef as React.RefObject<HTMLDivElement>}
          style={{ paddingTop: '2rem' }}
        >
          <div className="work-minor-header">
            <h2 className="section-heading">More projects</h2>
            <a href="https://github.com/Frax404NF" target="_blank" rel="noopener noreferrer" className="link-muted work-link" style={{ fontSize: 'var(--text-base)' }}>
              View GitHub archive <ExternalIcon />
            </a>
          </div>

          <div>
            {compactProjects.map((project, i) => (
              <MinorProjectRow key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
