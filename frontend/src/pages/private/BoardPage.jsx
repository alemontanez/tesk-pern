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
  }, [boardId])

  console.log(board)
  
  return (
    <div>
      <p>Project: {projectId}</p>
      <p>Board:</p>
    </div>
  )
}
