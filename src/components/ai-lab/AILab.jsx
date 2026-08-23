import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../../data/projects'
import ProjectNetwork from './ProjectNetwork'
import ProjectPreview from './ProjectPreview'

export default function AILab({ onOpenMovieIntelligence }) {
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="ai-lab" className="ai-lab-section" aria-labelledby="ai-lab-title">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="hero-eyebrow">A connected ecosystem</p>
          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="ai-lab-title" className="max-w-xl text-4xl font-medium tracking-[-0.045em] text-[#0F172A] sm:text-5xl">
              Explore the AI Lab.
            </h2>
            <p className="max-w-sm text-sm leading-6 text-[#64748B]">
              Interactive systems built around machine learning, retrieval, and intelligent user experiences.
            </p>
          </div>
        </motion.div>
        <ProjectNetwork projects={projects} onSelectProject={(projectId) => projectId === 'movie-intelligence' ? onOpenMovieIntelligence() : setSelectedProjectId(projectId)} />
      </div>
      <ProjectPreview project={selectedProject} onClose={() => setSelectedProjectId(null)} />
    </section>
  )
}
