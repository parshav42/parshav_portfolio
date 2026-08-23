import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import MoviePoster from './MoviePoster'

export default function RecommendationCard({ movie }) {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <article className="recommendation-card">
      <MoviePoster movie={movie} />
      <div className="recommendation-card-body"><p className="movie-section-label">{movie.year} · {movie.genres.join(' · ')}</p><h3>{movie.title}</h3><p className="recommendation-score"><strong>{movie.demoSimilarityScore}%</strong> Demo similarity score</p><button type="button" className="recommendation-why" aria-expanded={isExpanded} onClick={() => setIsExpanded((expanded) => !expanded)}>Why recommended? <ChevronDown className={isExpanded ? 'rotate-180' : ''} size={16} aria-hidden="true" /></button><AnimatePresence initial={false}>{isExpanded && <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="recommendation-reasons">{movie.reasons.map((reason) => <li key={reason}>{reason}</li>)}</motion.ul>}</AnimatePresence></div>
    </article>
  )
}
