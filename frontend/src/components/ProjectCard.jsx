import { Link } from 'react-router-dom'
import '../styles/ProjectCard.css'

export default function ProjectCard ({ project }) {
  return (
    <div className='project-card'>
      <h2>{project.name}</h2>
      <p className='info'>Last update: {project.updatedAt}</p>
      <Link className='view-link' to={`/dashboard/projects/${project.id}`}>
        View
      </Link>
    </div>
  )
}
