import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProject } from '../../context/ProjectContext'
import { useBoard } from '../../context/BoardContext'
import TaskCard from '../../components/TaskCard'
import '../../styles/BoardPage.css'
import Tooltip from '../../components/Tooltip'

export default function BoardPage() {
  const { getPermissions } = useProject()
  const { fetchBoard, errors } = useBoard()
  const { projectId, boardId } = useParams()
  const [board, setBoard] = useState({})
  const [tasks, setTasks] = useState([])
  const [userRole, setUserRole] = useState({})

  useEffect(() => {
    async function getBoard(projectId, boardId) {
      const res = await fetchBoard(projectId, boardId)
      setBoard(res)
      setTasks(res.Tasks)
      const permissions = await getPermissions(projectId)
      setUserRole(permissions)
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

  return (
    <div className='board-page'>
      <Link to={`/dashboard/projects/${projectId}`} className='project-go-back'>⬅️ Volver al proyecto</Link>
      <header className='board-header'>
        <h1 className='board-title'>{board.name}</h1>
        {userRole.can_edit ? (
          <Link
            className='create-task-button'
            to={`/dashboard/projects/${projectId}/boards/${boardId}/create-task`}
          >
            + Crear tarea
          </Link>
        ) : (
          <Tooltip message='No tenes permisos para realizar esta acción'>
            <button
              className='create-task-button-disabled'
            >
              + Crear tarea
            </button>
          </Tooltip>
        )}
      </header>

      {tasks.length > 0 ? (
        <div className='tasks-grid'>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} url={`/dashboard/projects/${projectId}/boards/${boardId}/tasks/${task.id}`} />
          ))}
        </div>
      ) : (
        <p className='no-tasks'>Aún no hay tareas</p>
      )}
    </div>
  )
}

