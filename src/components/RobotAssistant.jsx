import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'
import TicTacToe from './TicTacToe'

const responses = {
  summary: 'Parshav is an ML Engineer with hands-on experience across the full ML lifecycle and contributed to Ayushman Cowfit Pro, live on the Google Play Store. His CGPA is 9.2/10.',
  resume: 'Parshav is an ML Engineer with hands-on experience across the full ML lifecycle and contributed to Ayushman Cowfit Pro, live on the Google Play Store. His CGPA is 9.2/10.',
  email: <>You can email Parshav at <a href="mailto:parshavkhoche16@gmail.com">parshavkhoche16@gmail.com</a></>,
  linkedin: 'Connect with Parshav on LinkedIn: https://www.linkedin.com/in/parshav-khoche/',
  leetcode: <>Check out Parshav's LeetCode profile: <a href="https://leetcode.com/u/Parshavkhoche/" target="_blank" rel="noreferrer">leetcode.com/u/Parshavkhoche/</a></>,
  skills: 'Parshav works with Python, PyTorch, Scikit-learn, FastAPI, Docker, and Streamlit.',
  experience: 'Parshav was an ML Engineer Intern at A3 Services, Pune from Aug 2025 to Jul 2026. He built Python/Pandas data pipelines, trained and evaluated ML models, and owned the end-to-end ML lifecycle.',
  projects: 'Parshav built a Sugarcane Disease Detection computer vision classifier using PyTorch and Scikit-learn, reaching 85% accuracy on 10,000+ images. He also built a Scikit-learn Customer Churn Predictor on 2,000+ records and deployed it as a Streamlit app.',
  sugarcane: 'The Sugarcane Disease Detection System is a PyTorch and Scikit-learn computer vision classifier with 85% accuracy on 10,000+ images. It is deployed on Render with an HTML/CSS/JS frontend.',
  churn: 'The Customer Churn Predictor uses a Scikit-learn model trained on 2,000+ records and is deployed as a Streamlit app.',
  education: 'Parshav holds a B.Tech in Computer Science from D.Y. Patil Agriculture and Technical University, completed in 2026, with a CGPA of 9.2/10.',
  certifications: 'Parshav completed the OpenCV Bootcamp from OpenCV University, plus the AI Program and Applied Data Science program from SmartInternz.',
  achievements: 'Parshav has built 30+ personal ML models and led a college project team from concept to completion.',
  background: 'Parshav is an ML Engineer with experience in production applications, computer vision, predictive modeling, and the full ML lifecycle.',
  tools: 'Parshav works with Python, C++, PyTorch, Scikit-learn, CNNs, Transfer Learning, YOLO, NumPy, Pandas, Matplotlib, Seaborn, FastAPI, Docker, Streamlit, AWS, Linux, and Git.',
  github: 'Parshav\'s GitHub profile is available at https://github.com/parshav42.',
}

const defaultResponse = "I don't have that specific detail, but you can reach Parshav directly at parshavkhoche16@gmail.com or connect on LinkedIn (https://www.linkedin.com/in/parshav-khoche/)."
const linkedinUrl = 'https://www.linkedin.com/in/parshav-khoche/'

// REPLACE THIS WITH THE ACTUAL LINKEDIN PROFILE PHOTO URL
const linkedinPhotoUrl = '/parshav-linkedin.jpg'

const getResponse = (message) => {
  const normalizedMessage = message.toLowerCase()
  if (['hi', 'hello', 'hey', 'greetings'].some((greeting) => normalizedMessage === greeting || normalizedMessage.startsWith(`${greeting} `))) {
    return "Hey there! 👋 I'm Parshav's assistant. I can tell you about his skills, projects, experience, or contact info. What would you like to know?"
  }
  const keywordAliases = [
    ['email', 'email'], ['mail', 'email'], ['linkedin', 'linkedin'], ['leetcode', 'leetcode'],
    ['skill', 'skills'], ['technology', 'tools'], ['tech stack', 'tools'], ['tools', 'tools'],
    ['experience', 'experience'], ['intern', 'experience'], ['education', 'education'], ['degree', 'education'],
    ['project', 'projects'], ['sugarcane', 'sugarcane'], ['churn', 'churn'],
    ['certification', 'certifications'], ['bootcamp', 'certifications'], ['achievement', 'achievements'],
    ['summary', 'summary'], ['background', 'background'], ['ayushman', 'experience'], ['github', 'github'],
  ]
  const matchedKey = keywordAliases.find(([alias]) => normalizedMessage.includes(alias))?.[1]
  return matchedKey ? responses[matchedKey] : defaultResponse
}

