import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'

export default function EmbeddedProjectViewer({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const [hasLoadError, setHasLoadError] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!project) return undefined
    const previouslyFocused = document.activeElement
    setHasLoadError(false)
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
          className="embedded-project-backdrop"
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
            aria-labelledby="embedded-project-title"
            className="embedded-project-viewer"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.23, ease: 'easeOut' }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="embedded-project-header">
              <div>
                <p className="hero-eyebrow">Interactive system</p>
                <h2 id="embedded-project-title">{project.name}</h2>
              </div>
              <button ref={closeButtonRef} className="preview-close" type="button" onClick={onClose} aria-label="Close embedded demo">
                <X size={19} aria-hidden="true" />
              </button>
            </header>
            <div className="embedded-project-frame">
              {hasLoadError ? (
                <div className="embedded-project-fallback">
                  <p>This demo cannot be embedded here. Please open it in a new tab.</p>
                  <button type="button" className="preview-action preview-action-primary" onClick={() => window.location.assign(project.embedUrl)}>
                    Open Demo Directly <ExternalLink size={16} aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <iframe
                  src={project.embedUrl}
                  title={project.name}
                  className="w-full h-full border-0"
                  allow="camera; microphone; fullscreen; clipboard-read; clipboard-write"
                  loading="lazy"
                  onError={() => setHasLoadError(true)}
                />
              )}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}