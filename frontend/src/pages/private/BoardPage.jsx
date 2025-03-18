import { useParams } from 'react-router-dom'
import { useBoard } from '../../context/BoardContext'
import { useEffect, useState } from 'react'

export default function BoardPage() {

  const [board, setBoard] = useState({})

  const { projectId, boardId } = useParams()
  const { fetchBoard } = useBoard()
  
  useEffect(() => {
    async function getBoard(projectId, boardId) {
      const res = await fetchBoard(projectId, boardId)
      setBoard(res)
    }
    getBoard(projectId, boardId)
  }, [projectId, boardId])

  console.log(board)
  
  return (
    <div>
      <h2>{board.name}</h2>
      {board.Tasks.map(task => (
        <div>
          <h3>{task.title}</h3>
          <span>{task.description}</span>
        </div>
      ))}
    </div>
  )
}
