import { ArrowUpRight, BrainCircuit, Leaf, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export default function ProjectNode({ project, index, onSelect, onOpenEmbed, nodeRef }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={nodeRef}
      className="project-node-float"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.button
        type="button"
        className={`project-node group p-4 sm:p-5 md:p-6 ${project.isUpcoming ? 'project-node-upcoming' : ''}`}
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      onClick={() => {
        if (project.isEmbeddable && project.embedUrl) {
          onOpenEmbed(project)
          return
        }
        onSelect(project.id)
      }}
      aria-label={`Open ${project.name} preview`}
    >
      <span className={`project-visual project-visual-${project.id}`} aria-hidden="true">
        <span className="project-visual-grid" />
        {project.id === 'sugarcane-disease-detection' ? <Leaf size={48} strokeWidth={1.2} /> : <BrainCircuit size={48} strokeWidth={1.2} />}
        <span className="project-node-mark"><Sparkles size={15} strokeWidth={1.8} /></span>
      </span>
      <span className="flex items-start justify-between gap-4">
        <span className="node-index">SYSTEM {project.number}</span>
        <span className="node-status">{project.status}</span>
      </span>
      <span className="project-node-copy">
        <span className="project-node-name">{project.name}</span>
        <span className="project-node-category">{project.category}</span>
        <span className="project-node-description">{project.description}</span>
      </span>
      <span className="project-metrics" aria-label="Project metrics">
        {(project.metrics ?? []).map((metric) => <span key={metric}>{metric}</span>)}
      </span>
      <span className="project-tech-stack" aria-label="Technology stack">
        {(project.techStack ?? []).map((technology) => <span key={technology}>{technology}</span>)}
      </span>
      <span className="node-action">
        {project.actionLabel.toUpperCase()} <ArrowUpRight size={16} aria-hidden="true" />
      </span>
      </motion.button>
    </motion.div>
  )
}
