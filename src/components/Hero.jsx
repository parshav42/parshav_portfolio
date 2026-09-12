import { ArrowDownRight, ArrowDownToLine } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import NeuralBackground from './NeuralBackground'
import { handleDownloadResume } from '../utils/emailActions'

const reveal = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="top" className="hero-shell" aria-labelledby="hero-name">
      <NeuralBackground />
      <div className="hero-portrait-neural-mask" aria-hidden="true" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col items-center justify-center px-4 pb-20 pt-28 text-center sm:px-10 sm:pt-32"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.13, delayChildren: 0.28 } } }}
      >
        <div className="flex flex-col items-center">
          <div className="hero-portrait-wrap h-40 w-40 md:h-64 md:w-64 lg:h-80 lg:w-80">
            <motion.svg
              className="hero-portrait-orbit"
              viewBox="0 0 100 100"
              aria-hidden="true"
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 7" />
            </motion.svg>
            <img src="/parshavpic.jpg" alt="Parshav S. Khoche" className="hero-portrait" />
          </div>
          <div className="mt-8 md:mt-10">
            <h1 id="hero-name" className="text-3xl font-bold tracking-[-0.045em] text-stone-900 sm:text-4xl md:text-5xl">Parshav S. Khoche</h1>
            <p className="mt-2 text-base font-light text-stone-600 sm:text-lg">Machine Learning Engineer</p>
          </div>
        </div>
        <motion.p
          variants={reveal}
          transition={{ duration: 0.68 }}
          className="hero-tagline mt-8 max-w-xl px-2 text-base font-light leading-relaxed text-ink-soft sm:text-xl md:text-2xl"
        >
          I build intelligent systems that people can actually use.
        </motion.p>
        <motion.div variants={reveal} transition={{ duration: 0.6 }} className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row">
          <motion.a
            href="#ai-lab"
            className="cta-button"
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          >
            Explore My AI Lab <ArrowDownRight size={18} strokeWidth={1.8} aria-hidden="true" />
          </motion.a>
          <motion.button
            type="button"
            className="cta-button cta-button-secondary"
            onClick={handleDownloadResume}
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            Download Resume <ArrowDownToLine size={18} aria-hidden="true" />
          </motion.button>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.25em] text-ink-muted">
        Explore below
      </div>
    </section>
  )
}
