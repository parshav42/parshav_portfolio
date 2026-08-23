import { motion, useReducedMotion } from 'framer-motion'

export default function PlaceholderSection({ id, label, title, description }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id={id} className="placeholder-section" aria-labelledby={`${id}-title`}>
      <motion.div
        className="mx-auto max-w-6xl px-6 sm:px-10"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        <p className="hero-eyebrow">{label}</p>
        <h2 id={`${id}-title`} className="mt-4 text-3xl font-medium tracking-[-0.04em] text-ink sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft">{description}</p>
      </motion.div>
    </section>
  )
}
