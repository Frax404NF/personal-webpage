import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Experience from './components/Experience'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StatusPill from './components/StatusPill'

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
      <StatusPill />
    </>
  )
}
