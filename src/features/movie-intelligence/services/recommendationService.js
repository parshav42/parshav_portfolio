import { movies } from '../data/movies'

const API_URL = import.meta.env.VITE_MOVIE_API_URL

const searchLocalMovies = (query) => {
  const normalizedQuery = query.toLowerCase()
  return movies.filter((movie) => movie.title.toLowerCase().includes(normalizedQuery) || movie.genres.some((genre) => genre.toLowerCase().includes(normalizedQuery)))
}

const getLocalRecommendations = (movieId) => {
  const selectedMovie = movies.find((movie) => movie.id === movieId)
  if (!selectedMovie) return []
  return selectedMovie.recommendationIds.map((id) => movies.find((movie) => movie.id === id)).filter(Boolean).map((movie) => ({
    ...movie,
    demoSimilarityScore: 85,
    reasons: movie.reasons ?? ['Content similarity match', 'Overlapping genres', 'Semantic context relevance'],
  }))
}

export async function searchMovies(query) {
  const normalizedQuery = query.trim()
  if (!normalizedQuery) return []
  
  if (!API_URL) return searchLocalMovies(normalizedQuery)
  try {
    const response = await fetch(`${API_URL}/api/movies/search?q=${encodeURIComponent(normalizedQuery)}`)
    if (!response.ok) throw new Error('Search failed')
    return await response.json()
  } catch (error) {
    console.warn('Movie API unavailable; using local dataset.', error)
    return searchLocalMovies(normalizedQuery)
  }
}

export async function getRecommendations(movieId) {
  if (!API_URL) return getLocalRecommendations(movieId)
  try {
    const response = await fetch(`${API_URL}/api/movies/${movieId}/recommendations`)
    if (!response.ok) throw new Error('Recommendations failed')
    const data = await response.json()
    
    // The API returns { selected_movie, recommendations }
    // We map it to include the similarity score in a format the UI expects
    return data.recommendations.map((rec) => ({
      ...rec,
      demoSimilarityScore: Math.round(rec.similarity_score * 100),
      reasons: [
        'Content similarity match',
        'Overlapping genres',
        'Semantic context relevance'
      ]
    }))
  } catch (error) {
    console.warn('Movie API unavailable; using local dataset.', error)
    return getLocalRecommendations(movieId)
  }
}
