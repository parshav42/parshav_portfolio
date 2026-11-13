import AILab from './components/ai-lab/AILab'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import AboutPlaceholder from './components/sections/AboutPlaceholder'
import ContactPlaceholder from './components/sections/ContactPlaceholder'
import JourneyPlaceholder from './components/sections/JourneyPlaceholder'
import TechArsenal from './components/sections/TechArsenal'
import MovieIntelligence from './features/movie-intelligence/MovieIntelligence'
import RobotAssistant from './components/RobotAssistant'
import EmbeddedProjectViewer from './components/ai-lab/EmbeddedProjectViewer'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export default function App() {
  const [isMovieExperienceOpen, setIsMovieExperienceOpen] = useState(false)
  const [embeddedProject, setEmbeddedProject] = useState(null)

  const leaveMovieExperience = () => {
    setIsMovieExperienceOpen(false)
    window.setTimeout(() => document.getElementById('ai-lab')?.scrollIntoView({ behavior: 'smooth' }), 220)
  }

  return (
    <main className="relative min-h-screen overflow-x-clip bg-canvas text-ink">
      <AnimatePresence mode="wait">
        {isMovieExperienceOpen ? (
          <motion.div key="movie-intelligence" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}>
            <MovieIntelligence onExit={leaveMovieExperience} />
          </motion.div>
        ) : (
          <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <Navbar />
            <Hero />
            <TechArsenal />
            <AILab onOpenMovieIntelligence={() => setIsMovieExperienceOpen(true)} onOpenEmbed={setEmbeddedProject} />
            <JourneyPlaceholder onOpenEmbed={setEmbeddedProject} />
            <AboutPlaceholder />
            <ContactPlaceholder />
            <RobotAssistant />
            <EmbeddedProjectViewer project={embeddedProject} onClose={() => setEmbeddedProject(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
