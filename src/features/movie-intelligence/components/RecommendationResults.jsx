import { motion } from 'framer-motion'
import RecommendationCard from './RecommendationCard'

export default function RecommendationResults({ recommendations, onReset }) {
  return <section className="recommendation-results" aria-labelledby="recommendations-title"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="movie-section-label">Recommended for you</p><h2 id="recommendations-title">Similar movies to explore.</h2></div><button type="button" className="movie-secondary-button" onClick={onReset}>Try Another Movie</button></div><motion.div className="recommendation-grid" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>{recommendations.map((movie) => <motion.div key={movie.id} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}><RecommendationCard movie={movie} /></motion.div>)}</motion.div></section>
}
