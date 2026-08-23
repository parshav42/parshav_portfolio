import { motion, useReducedMotion } from 'framer-motion'

export default function Wordmark({ className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.span
      className={`wordmark ${className}`}
      whileHover={shouldReduceMotion ? undefined : { letterSpacing: '0.16em', opacity: 0.86 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      PARSHAV
    </motion.span>
  )
}
