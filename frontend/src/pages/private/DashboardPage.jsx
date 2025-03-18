import { Link } from 'react-router-dom'
import { useProject } from '../../context/ProjectContext'

export default function DashboardPage() {

  const { projects } = useProject()

  return (
    <>
      <div>Dashboard</div>
      <div>
        <button>+ New Project</button>
      </div>
      <div>
        <button>All projects</button>
        <button>Recent</button>
        <button>Starred</button>
      </div>
      <div>
        {projects.map((project) => (
          <div key={project.id}>
            <p>{project.name}</p>
            <p>Last update: {project.updatedAt}</p>
            <Link to={`/dashboard/projects/${project.id}`}>View</Link>
          </div>
        ))}
      </div>
    </>
  )
}
