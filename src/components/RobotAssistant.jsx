import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { Send, X } from 'lucide-react'
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

function AnimatedRobot({ isOpen, isHovered, shouldReduceMotion }) {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateY = useTransform(pointerX, [-1, 1], [-7, 7])
  const rotateX = useTransform(pointerY, [-1, 1], [7, -7])
  const pupilX = useTransform(pointerX, [-1, 1], [-3, 3])
  const pupilY = useTransform(pointerY, [-1, 1], [2, -2])

  useEffect(() => {
    if (shouldReduceMotion) return undefined
    const trackPointer = (event) => {
      pointerX.set(Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2)))
      pointerY.set(Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - 0.5) * 2)))
    }
    window.addEventListener('pointermove', trackPointer, { passive: true })
    return () => window.removeEventListener('pointermove', trackPointer)
  }, [pointerX, pointerY, shouldReduceMotion])

  return (
    <motion.div className="robot-character" style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 500 }} animate={shouldReduceMotion ? undefined : { y: isHovered || isOpen ? 0 : [0, -8, 0] }} transition={shouldReduceMotion ? undefined : { repeat: isHovered || isOpen ? 0 : Infinity, duration: 3, ease: 'easeInOut' }}>
      <motion.svg className="robot-svg" viewBox="0 0 120 150" role="img" aria-label="Parshav's Assistant">
        <defs>
          <linearGradient id="robot-blue-shell" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#7DD3FC" /><stop offset="0.5" stopColor="#38BDF8" /><stop offset="1" stopColor="#0284C7" /></linearGradient>
          <linearGradient id="robot-white-shell" x1="0" x2="0.8" y1="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#BAE6FD" /></linearGradient>
          <radialGradient id="robot-joint-glow" cx="35%" cy="25%"><stop offset="0" stopColor="#67E8F9" /><stop offset="1" stopColor="#0891B2" /></radialGradient>
          <filter id="robot-shadow" x="-30%" y="-20%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.25" /></filter>
          <filter id="robot-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>

        <motion.g className="robot-antenna" animate={shouldReduceMotion ? undefined : { rotate: [-4, 4, -4], y: [0, -2, 0] }} transition={shouldReduceMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} style={{ originX: '60px', originY: '31px' }}>
          <path d="M60 31V17" fill="none" stroke="#0F172A" strokeLinecap="round" strokeWidth="3" />
          <motion.circle cx="60" cy="11" r="6" fill="#06B6D4" stroke="#0F172A" strokeWidth="2" filter="url(#robot-glow)" animate={shouldReduceMotion ? undefined : { scale: [0.9, 1.12, 0.9], opacity: [0.7, 1, 0.7] }} transition={shouldReduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.g>

        <motion.g className="robot-head" filter="url(#robot-shadow)" animate={shouldReduceMotion ? undefined : { y: [0, -1, 0] }} transition={shouldReduceMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
          <path d="M24 50c0-14 10-24 24-24h24c14 0 24 10 24 24v28c0 12-9 21-21 21H45c-12 0-21-9-21-21V50Z" fill="url(#robot-blue-shell)" stroke="#0F172A" strokeWidth="3" />
          <path d="M32 53c0-8 7-14 15-14h26c8 0 15 6 15 14v20c0 7-6 12-13 12H45c-7 0-13-5-13-12V53Z" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
          <path d="M38 46c10-7 28-7 42 0" fill="none" stroke="#BAE6FD" strokeLinecap="round" strokeOpacity="0.7" strokeWidth="3" />
          <motion.g className="robot-eyes" animate={{ scaleY: isHovered || isOpen ? 1.15 : [1, 1, 0.1, 1, 1] }} transition={shouldReduceMotion || isHovered || isOpen ? { duration: 0.2 } : { duration: 4.4, repeat: Infinity, repeatDelay: 1.6, times: [0, 0.72, 0.77, 0.82, 1] }} style={{ originX: '60px', originY: '63px' }}>
            <motion.circle cx="48" cy="63" r="5" fill="#06B6D4" filter="url(#robot-glow)" style={{ x: pupilX, y: pupilY }} />
            <motion.circle cx="72" cy="63" r="5" fill="#06B6D4" filter="url(#robot-glow)" style={{ x: pupilX, y: pupilY }} />
          </motion.g>
          <path d="M53 76c5 4 9 4 14 0" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="2" />
        </motion.g>

        <motion.g className="robot-arm-left" animate={shouldReduceMotion ? undefined : { rotate: [-2, 2, -2] }} transition={shouldReduceMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} style={{ originX: '30px', originY: '104px' }}>
          <rect x="29" y="100" width="12" height="9" rx="4.5" fill="url(#robot-joint-glow)" stroke="#0F172A" strokeWidth="2" />
          <rect x="17" y="103" width="16" height="10" rx="5" fill="url(#robot-blue-shell)" stroke="#0F172A" strokeWidth="2" />
          <circle cx="15" cy="108" r="5" fill="#0F172A" />
          <rect x="7" y="104" width="11" height="9" rx="4.5" fill="url(#robot-white-shell)" stroke="#0F172A" strokeWidth="2" />
        </motion.g>
        <motion.g className="robot-arm-right" animate={shouldReduceMotion ? undefined : isHovered ? { rotate: [-18, 18, -18] } : { rotate: [-2, 2, -2] }} transition={shouldReduceMotion ? undefined : { duration: isHovered ? 0.55 : 3.5, repeat: Infinity, ease: 'easeInOut' }} style={{ originX: '90px', originY: '104px' }}>
          <rect x="79" y="100" width="12" height="9" rx="4.5" fill="url(#robot-joint-glow)" stroke="#0F172A" strokeWidth="2" />
          <rect x="87" y="103" width="16" height="10" rx="5" fill="url(#robot-blue-shell)" stroke="#0F172A" strokeWidth="2" />
          <circle cx="105" cy="108" r="5" fill="#0F172A" />
          <rect x="103" y="104" width="11" height="9" rx="4.5" fill="url(#robot-white-shell)" stroke="#0F172A" strokeWidth="2" />
        </motion.g>

        <motion.g className="robot-body" filter="url(#robot-shadow)" animate={shouldReduceMotion ? undefined : { y: [0, 1, 0] }} transition={shouldReduceMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
          <path d="M35 96h50c7 0 12 6 12 13v17c0 7-6 11-13 11H36c-7 0-13-4-13-11v-17c0-7 5-13 12-13Z" fill="url(#robot-white-shell)" stroke="#0F172A" strokeWidth="3" />
          <path d="M42 99h36v8H42z" fill="#0F172A" opacity="0.8" />
          <path d="M48 114h24" stroke="#0EA5E9" strokeLinecap="round" strokeWidth="3" />
          <circle cx="60" cy="124" r="4" fill="url(#robot-joint-glow)" stroke="#0F172A" strokeWidth="2" />
        </motion.g>

        <motion.g className="robot-leg-left" animate={shouldReduceMotion ? undefined : { rotate: [-1, 1, -1] }} transition={shouldReduceMotion ? undefined : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }} style={{ originX: '48px', originY: '133px' }}>
          <rect x="38" y="132" width="20" height="11" rx="5" fill="url(#robot-blue-shell)" stroke="#0F172A" strokeWidth="2" />
          <circle cx="48" cy="143" r="4" fill="#0F172A" />
          <rect x="35" y="141" width="26" height="9" rx="4.5" fill="url(#robot-white-shell)" stroke="#0F172A" strokeWidth="2" />
        </motion.g>
        <motion.g className="robot-leg-right" animate={shouldReduceMotion ? undefined : { rotate: [1, -1, 1] }} transition={shouldReduceMotion ? undefined : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }} style={{ originX: '72px', originY: '133px' }}>
          <rect x="62" y="132" width="20" height="11" rx="5" fill="url(#robot-blue-shell)" stroke="#0F172A" strokeWidth="2" />
          <circle cx="72" cy="143" r="4" fill="#0F172A" />
          <rect x="59" y="141" width="26" height="9" rx="4.5" fill="url(#robot-white-shell)" stroke="#0F172A" strokeWidth="2" />
        </motion.g>
      </motion.svg>
    </motion.div>
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
  const [isHovered, setIsHovered] = useState(false)
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94, y: -6 }}
      >
        <AnimatedRobot isOpen={isOpen} isHovered={isHovered} shouldReduceMotion={shouldReduceMotion} />
      </motion.button>
    </div>
  )
}
