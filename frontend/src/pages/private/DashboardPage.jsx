import { useEffect, useState } from 'react'
import { useProject } from '../../context/ProjectContext'
import { Link } from 'react-router-dom'
import ProjectCard from '../../components/ProjectCard'
import '../../styles/DashboardPage.css'

export default function DashboardPage() {
  const { fetchProjects } = useProject()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    (async function () {
      const data = await fetchProjects()
      setProjects(data)
    })()
  }, [])


  return (
    <div className='dashboard-page'>
      <h1 className='page-title'>Dashboard</h1>
      <p className='page-description'>Tus proyectos</p>

      <div className='dashboard-actions'>
        <div className='tabs'>
          <button className='tab-button active'>Todos</button>
          <button className='tab-button'>Recientes</button>
          <button className='tab-button'>Fijados</button>
        </div>
        <div className='actions-right'>
          <input
            type='text'
            className='search-input'
            placeholder='Buscar proyectos...'
          />
          <Link className='new-project-button' to={'/dashboard/create-project'}>+ Crear proyecto</Link>
        </div>
      </div>

      {
        projects.length == 0 ? (
          <div className='projects-not-found'>
            <p>No se encontraron proyectos.</p>
          </div>
        ) : (
          <div className='cards-container'>
            {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )
      }
    </div>
  )
}
