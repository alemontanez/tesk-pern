import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProject } from '../../context/ProjectContext'
import { useBoard } from '../../context/BoardContext'
import TaskCard from '../../components/TaskCard'
import Tooltip from '../../components/Tooltip'
import Spinner from '../../components/Spinner'
import '../../styles/BoardPage.css'

export default function BoardPage() {
  const { getPermissions } = useProject()
  const { fetchBoard, searchTasks, errors } = useBoard()
  const { projectId, boardId } = useParams()
  const [board, setBoard] = useState({})
  const [tasks, setTasks] = useState([])
  const [userRole, setUserRole] = useState({})
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    async function getBoard(projectId, boardId) {
      setLoading(true)
      const res = await fetchBoard(projectId, boardId)
      setBoard(res)
      setTasks(res.Tasks)
      const permissions = await getPermissions(projectId)
      setUserRole(permissions)
      setLoading(false)
    }
    getBoard(projectId, boardId)
  }, [projectId, boardId])

  if (errors.length > 0) {
    return (
      <div className='board-page-errors'>
        {errors.map((error, i) => (
          <h2 key={i}>{error}</h2>
        ))}
      </div>
    )
  }

  const [timer, setTimer] = useState(null)

  const handleSearch = (e) => {
    const query = e.target.value.trim()
    setLoading(true)
    if (timer) clearTimeout(timer)

    const newTimer = setTimeout(async () => {
      const res = await searchTasks(projectId, boardId, query)
      setTasks(res)
      setLoading(false)
    }, 1000)
    setTimer(newTimer)
  }

  return (
    <div className='board-page'>
      <Link to={`/dashboard/projects/${projectId}`} className='project-go-back'>⬅️ Volver al proyecto</Link>
      <header className='board-header'>
        <h1 className='board-title'>{board.name}</h1>
        <div className='board-actions'>
          <input
            type="text"
            placeholder='Buscar tareas...'
            className='search-tasks'
            onChange={handleSearch}
          />

          {userRole.can_edit ? (
            <Link
              className='create-task-button'
              to={`/dashboard/projects/${projectId}/boards/${boardId}/create-task`}
            >
              + Crear tarea
            </Link>
          ) : (
            <Tooltip>
              <button
                className='create-task-button-disabled'
              >
                + Crear tarea
              </button>
            </Tooltip>
          )}
        </div>
      </header>

      {loading ? (
        <Spinner />
      ) : (
        tasks.length > 0 ? (
          <div className='tasks-grid'>
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} url={`/dashboard/projects/${projectId}/boards/${boardId}/tasks/${task.id}`} />
            ))}
          </div>
        ) : (
          <p className='no-tasks'>No se encontraron tareas.</p>
        )
      )}
    </div>
  )
}

