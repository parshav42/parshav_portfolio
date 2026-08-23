export default function MoviePoster({ movie, size = 'default' }) {
  return (
    <div className={`movie-poster movie-poster-${movie.poster.hue} movie-poster-${size}`} aria-label={`${movie.title} abstract poster`} role="img">
      <span className="movie-poster-mark" aria-hidden="true">{movie.poster.mark}</span>
      <span className="movie-poster-title">{movie.title}</span>
      <span className="movie-poster-year">{movie.year}</span>
    </div>
  )
}
