import { useParams, Link } from 'react-router-dom'
import { useBoard } from '../../context/BoardContext'
import { useEffect, useState } from 'react'
import TaskCard from '../../components/TaskCard'
import '../../styles/BoardPage.css'

export default function BoardPage() {
  const [board, setBoard] = useState({})
  const [tasks, setTasks] = useState([])
  const { projectId, boardId } = useParams()
  const { fetchBoard, errors } = useBoard()

  useEffect(() => {
    async function getBoard(projId, brdId) {
      const res = await fetchBoard(projId, brdId)
      setBoard(res)
      setTasks(res.Tasks)
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
      <header className='board-header'>
        <h1 className='board-title'>{board.name}</h1>
        <Link className='create-task-button' to={`/dashboard/projects/${projectId}/boards/${boardId}/create-task`}>+ Crear tarea</Link>
      </header>

      {tasks.length > 0 ? (
        <div className='tasks-grid'>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} url={`/dashboard/projects/${projectId}/boards/${boardId}/tasks/${task.id}`}/>
          ))}
        </div>
      ) : (
        <p className='no-tasks'>Aún no hay tareas</p>
      )}
    </div>
  )
}

