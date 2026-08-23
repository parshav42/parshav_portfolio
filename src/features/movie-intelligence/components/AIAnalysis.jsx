import { motion, useReducedMotion } from 'framer-motion'

const steps = ['Analyzing movie characteristics', 'Mapping genre patterns', 'Comparing audience preferences', 'Finding similar content']

export default function AIAnalysis({ activeStep }) {
  const shouldReduceMotion = useReducedMotion()
  return <section className="ai-analysis" aria-live="polite" aria-label="Recommendation analysis in progress"><p className="movie-section-label">Recommendation analysis</p>{steps.map((step, index) => <motion.div key={step} className={`analysis-step ${index <= activeStep ? 'analysis-step-active' : ''}`} initial={false} animate={{ opacity: index <= activeStep ? 1 : 0.38, x: index === activeStep && !shouldReduceMotion ? [0, 4, 0] : 0 }} transition={{ duration: 0.35 }}><span>{index + 1}</span>{step}</motion.div>)}</section>
}
