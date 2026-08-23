import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import AIAnalysis from './components/AIAnalysis'
import MovieSearch from './components/MovieSearch'
import MovieSelector from './components/MovieSelector'
import RecommendationResults from './components/RecommendationResults'
import { getRecommendations, searchMovies } from './services/recommendationService'

export default function MovieIntelligence({ onExit }) {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [status, setStatus] = useState('idle')
  const [activeStep, setActiveStep] = useState(0)
  const [recommendations, setRecommendations] = useState([])
  const timeoutsRef = useRef([])
  const requestIdRef = useRef(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const handler = setTimeout(async () => {
      const results = await searchMovies(query)
      setSearchResults(results)
    }, 300)

    return () => clearTimeout(handler)
  }, [query])

  const clearTimers = () => { timeoutsRef.current.forEach(window.clearTimeout); timeoutsRef.current = [] }
  useEffect(() => () => { requestIdRef.current += 1; clearTimers() }, [])
  const selectMovie = (movie) => { requestIdRef.current += 1; clearTimers(); setSelectedMovie(movie); setQuery(''); setRecommendations([]); setStatus('selected') }
  const reset = () => { requestIdRef.current += 1; clearTimers(); setQuery(''); setSelectedMovie(null); setRecommendations([]); setActiveStep(0); setStatus('idle') }
  const analyze = async () => {
    if (!selectedMovie || status === 'analyzing') return
    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId
    setStatus('analyzing'); setActiveStep(0)
    timeoutsRef.current = [1, 2, 3].map((step) => window.setTimeout(() => setActiveStep(step), step * 390))
    const result = await getRecommendations(selectedMovie.id)
    if (requestId !== requestIdRef.current) return
    setRecommendations(result); setStatus('results'); timeoutsRef.current = []
  }

  return <div className="movie-experience"><header className="movie-header"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 sm:px-10"><button type="button" onClick={onExit} className="movie-back-button"><ArrowLeft size={17} aria-hidden="true" /> Back to AI Lab</button><span className="movie-ready"><i aria-hidden="true" /> Recommendation Engine Ready</span></div></header><main className="mx-auto max-w-6xl px-6 pb-20 pt-20 sm:px-10"><motion.section initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="movie-intro"><p className="hero-eyebrow">Interactive recommendation demo</p><h1>Movie Intelligence</h1><p>Discover what to watch through intelligent recommendations.</p></motion.section><section className="movie-workspace"><MovieSearch query={query} results={searchResults} onQueryChange={(value) => { setQuery(value); if (!selectedMovie) setStatus(value ? 'searching' : 'idle') }} onSelect={selectMovie} />{selectedMovie && <MovieSelector movie={selectedMovie} onChange={reset} />}{status === 'analyzing' && <AIAnalysis activeStep={activeStep} />}{selectedMovie && status !== 'analyzing' && status !== 'results' && <button type="button" className="movie-primary-button" onClick={analyze}>Find Similar Movies <ArrowRight size={17} aria-hidden="true" /></button>}{status === 'results' && <RecommendationResults recommendations={recommendations} onReset={reset} />}</section><section className="movie-engineering"><div><p className="movie-section-label">The problem</p><h2>Large catalogs make discovery difficult.</h2><p>When choice is endless, finding a movie that feels relevant can take longer than watching it.</p></div><div><p className="movie-section-label">The approach</p><ol className="movie-pipeline">{['Movie Data', 'Feature Representation', 'Similarity Analysis', 'Recommendation Ranking', 'Suggested Movies'].map((step, index) => <li key={step}><span>{step}</span>{index < 4 && <i aria-hidden="true" />}</li>)}</ol></div><div className="movie-demo-note"><Sparkles size={18} aria-hidden="true" /><p><strong>Current demo</strong> This interactive portfolio demo currently uses a mock recommendation layer. The interface is designed to connect to a real recommendation API in the next development phase.</p></div></section></main></div>
}
