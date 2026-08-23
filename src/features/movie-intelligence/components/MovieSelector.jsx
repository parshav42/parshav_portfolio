import { Pencil } from 'lucide-react'
import MoviePoster from './MoviePoster'

export default function MovieSelector({ movie, onChange }) {
  return (
    <section className="selected-movie" aria-labelledby="selected-movie-title">
      <MoviePoster movie={movie} size="selected" />
      <div className="min-w-0 flex-1"><p className="movie-section-label">Selected movie</p><h2 id="selected-movie-title">{movie.title}</h2><p>{movie.year} · {movie.genres.join(' · ')}</p></div>
      <button type="button" className="movie-secondary-button" onClick={onChange}><Pencil size={15} aria-hidden="true" /> Change Movie</button>
    </section>
  )
}
