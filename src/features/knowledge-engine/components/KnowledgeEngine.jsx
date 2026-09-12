import { ArrowLeft, ArrowRight, Database, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const knowledgeBase = [
  {
    keywords: ['retrieval', 'rag', 'grounded'],
    answer: 'Retrieval-augmented generation combines search with language generation. Relevant source passages are retrieved first, giving the model evidence to use when composing an answer.',
    sources: ['RAG system design notes', 'Grounded generation overview'],
  },
  {
    keywords: ['portfolio', 'project', 'ai lab'],
    answer: 'The AI Lab is a collection of applied AI experiments. Each system turns a machine-learning idea into a focused interaction that can be explored directly.',
    sources: ['AI Lab project index', 'Applied AI notes'],
  },
]

function findAnswer(query) {
  const normalizedQuery = query.toLowerCase()
  const match = knowledgeBase.find((entry) => entry.keywords.some((keyword) => normalizedQuery.includes(keyword)))

  return match ?? {
    answer: 'I could not find a grounded answer in the connected knowledge base. Try asking about retrieval, RAG, grounded generation, or the AI Lab.',
    sources: ['Knowledge base status'],
  }
}

export default function KnowledgeEngine({ onExit }) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  const askQuestion = (event) => {
    event.preventDefault()
    if (!query.trim()) return
    setResult(findAnswer(query.trim()))
  }

  return (
    <div className="movie-experience knowledge-experience">
      <header className="movie-header">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 sm:px-10">
          <button type="button" onClick={onExit} className="movie-back-button">
            <ArrowLeft size={17} aria-hidden="true" /> Back to AI Lab
          </button>
          <span className="movie-ready"><i aria-hidden="true" /> Knowledge Engine Ready</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-20 sm:px-10">
        <motion.section
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="movie-intro"
        >
          <p className="hero-eyebrow">Interactive retrieval demo</p>
          <h1>Knowledge Engine</h1>
          <p>Ask a question and receive an answer grounded in the connected knowledge base.</p>
        </motion.section>

        <section className="knowledge-workspace" aria-label="Knowledge Engine interaction">
          <div className="knowledge-status"><Database size={18} aria-hidden="true" /> Retrieval system online</div>
          <form className="knowledge-query" onSubmit={askQuestion}>
            <label htmlFor="knowledge-question">Ask the knowledge base</label>
            <div className="knowledge-query-row">
              <input
                id="knowledge-question"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="How does grounded generation work?"
              />
              <button type="submit" className="movie-primary-button" disabled={!query.trim()}>
                Retrieve answer <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          </form>

          {result && (
            <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="knowledge-result">
              <div className="knowledge-result-heading"><Sparkles size={18} aria-hidden="true" /><span>Grounded response</span></div>
              <p>{result.answer}</p>
              <div className="knowledge-sources">
                {result.sources.map((source) => <span key={source}>{source}</span>)}
              </div>
            </motion.article>
          )}
        </section>
      </main>
    </div>
  )
}
