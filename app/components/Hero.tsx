const NAME = 'Frandi Andika'
const nameChars = NAME.split('')

const containerStyle = {
  maxWidth: '1100px',
  width: '100%',
  margin: '0 auto',
  padding: '0 clamp(1.25rem, 5vw, 4rem)',
} as const

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'clamp(4rem, 10vh, 6rem)',
        paddingBottom: 'clamp(2rem, 6vh, 4rem)',
        overflow: 'hidden',
      }}
    >
      <div style={containerStyle}>
        <p
          className="hero-eyebrow"
          aria-label="Indonesia · Software Engineer · Available for remote"
        >
          <span>Indonesia</span>
          <span className="hero-eyebrow-sep" aria-hidden="true">
            ·
          </span>
          <span>Software Engineer</span>
          <span className="hero-eyebrow-sep" aria-hidden="true">
            ·
          </span>
          <span>Available for remote</span>
        </p>

        <h1
          className="hero-name-block"
          aria-label={NAME}
          style={{ marginBottom: '1.5rem' }}
        >
          {nameChars.map((char, i) => (
            <span
              key={i}
              className="hero-char"
              aria-hidden="true"
              style={{ animationDelay: `${i * 28}ms` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <div className="hero-rule" role="separator" aria-hidden="true" />

        <div className="hero-below">
          <p className="hero-bio">
            Full-stack engineer building reliable web systems. CS graduate,
            Bangkit Academy top&nbsp;10%.
          </p>

          <div className="hero-actions">
            <a href="#work" className="hero-cta-primary">
              View Work
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M8 3L8 13M8 13L4 9M8 13L12 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="https://github.com/Frax404NF"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-secondary"
            >
              GitHub
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M2.5 11.5L11.5 2.5M11.5 2.5H6M11.5 2.5V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
