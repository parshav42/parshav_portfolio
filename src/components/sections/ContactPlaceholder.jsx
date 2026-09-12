import { ArrowDownToLine, ArrowUpRight, Github, Linkedin, Mail, Code2 } from 'lucide-react'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { handleDownloadResume } from '../../utils/emailActions'

export default function ContactPlaceholder() {
  const [isSent, setIsSent] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSent(true)
  }

  return (
    <section id="contact" className="portfolio-section contact-section" aria-labelledby="contact-title">
      <motion.div
        className="mx-auto max-w-6xl px-6 sm:px-10"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <p className="hero-eyebrow">Contact</p>
        <div className="contact-layout mt-5">
          <div>
            <h2 id="contact-title" className="section-title">Let's start a useful conversation.</h2>
            <p className="section-lede mt-5">Have a thoughtful ML problem, a product idea, or an opportunity to build something useful? Send a note and I will get back to you.</p>
            <div className="contact-links mt-8">
              <a href="mailto:parshavkhoche16@gmail.com"><Mail size={17} aria-hidden="true" /> parshavkhoche16@gmail.com</a>
              <a href="https://github.com/parshav42" rel="noreferrer" target="_blank"><Github size={17} aria-hidden="true" /> GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
              <a href="https://www.linkedin.com/in/parshav-khoche/" rel="noreferrer" target="_blank"><Linkedin size={17} aria-hidden="true" /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>
              <a href="https://leetcode.com/u/Parshavkhoche/" rel="noreferrer" target="_blank"><Code2 size={17} aria-hidden="true" /> LeetCode <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
            <button className="cta-button mt-8" type="button" onClick={handleDownloadResume}>
              Download Resume <ArrowDownToLine size={17} aria-hidden="true" />
            </button>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" required />
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required />
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="5" required />
            <button className="cta-button mt-5 w-full justify-center" type="submit">{isSent ? 'Message Ready to Send' : 'Send Message'} <ArrowUpRight size={17} aria-hidden="true" /></button>
            {isSent && <p className="form-status" role="status">Message noted! Please email me directly at parshavkhoche16@gmail.com for a faster response.</p>}
          </form>
        </div>
      </motion.div>
    </section>
  )
}
