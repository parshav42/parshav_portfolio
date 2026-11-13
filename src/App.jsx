import Hero from './components/Hero'
import Navbar from './components/Navbar'
import AboutPlaceholder from './components/sections/AboutPlaceholder'
import ContactPlaceholder from './components/sections/ContactPlaceholder'
import JourneyPlaceholder from './components/sections/JourneyPlaceholder'
import RobotAssistant from './components/RobotAssistant'
import EmbeddedProjectViewer from './components/ai-lab/EmbeddedProjectViewer'
import { useState } from 'react'

export default function App() {
  const [embeddedProject, setEmbeddedProject] = useState(null)

  return (
    <main className="relative min-h-screen overflow-x-clip bg-canvas text-ink">
      <Navbar />
      <Hero />
      <JourneyPlaceholder onOpenEmbed={setEmbeddedProject} />
      <AboutPlaceholder />
      <ContactPlaceholder />
      <RobotAssistant />
      <EmbeddedProjectViewer project={embeddedProject} onClose={() => setEmbeddedProject(null)} />
    </main>
  )
}
