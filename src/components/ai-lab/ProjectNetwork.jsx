import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ProjectNode from './ProjectNode'

export default function ProjectNetwork({ projects, onSelectProject, onOpenEmbed }) {
  const networkRef = useRef(null)
  const nodeRefs = useRef([])
  const shouldReduceMotion = useReducedMotion()
  const [networkSize, setNetworkSize] = useState({ width: 0, height: 0 })
  const [connections, setConnections] = useState([])

  useEffect(() => {
    const updateConnections = () => {
      const networkBounds = networkRef.current?.getBoundingClientRect()
      if (!networkBounds) return
      setNetworkSize({ width: networkBounds.width, height: networkBounds.height })
      setConnections(nodeRefs.current.map((node) => {
        if (!node) return null
        const bounds = node.getBoundingClientRect()
        return {
          x: bounds.left - networkBounds.left + bounds.width / 2,
          y: bounds.top - networkBounds.top + bounds.height / 2,
        }
      }).filter(Boolean))
    }

    const frameId = window.requestAnimationFrame(updateConnections)
    const observer = new ResizeObserver(updateConnections)
    if (networkRef.current) observer.observe(networkRef.current)
    window.addEventListener('resize', updateConnections)
    return () => {
      window.cancelAnimationFrame(frameId)
      observer.disconnect()
      window.removeEventListener('resize', updateConnections)
    }
  }, [projects.length])

  return (
    <div ref={networkRef} className="project-network mt-14" aria-label="AI project network">
      {networkSize.width > 0 && (
        <svg className="project-network-lines" viewBox={`0 0 ${networkSize.width} ${networkSize.height}`} preserveAspectRatio="none" aria-hidden="true">
          {connections.slice(0, -1).map((connection, index) => {
            const nextConnection = connections[index + 1]
            return (
              <motion.line
                key={`${index}-${nextConnection.x}-${nextConnection.y}`}
                x1={connection.x}
                y1={connection.y}
                x2={nextConnection.x}
                y2={nextConnection.y}
                initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={shouldReduceMotion ? undefined : { duration: 1.1, delay: index * 0.14, ease: 'easeOut' }}
              />
            )
          })}
        </svg>
      )}
      <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
        {projects.map((project, index) => (
          <ProjectNode
            key={project.id}
            project={project}
            index={index}
            onSelect={onSelectProject}
            onOpenEmbed={onOpenEmbed}
            nodeRef={(node) => { nodeRefs.current[index] = node }}
          />
        ))}
      </div>
    </div>
  )
}
