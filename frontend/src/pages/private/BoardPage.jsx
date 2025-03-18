import { useParams } from 'react-router-dom'
import { useBoard } from '../../context/BoardContext'
import { useEffect, useState } from 'react'

export default function BoardPage() {

  const [board, setBoard] = useState({})
  const [tasks, setTasks] = useState([])

  const { projectId, boardId } = useParams()
  const { fetchBoard, errors } = useBoard()

  useEffect(() => {
    async function getBoard(projectId, boardId) {
      const res = await fetchBoard(projectId, boardId)
      setBoard(res)
      setTasks(res.Tasks)
    }
    getBoard(projectId, boardId)
  }, [projectId, boardId])

  if (errors.length > 0) {
    return (
      <div>
        {errors.map((error, i) => (
          <h2 key={i}>{error}</h2>
        ))}
      </div>
    )
  } else {
    return (
      <div>
        <h2>{board.name}</h2>
        {
          tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task.id}>
                <h3 style={{color: task.Label.hex_code}}>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.due_date}</p>
                <p>{task.Priority.name}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>Aún no hay tareas</p>
          )
        }
      </div>
    )
  }
}
