import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProject } from '../../context/ProjectContext'
import BoardCard from '../../components/BoardCard'
import Spinner from '../../components/Spinner'
import '../../styles/ProjectPage.css'

export default function ProjectPage() {
  const { projectId } = useParams()
  const { fetchProject, searchBoards, errors } = useProject()
  const [project, setProject] = useState({})
  const [boards, setBoards] = useState([])
  const [timer, setTimer] = useState(null)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    async function getProject(id) {
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

  const handleSearch = (e) => {
    const query = e.target.value.trim()
    setLoading(true)
    if (timer) clearTimeout(timer)

    const newTimer = setTimeout(async () => {
      const res = await searchBoards(projectId, query)
      setBoards(res)
      setLoading(false)
    }, 1000)
    setTimer(newTimer)
  }

  return (
    <div className='project-page'>
      <Link to={'/dashboard'} className='project-go-back'>⬅️ Volver al dashboard</Link>
      {/* Encabezado del proyecto */}
      <div className='project-header'>
        <h1 className='project-title'>{project.name}</h1>
        <p className='project-description'>{project.description}</p>

        {/* Pestañas: Boards, Members, Settings */}
        <div className='project-tabs'>
          <button className='tab-button active'>Tableros</button>
          <button className='tab-button'>Miembros</button>
          <button className='tab-button'>Ajustes</button>
        </div>
      </div>

      {/* Acciones: Búsqueda y botón para crear nuevo board */}
      <div className='project-actions'>
        <input
          type='text'
          placeholder='Buscar tableros...'
          className='search-boards'
          onChange={handleSearch}
        />
        <Link className='new-board-button' to={`/dashboard/projects/${projectId}/create-board`}>+ Crear Tablero</Link>
      </div>

      {/* Contenedor de tableros en forma de grid */}
      {loading ? (
        <>
          <Spinner></Spinner>
        </>
      ) : (
        <>
          {
            boards.length > 0 ? (
              <div className='boards-container'>
                {boards.map(board => (
                  <BoardCard
                    key={board.id}
                    projectId={project.id}
                    board={board}
                  />
                ))}
                <div className='create-board-card'>
                  <div className='plus-icon'>+</div>
                  <p className='create-board-text'>Crear un nuevo tablero</p>
                  <span className='create-board-subtext'>
                    Añade un nuevo tablero para organizar tus tareas
                  </span>
                </div>
              </div>
            ) : (
              <div className='boards-not-found'>No se encontraron tableros que coincidan con la búsqueda.</div>
            )
          }
        </>

      )}
    </div>
  )
}
