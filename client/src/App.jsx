import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { InboxProvider } from './context/InboxContext'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import About from './components/About'
import Journey from './components/Journey'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import AchievementsGallery from './components/AchievementsGallery'
import Certifications from './components/Certifications'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleField from './components/ParticleField'
import LiquidBackground from './components/LiquidBackground'
import CustomCursor from './components/CustomCursor'
import CommandPalette from './components/CommandPalette'
import WaveDivider from './components/WaveDivider'
import Inbox from './components/Inbox'
import GitHubStats from './components/GitHubStats'
import CurrentlyBuilding from './components/CurrentlyBuilding'
import { useTheme } from './context/ThemeContext'

function ThemedBackground() {
  const { theme } = useTheme()
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  if (theme !== 'dark') return null
  if (isTouch) return null
  return (
    <div className="fixed inset-0 z-0">
      <ParticleField />
    </div>
  )
}

function ThemeEventBridge() {
  const { toggle } = useTheme()
  useEffect(() => {
    const handler = () => toggle()
    window.addEventListener('ds-toggle-theme', handler)
    return () => window.removeEventListener('ds-toggle-theme', handler)
  }, [toggle])
  return null
}

function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let mounted = true
    const interval = setInterval(() => {
      if (!mounted) return
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 400)
          return 100
        }
        const increment = Math.random() * 15 + 5
        return Math.min(prev + increment, 100)
      })
    }, 200)
    return () => { mounted = false; clearInterval(interval) }
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a23] flex items-center justify-center z-50">
        <div className="text-center max-w-xs">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-2 border-[#00d4ff]/20" />
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00d4ff] border-r-[#7a5cff]"
              style={{
                transform: `rotate(${progress * 3.6}deg)`,
                transition: 'transform 0.3s ease'
              }}
            />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#00d4ff]/10 to-[#7a5cff]/10 flex items-center justify-center">
              <span className="text-xs font-mono text-gray-400">{Math.round(progress)}%</span>
            </div>
          </div>
          <h1 className="text-3xl font-black gradient-text mb-2">Dhruv Soran</h1>
          <p className="text-gray-600 text-sm">Crafting experience...</p>
          <div className="mt-6 h-0.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7a5cff] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative min-h-screen transition-colors duration-500"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <ThemedBackground />
      <LiquidBackground />
      <CustomCursor />
      <ThemeEventBridge />
      <Navbar />
      <main className="relative z-10">
        <Hero3D />
        <WaveDivider />
        <About />
        <Journey />
        <Projects />
        <Skills />

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <GitHubStats />
              <CurrentlyBuilding />
            </div>
          </div>
        </section>

        <Achievements />
        <AchievementsGallery />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <CommandPalette />
      <Inbox />
      <Footer />
    </div>
  )
}

export default function WrappedApp() {
  return (
    <ThemeProvider>
      <InboxProvider>
        <App />
      </InboxProvider>
    </ThemeProvider>
  )
}
