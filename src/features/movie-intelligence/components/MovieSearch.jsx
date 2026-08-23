import { Search } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import MoviePoster from './MoviePoster'

export default function MovieSearch({ query, results, onQueryChange, onSelect }) {
  return (
    <div className="movie-search">
      <label className="sr-only" htmlFor="movie-search-input">Search for a movie you enjoy</label>
      <div className="movie-search-control">
        <Search size={19} aria-hidden="true" />
        <input id="movie-search-input" type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search for a movie you enjoy..." autoComplete="off" />
      </div>
      <AnimatePresence initial={false}>
        {query && (
          <motion.div className="movie-search-results" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            {results.length ? results.map((movie) => (
              <button type="button" className="movie-search-result" key={movie.id} onClick={() => onSelect(movie)}>
                <MoviePoster movie={movie} size="search" />
                <span><strong>{movie.title}</strong><small>{movie.year} · {movie.genres.join(' · ')}</small></span>
              </button>
            )) : <p className="movie-search-empty">No mock catalog matches yet. Try “Arrival” or “Interstellar”.</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
