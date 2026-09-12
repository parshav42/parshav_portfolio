import { ArrowUpRight, Check, Github, Linkedin, Mail, Code2 } from 'lucide-react'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

if (publicKey) {
  emailjs.init({ publicKey })
}

const getLocation = () => new Promise((resolve) => {
  if (!navigator.geolocation) {
    resolve('Location not shared')
    return
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => resolve(`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`),
    () => resolve('Location not shared'),
    { timeout: 5000, maximumAge: 300000 },
  )
})

export default function ContactPlaceholder() {
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState('')
  const shouldReduceMotion = useReducedMotion()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSending(true)
    setStatus('')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS is not configured')
      }

      const locationString = await getLocation()
      const templateParams = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        location: locationString,
      }
      console.log('Sending payload:', templateParams)
      await emailjs.send(serviceId, templateId, templateParams, { publicKey })

      form.reset()
      setStatus('Message Sent! I’ll get back to you soon.')
    } catch (error) {
      console.error('FAILED...', error)
      const exactError = error.text || error.message || 'Unknown error'
      setStatus(`Error: ${exactError}`)
    } finally {
      setIsSending(false)
    }
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
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field-group"><input id="contact-name" name="name" type="text" autoComplete="name" placeholder=" " required /><label htmlFor="contact-name">Name</label></div>
            <div className="field-group"><input id="contact-email" name="email" type="email" autoComplete="email" placeholder=" " required /><label htmlFor="contact-email">Email</label></div>
            <div className="field-group"><textarea id="contact-message" name="message" rows="8" placeholder=" " required /><label htmlFor="contact-message">Message</label></div>
            <button className="cta-button mt-5 w-full justify-center" type="submit" disabled={isSending} aria-disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Message'} <ArrowUpRight className="send-arrow" size={17} aria-hidden="true" />
            </button>
            {status && <p className={`form-status ${status.startsWith('Error:') ? 'form-status-error' : 'form-status-success'}`} role="status" aria-live="polite">{!status.startsWith('Error:') && <Check size={16} aria-hidden="true" />} {status}</p>}
          </form>
        </div>
      </motion.div>
    </section>
  )
}
