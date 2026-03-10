import { useState, useEffect } from 'react'
import Cursor   from './components/Cursor'
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import Marquee  from './components/Marquee'
import Stats    from './components/Stats'
import About    from './components/About'
import Skills   from './components/Skills'
import Projects from './components/Projects'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [showTop, setShowTop] = useState(false)

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
  }

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Cursor />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed', bottom: 28, right: 28,
          width: 50, height: 50,
          background: 'var(--accent)', color: '#000',
          border: 'var(--border)', cursor: 'pointer',
          fontSize: '1.2rem', fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '4px 4px 0 var(--shadow)', zIndex: 500,
          fontFamily: "'Space Mono', monospace",
          opacity: showTop ? 1 : 0,
          pointerEvents: showTop ? 'all' : 'none',
          transition: '0.3s',
        }}
      >↑</button>

      <Hero />
      <Marquee />
      <Stats />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}
