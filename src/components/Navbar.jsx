import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Wordmark from './Wordmark'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#ai-lab' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const shouldReduceMotion = useReducedMotion()
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const updateActiveSection = () => {
      const current = navItems.find(({ href }) => {
        const section = document.querySelector(href)
        return section && section.getBoundingClientRect().top <= 140 && section.getBoundingClientRect().bottom > 140
      })
      setActiveSection(current?.href ?? '')
    }
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    updateActiveSection()
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-stone-200/80 bg-white/70 px-4 py-2.5 shadow-nav backdrop-blur-md sm:px-5">
        <a href="#top" aria-label="Parshav home" onClick={closeMenu}>
          <Wordmark />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a className={`nav-link ${activeSection === item.href ? 'active' : ''}`} href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-ink transition hover:bg-saffron-soft hover:text-saffron md:hidden"
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={19} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-line bg-white/80 p-3 shadow-panel backdrop-blur-md md:hidden"
          >
            {navItems.map((item) => (
              <a className="mobile-nav-link" href={item.href} key={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
