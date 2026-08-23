import { useEffect, useRef } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

const MOBILE_BREAKPOINT = 640
const LINK_DISTANCE = 150
const POINTER_RADIUS = 280
const POINTER_STRONG_RADIUS = 180

// Saffron particle/connection tones, sourced from the theme in src/index.css.
const NODE_RGB_FALLBACK = '234, 88, 12'
const LINK_RGB_FALLBACK = '194, 65, 12'
const GLOW_RGB = '249, 115, 22'

const readThemeRgb = (name, fallback) => {
  if (typeof window === 'undefined') return fallback
  const value = window.getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

export default function NeuralBackground() {
  const canvasRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d')
    const nodeRgb = readThemeRgb('--neural-node-rgb', NODE_RGB_FALLBACK)
    const linkRgb = readThemeRgb('--neural-link-rgb', LINK_RGB_FALLBACK)
    let frameId
    let isVisible = true
    let isDocumentVisible = !document.hidden
    let width = 0
    let height = 0
    let nodes = []
    const pointer = { x: -999, y: -999, active: false }

    const makeNodes = () => {
      const count = window.innerWidth < MOBILE_BREAKPOINT ? 26 : 52
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.11,
        vy: (Math.random() - 0.5) * 0.11,
        radius: 0.7 + Math.random() * 0.85,
      }))
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      makeNodes()
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      
      // Update node positions and handle pointer attraction
      for (const node of nodes) {
        if (!shouldReduceMotion) {
          node.x += node.vx
          node.y += node.vy
          
          if (pointer.active) {
            const dx = pointer.x - node.x
            const dy = pointer.y - node.y
            const distance = Math.hypot(dx, dy)
            if (distance < POINTER_RADIUS) {
              const attraction = (1 - distance / POINTER_RADIUS) * 0.5
              const pull = attraction * 0.15
              node.x += (dx / Math.max(1, distance)) * pull
              node.y += (dy / Math.max(1, distance)) * pull
            }
          }

          if (node.x < -10 || node.x > width + 10) node.vx *= -1
          if (node.y < -10 || node.y > height + 10) node.vy *= -1
        }
      }

      // Draw connection lines
      for (let index = 0; index < nodes.length; index += 1) {
        for (let peerIndex = index + 1; peerIndex < nodes.length; peerIndex += 1) {
          const node = nodes[index]
          const peer = nodes[peerIndex]
          const distance = Math.hypot(node.x - peer.x, node.y - peer.y)
          if (distance > LINK_DISTANCE) continue
          
          let response = 0
          if (pointer.active) {
            const d1 = Math.hypot(node.x - pointer.x, node.y - pointer.y)
            const d2 = Math.hypot(peer.x - pointer.x, peer.y - pointer.y)
            const pointerDistance = Math.min(d1, d2)
            
            if (pointerDistance < POINTER_RADIUS) {
              const baseResponse = 1 - pointerDistance / POINTER_RADIUS
              const strongResponse = pointerDistance < POINTER_STRONG_RADIUS 
                ? (1 - pointerDistance / POINTER_STRONG_RADIUS) 
                : 0
              response = baseResponse * 0.4 + strongResponse * 0.6
            }
          }

          context.beginPath()
          context.moveTo(node.x, node.y)
          context.lineTo(peer.x, peer.y)
          
          // Connection line color: idle rgba(194, 65, 12, 0.18), active 0.65
          const alpha = 0.18 + response * 0.47
          context.strokeStyle = `rgba(${linkRgb}, ${alpha})`
          
          // Line thickness: normal ~1px, active up to 2px
          context.lineWidth = 0.8 + response * 1.2
          context.stroke()

          // Add subtle glow for strongly active connections
          if (response > 0.5) {
            context.strokeStyle = `rgba(${GLOW_RGB}, ${response * 0.25})`
            context.lineWidth = 2.0 + response * 1.0
            context.stroke()
          }
        }
      }

      // Draw particles
      nodes.forEach((node) => {
        let response = 0
        if (pointer.active) {
          const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y)
          if (distance < POINTER_RADIUS) {
            const baseResponse = 1 - distance / POINTER_RADIUS
            const strongResponse = distance < POINTER_STRONG_RADIUS 
              ? (1 - distance / POINTER_STRONG_RADIUS) 
              : 0
            response = baseResponse * 0.3 + strongResponse * 0.7
          }
        }

        context.beginPath()
        context.arc(node.x, node.y, node.radius + response * 1.0, 0, Math.PI * 2)
        
        // Particle color: idle rgba(234, 88, 12, 0.55), active 0.95
        context.fillStyle = `rgba(${nodeRgb}, ${0.55 + response * 0.4})`
        context.fill()
        
        // Soft glow for active particles
        if (response > 0.3) {
          context.shadowBlur = 8 * response
          context.shadowColor = `rgba(${GLOW_RGB}, ${0.4 * response})`
          context.fill()
          context.shadowBlur = 0 // Reset for other draws
        }
      })
    }

    const tick = () => {
      if (isVisible && isDocumentVisible) {
        draw()
        if (!shouldReduceMotion) frameId = requestAnimationFrame(tick)
      }
    }

    const refresh = () => {
      cancelAnimationFrame(frameId)
      tick()
    }
    const onPointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.active = true
    }
    const onPointerLeave = () => { pointer.active = false }
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) refresh()
    }, { threshold: 0.01 })
    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden
      if (isDocumentVisible) refresh()
    }

    resize()
    draw()
    if (!shouldReduceMotion) tick()
    observer.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [shouldReduceMotion])

  return <canvas ref={canvasRef} className="neural-background" aria-hidden="true" />
}
