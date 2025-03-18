import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProject } from '../../context/ProjectContext'
import BoardCard from '../../components/BoardCard'
import '../../styles/ProjectPage.css'

export default function ProjectPage () {
  const { projectId } = useParams()
  const { fetchProject, errors } = useProject()
  const [project, setProject] = useState({})
  const [boards, setBoards] = useState([])

  useEffect(() => {
    async function getProject (id) {
      const res = await fetchProject(id)
      setProject(res.data)
      setBoards(res.data.Boards)
    }
    getProject(projectId)
  }, [projectId])

  if (errors.length > 0) {
    return (
      <div>
        {errors.map((error, i) => (
          <h2 key={i}>{error}</h2>
        ))}
      </div>
    )
  }

  return (
    <div className='project-page'>

      {/* Encabezado del proyecto */}
      <div className='project-header'>
        <h1 className='project-title'>{project.name}</h1>
        <p className='project-description'>{project.description}</p>

        {/* Pestañas: Boards, Members, Settings */}
        <div className='project-tabs'>
          <button className='tab-button active'>Boards</button>
          <button className='tab-button'>Members</button>
          <button className='tab-button'>Settings</button>
        </div>
      </div>

      {/* Acciones: Búsqueda y botón para crear nuevo board */}
      <div className='project-actions'>
        <input
          type='text'
          placeholder='Search boards...'
          className='search-boards'
        />
        <button className='new-board-button'>+ New Board</button>
      </div>

      {/* Contenedor de tableros en forma de grid */}
      <div className='boards-container'>
        {boards.map(board => (
          <BoardCard
            key={board.id}
            projectId={project.id}
            board={board}
          />
        ))}

        {/* Tarjeta para crear un nuevo board */}
        <div className='create-board-card'>
          <div className='plus-icon'>+</div>
          <p className='create-board-text'>Create a new board</p>
          <span className='create-board-subtext'>
            Add a new board to organize your tasks
          </span>
        </div>
      </div>

    </div>
  )
}
