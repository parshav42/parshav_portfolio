import { ArrowDownToLine, BadgeCheck } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { handleDownloadResume } from '../../utils/emailActions'

export default function AboutPlaceholder() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="about" className="portfolio-section" aria-labelledby="about-title">
      <motion.div
        className="mx-auto max-w-6xl px-6 sm:px-10"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
      >
        <p className="hero-eyebrow">About Parshav</p>
        <div className="about-layout mt-5">
          <div>
            <h2 id="about-title" className="section-title">Building AI with product intent.</h2>
            <p className="section-lede mt-5">I am a Machine Learning Engineer with hands-on experience across the full ML lifecycle: data preprocessing, feature engineering, model training, and deployment using Python, PyTorch, and Scikit-learn.</p>
            <button className="cta-button mt-8" type="button" onClick={handleDownloadResume}>
              Download Resume <ArrowDownToLine size={17} aria-hidden="true" />
            </button>
          </div>
          <div className="about-panel">
            <div className="about-role-card">
              <p>ML Engineer</p>
              <span>Focus: Computer Vision, Machine Learning, AI Systems</span>
            </div>
            <p>I contributed to Ayushman Cowfit Pro, a live production application on the Google Play Store. I have built end-to-end projects including a computer vision crop disease detection system with 85% accuracy on 10,000+ images and a customer churn prediction model.</p>
            <div className="about-credential mt-7">
              <BadgeCheck size={22} aria-hidden="true" />
              <span>B.Tech in Computer Science <strong>CGPA 9.2/10</strong></span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
