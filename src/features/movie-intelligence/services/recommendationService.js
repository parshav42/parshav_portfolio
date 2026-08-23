const API_URL = import.meta.env.VITE_MOVIE_API_URL || 'http://localhost:8000';

export async function searchMovies(query) {
  const normalizedQuery = query.trim()
  if (!normalizedQuery) return []
  
  try {
    const response = await fetch(`${API_URL}/api/movies/search?q=${encodeURIComponent(normalizedQuery)}`)
    if (!response.ok) throw new Error('Search failed')
    return await response.json()
  } catch (error) {
    console.error('Error searching movies:', error)
    return []
  }
}

export async function getRecommendations(movieId) {
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
    console.error('Error getting recommendations:', error)
    return []
  }
}
