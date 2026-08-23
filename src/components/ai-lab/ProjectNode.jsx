import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export default function ProjectNode({ project, index, onSelect }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="project-node-float"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.button
        type="button"
        className={`project-node ${project.isUpcoming ? 'project-node-upcoming' : ''}`}
        animate={shouldReduceMotion ? undefined : { y: [0, index % 2 === 0 ? -3 : 3, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 4.8 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      onClick={() => onSelect(project.id)}
      aria-label={`Open ${project.name} preview`}
    >
      <span className="flex items-start justify-between gap-4">
        <span className="node-index">SYSTEM {project.number}</span>
        <span className="node-status">{project.status}</span>
      </span>
      <span className="project-node-copy">
        <span className="project-node-name">{project.name}</span>
        <span className="project-node-category">{project.category}</span>
        <span className="project-node-description">{project.description}</span>
      </span>
      <span className="node-action">
        {project.actionLabel} <ArrowUpRight size={16} aria-hidden="true" />
      </span>
      </motion.button>
    </motion.div>
  )
}