const isGameRequest = (message) => {
  const normalizedMessage = message.toLowerCase()
  return normalizedMessage.includes('play game') || normalizedMessage.includes('tic tac toe') || normalizedMessage.includes('game')
}

function LinkedInCard() {
  return (
    <a className="linkedin-card" href={linkedinUrl} target="_blank" rel="noopener noreferrer">
      <img
        src={linkedinPhotoUrl}
        alt="Parshav Khoche LinkedIn Profile"
        className="w-12 h-12 rounded-full object-cover"
        onError={(event) => { event.currentTarget.src = 'https://ui-avatars.com/api/?name=Parshav+Khoche&background=F97316&color=fff' }}
      />
      <span>
        <strong>Connect with Parshav on LinkedIn</strong>
        <small>Click to view profile and message</small>
      </span>
    </a>
  )
}

export default function RobotAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', content: 'Hi. Ask me about Parshav\'s work, skills, or contact details.' },
  ])
  const inputRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    setIsTooltipVisible(false)
    if (isOpen) return undefined

    let hideTimeout
    const showTooltip = () => {
      setIsTooltipVisible(true)
      hideTimeout = window.setTimeout(() => setIsTooltipVisible(false), 5000)
    }
    const showTimeout = window.setTimeout(showTooltip, 15000)
    const interval = window.setInterval(showTooltip, 15000)
    return () => {
      window.clearTimeout(showTimeout)
      window.clearTimeout(hideTimeout)
      window.clearInterval(interval)
    }
  }, [isOpen])

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedMessage = message.trim()
    if (!trimmedMessage) return
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `${Date.now()}-user`, role: 'user', content: trimmedMessage },
      isGameRequest(trimmedMessage)
        ? { id: `${Date.now()}-bot`, role: 'bot', type: 'game', content: "Sure! Let's play Tic-Tac-Toe. You are X, I am O." }
        : { id: `${Date.now()}-bot`, role: 'bot', content: getResponse(trimmedMessage) },
    ])
    setMessage('')
  }

  return (
    <div className="robot-assistant">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="robot-chat-window"
            role="dialog"
            aria-modal="false"
            aria-labelledby="robot-chat-title"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <header className="robot-chat-header">
              <div>
                <h2 id="robot-chat-title">Parshav's Assistant</h2>
              </div>
              <button type="button" className="preview-close" onClick={() => setIsOpen(false)} aria-label="Close assistant">
                <X size={18} aria-hidden="true" />
              </button>
            </header>
            <div className="robot-messages" aria-live="polite">
              {messages.map(({ id, role, type, content }) => (
                <div key={id} className={`robot-message robot-message-${role}`}>
                  {type === 'game' ? <><p>{content}</p><TicTacToe /></> : role === 'bot' && typeof content === 'string' && content.includes(linkedinUrl) ? <LinkedInCard /> : content}
                </div>
              ))}
            </div>
            <form className="robot-input-row" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="assistant-message">Ask Parshav's Assistant</label>
              <input ref={inputRef} id="assistant-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask about Parshav..." />
              <button type="submit" aria-label="Send message"><Send size={17} aria-hidden="true" /></button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isOpen && isTooltipVisible && (
          <motion.div
            className="robot-tooltip"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 8, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, x: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            Ask me about Parshav! Click here.
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        className="robot-trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close assistant' : "Open Parshav's Assistant"}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94, y: -6 }}
      >
        <span className="robot-character" aria-hidden="true">
          <MessageCircle size={27} strokeWidth={1.8} />
          <Sparkles className="absolute -right-2 -top-2 h-3.5 w-3.5" strokeWidth={2} />
        </span>
      </motion.button>
    </div>
  )
}
