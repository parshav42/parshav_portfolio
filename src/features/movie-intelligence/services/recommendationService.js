import { movies } from '../data/movies'

const byId = new Map(movies.map((movie) => [movie.id, movie]))
const demoScores = [91, 87, 83]

export function searchMovies(query) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return []
  return movies.filter((movie) => `${movie.title} ${movie.genres.join(' ')}`.toLowerCase().includes(normalizedQuery)).slice(0, 5)
}

export function getMovieById(movieId) {
  return byId.get(movieId) ?? null
}

export function getRecommendations(movieId) {
  const selectedMovie = getMovieById(movieId)
  if (!selectedMovie) return Promise.resolve([])

  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(selectedMovie.recommendationIds.map((id, index) => {
        const movie = getMovieById(id)
        return { ...movie, demoSimilarityScore: demoScores[index], reasons: selectedMovie.reasons }
      }).filter(Boolean))
    }, 1800)
  })
}
