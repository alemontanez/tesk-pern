import { Link } from 'react-router-dom'
import '../styles/BoardCard.css'

export default function BoardCard({ projectId, board }) {

  return (
    <div
      className='board-card'
      style={{ border: `1px solid ${board.Label?.hex_code || '#e5e7eb'}`, borderTop: `5px solid ${board.Label?.hex_code || '#e5e7eb'}` }}
    >
      <div className='board-card-header'>
        <h3 className='board-card-title'>{board.name}</h3>
      </div>
      <p className='board-card-subtitle'>
        {board.taskCount || 0} tareas
      </p>
      <Link
        className='view-board-button'
        to={`/dashboard/projects/${projectId}/boards/${board.id}`}
      >
        Ver Tablero
      </Link>
    </div>
  )
}
