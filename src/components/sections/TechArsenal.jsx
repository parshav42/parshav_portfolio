import { Brain, Code2, Container, Crosshair, Database, Flame, Gauge, Layers3, Server, Target } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const technologies = [
  ['Python', Code2], ['PyTorch', Flame], ['Scikit-learn', Gauge], ['OpenCV', Crosshair],
  ['Pandas', Database], ['NumPy', Layers3], ['FastAPI', Server], ['Docker', Container], ['React', Code2],
]

const metrics = [
  ['images', Brain, 10000], ['best model accuracy', Target, 85], ['models built', Brain, 30],
]

function MetricCounter({ value, shouldReduceMotion }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.7 })
  const [count, setCount] = useState(shouldReduceMotion ? value : 0)

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return undefined
    const startedAt = performance.now()
    const duration = 1200
    let frameId
    const tick = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration)
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, shouldReduceMotion, value])

  const formattedValue = value === 10000 ? `${count.toLocaleString()}+` : value === 85 ? `${count}%` : `${count}+`
  return <span ref={ref}>{formattedValue}</span>
}

export default function TechArsenal() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="tech-arsenal-section" aria-labelledby="tech-arsenal-title">
      <motion.div
        className="mx-auto max-w-6xl px-6 sm:px-10"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        <div className="tech-arsenal-heading">
          <div>
            <p className="hero-eyebrow">Tech arsenal & impact</p>
            <h2 id="tech-arsenal-title" className="section-title mt-4">Tools for turning intelligence into outcomes.</h2>
          </div>
          <p className="section-lede">A practical toolkit spanning model development, product interfaces, and dependable deployment.</p>
        </div>
        <div className="tech-arsenal-grid mt-10">
          {technologies.map(([name, Icon]) => (
            <motion.div key={name} className="tech-arsenal-item" whileHover={shouldReduceMotion ? undefined : { y: -2 }}>
              <Icon size={17} aria-hidden="true" />
              <span>{name}</span>
            </motion.div>
          ))}
        </div>
        <div className="impact-metrics mt-12">
          {metrics.map(([label, Icon, value]) => (
            <div className="impact-metric" key={label}>
              <strong><MetricCounter value={value} shouldReduceMotion={shouldReduceMotion} /></strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
