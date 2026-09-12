import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function JourneyPlaceholder({ onOpenEmbed }) {
  const shouldReduceMotion = useReducedMotion()
  const milestones = [
    ['2026', 'Machine Learning Engineer Intern', 'A3 Services, Pune', 'Contributed to Ayushman Cowfit Pro, built data pipelines in Python/Pandas, and trained ML models.', ['Built data preprocessing and feature engineering pipelines in Python and Pandas.', 'Trained and evaluated ML models.', 'Contributed to Ayushman Cowfit Pro, live on the Google Play Store.']],
    ['2026', 'OpenCV Bootcamp and AI/Data Science Programs', 'OpenCV University · SmartInternz', 'Expanded practical computer vision and applied data science foundations.', ['Covered OpenCV fundamentals, image processing, object detection, and video analysis.', 'Explored real-time vision systems.', 'Practiced data preprocessing, visualization, and predictive modeling in Python.']],
    ['2026', 'Sugarcane Disease Detection and Customer Churn Predictor', 'Selected projects', 'Built a computer vision classifier reaching 85% accuracy and a customer churn prediction model.', ['Built a computer vision classifier achieving 85% accuracy on 10,000+ images.', 'Built a Scikit-learn classification model for churn prediction.', 'Deployed the churn predictor as a Streamlit app.']],
    ['2026', 'B.Tech in Computer Science', 'D.Y. Patil Agriculture and Technical University', 'Graduated with a CGPA of 9.2/10.', ['Built a foundation in Computer Science, Machine Learning, and Artificial Intelligence.', 'CGPA: 9.2/10.']],
  ]
  const [expandedIndex, setExpandedIndex] = useState(null)

  return (
    <section id="journey" className="portfolio-section" aria-labelledby="journey-title">
      <motion.div
        className="mx-auto max-w-6xl px-6 sm:px-10"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <p className="hero-eyebrow">Engineering journey</p>
        <h2 id="journey-title" className="section-title mt-4">The thinking behind the systems.</h2>
        <div className="journey-timeline mt-12">
          {milestones.map(([year, title, place, description, details], index) => (
            <motion.article
              className="journey-item"
              key={`${year}-${title}`}
              initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : index * 0.08 }}
            >
              <span className="journey-year">{year}</span>
              <div className="journey-dot" aria-hidden="true" />
              <motion.div
                layout
                className="journey-card"
                tabIndex="0"
                role="button"
                aria-expanded={expandedIndex === index}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                }}
              >
                <h3>{title}</h3>
                <p className="journey-place">{place}</p>
                <p className="journey-description">{description}</p>
                {index === 0 && (
                  <div className="journey-projects" onClick={(event) => event.stopPropagation()}>
                    <p className="journey-projects-label">Personal Projects</p>
                    <button type="button" className="journey-project-button" onClick={() => onOpenEmbed?.({
                      id: 'sugarcane-disease-detection',
                      number: '03',
                      name: 'Sugarcane Disease Detection System',
                      embedUrl: 'https://sugarcane-disease-detection-system-1.onrender.com/',
                    })}>
                      Sugarcane Disease Detection System
                    </button>
                  </div>
                )}
                <AnimatePresence initial={false}>
                  {expandedIndex === index && (
                    <motion.ul
                      className="journey-details"
                      initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {details.map((detail) => <li key={detail}>{detail}</li>)}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
