import { useProject } from '../../context/ProjectContext'
import { Link } from 'react-router-dom'
import ProjectCard from '../../components/ProjectCard'
import '../../styles/DashboardPage.css'

export default function DashboardPage() {
  const { projects } = useProject()

  return (
    <div className='dashboard-page'>
      <h1 className='page-title'>Dashboard</h1>

      <div className='dashboard-actions'>
        <div className='tabs'>
          <button className='tab-button active'>All Projects</button>
          <button className='tab-button'>Recent</button>
          <button className='tab-button'>Starred</button>
        </div>
        <div className='actions-right'>
          <input
            type='text'
            className='search-input'
            placeholder='Search projects...'
          />
          <Link className='new-project-button' to={'/dashboard/create-project'}>+ New Project</Link>
        </div>
      </div>

      <div className='cards-container'>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
