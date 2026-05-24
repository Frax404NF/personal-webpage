export default function Footer() {
  return (
    <footer
      style={{
        padding: '2rem',
        borderTop: '1px solid var(--color-border)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            margin: 0,
          }}
        >
          &copy; 2026 Frandi Andika
        </p>
      </div>
    </footer>
  )
}
