import ProjectNode from './ProjectNode'

export default function ProjectNetwork({ projects, onSelectProject }) {
  return (
    <div className="project-network mt-14" aria-label="AI project network">
      <div className="network-connection network-connection-one" aria-hidden="true" />
      <div className="network-connection network-connection-two" aria-hidden="true" />
      <div className="grid gap-4 md:grid-cols-3 md:gap-7">
        {projects.map((project, index) => (
          <ProjectNode key={project.id} project={project} index={index} onSelect={onSelectProject} />
        ))}
      </div>
    </div>
  )
}
