import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'

export default function ProjectPreview({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!project) return undefined
    const previouslyFocused = document.activeElement
    closeButtonRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-preview-backdrop"
          role="presentation"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-preview-title"
            className="project-preview"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.23, ease: 'easeOut' }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="hero-eyebrow">SYSTEM {project.number}</p>
                <h2 id="project-preview-title" className="mt-3 text-3xl font-medium tracking-[-0.045em] text-[#0F172A] sm:text-4xl">{project.name}</h2>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-[#F97316]">{project.category}</p>
              </div>
              <button ref={closeButtonRef} className="preview-close" type="button" onClick={onClose} aria-label="Close project preview">
                <X size={19} aria-hidden="true" />
              </button>
            </div>

            <div className="preview-grid mt-9">
              <div>
                <p className="preview-label">What problem does it solve?</p>
                <p className="preview-copy">{project.problem}</p>
              </div>
              <div>
                <p className="preview-label">Core technology</p>
                <p className="preview-copy">{project.technology}</p>
              </div>
            </div>

            <div className="mt-9">
              <p className="preview-label">How does it work?</p>
              <ol className="project-flow">
                {project.flow.map((step, index) => (
                  <li key={step}>
                    <span>{step}</span>
                    {index < project.flow.length - 1 && <i aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-7 text-sm text-[#64748B]">Status: <span className="text-[#0F172A]">{project.status}</span></p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="preview-action preview-action-primary" type="button" disabled>
                Try Live Demo <ArrowUpRight size={16} aria-hidden="true" />
              </button>
              <button className="preview-action" type="button" disabled>View Engineering Details</button>
              <button className="preview-action" type="button" disabled>GitHub — Coming Soon</button>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
