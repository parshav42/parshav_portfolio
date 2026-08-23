import { ArrowDownRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import NeuralBackground from './NeuralBackground'
import Wordmark from './Wordmark'

const reveal = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="top" className="hero-shell" aria-labelledby="hero-title">
      <NeuralBackground />
      <div className="hero-orb hero-orb-left" aria-hidden="true" />
      <div className="hero-orb hero-orb-right" aria-hidden="true" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pb-20 pt-32 sm:px-10"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.13, delayChildren: 0.28 } } }}
      >
        <motion.p variants={reveal} transition={{ duration: 0.65 }} className="hero-eyebrow">
          System online <span className="mx-2 text-saffron/60">/</span> portfolio 01
        </motion.p>
        <motion.h1 id="hero-title" variants={reveal} transition={{ duration: 0.72 }} className="mt-6">
          <Wordmark className="hero-wordmark" />
        </motion.h1>
        <motion.p
          variants={reveal}
          transition={{ duration: 0.68 }}
          className="mt-5 max-w-2xl text-[0.68rem] font-semibold tracking-[0.2em] text-saffron-strong sm:text-xs sm:tracking-[0.3em]"
        >
          ML ENGINEER <span className="px-1.5 text-saffron/50">·</span> RAG DEVELOPER
        </motion.p>
        <motion.p
          variants={reveal}
          transition={{ duration: 0.68 }}
          className="mt-8 max-w-xl text-xl font-light leading-relaxed text-ink-soft sm:text-2xl"
        >
          I build intelligent systems that people can actually use.
        </motion.p>
        <motion.div variants={reveal} transition={{ duration: 0.6 }} className="mt-10">
          <motion.a
            href="#ai-lab"
            className="cta-button"
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          >
            Explore My AI Lab <ArrowDownRight size={18} strokeWidth={1.8} aria-hidden="true" />
          </motion.a>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.25em] text-ink-muted">
        Explore below
      </div>
    </section>
  )
}
