import { useEffect, useRef } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

const MOBILE_BREAKPOINT = 640
const LINK_DISTANCE = 132
const POINTER_RADIUS = 176

export default function NeuralBackground() {
  const canvasRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d')
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
      for (const node of nodes) {
        if (!shouldReduceMotion) {
          node.x += node.vx
          node.y += node.vy
          if (node.x < -10 || node.x > width + 10) node.vx *= -1
          if (node.y < -10 || node.y > height + 10) node.vy *= -1
        }
      }

      for (let index = 0; index < nodes.length; index += 1) {
        for (let peerIndex = index + 1; peerIndex < nodes.length; peerIndex += 1) {
          const node = nodes[index]
          const peer = nodes[peerIndex]
          const distance = Math.hypot(node.x - peer.x, node.y - peer.y)
          if (distance > LINK_DISTANCE) continue
          const pointerDistance = pointer.active ? Math.min(Math.hypot(node.x - pointer.x, node.y - pointer.y), Math.hypot(peer.x - pointer.x, peer.y - pointer.y)) : POINTER_RADIUS
          const response = Math.max(0, 1 - pointerDistance / POINTER_RADIUS)
          context.beginPath()
          context.moveTo(node.x, node.y)
          context.lineTo(peer.x, peer.y)
          context.strokeStyle = `rgba(249, 115, 22, ${0.055 + response * 0.2})`
          context.lineWidth = 0.45 + response * 0.45
          context.stroke()
        }
      }

      nodes.forEach((node) => {
        const distance = pointer.active ? Math.hypot(node.x - pointer.x, node.y - pointer.y) : POINTER_RADIUS
        const response = Math.max(0, 1 - distance / POINTER_RADIUS)
        context.beginPath()
        context.arc(node.x, node.y, node.radius + response * 0.8, 0, Math.PI * 2)
        context.fillStyle = `rgba(249, 115, 22, ${0.34 + response * 0.5})`
        context.fill()
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
