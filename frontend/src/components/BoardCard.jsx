import { Link } from 'react-router-dom'
import '../styles/BoardCard.css'

export default function BoardCard ({ projectId, board }) {
  return (
    <div className='board-card'>
      <div className='board-card-header'>
        <h3 className='board-title'>{board.name}</h3>
        {/* Ícono de favorito, menú, etc. opcional */}
      </div>

      <p className='board-subtitle'>
        {board.tasksCount || 0} tasks
      </p>

      {/* Aquí podrías mostrar más detalles, p. ej. prioridad, estado, etc. */}
      <Link
        className='view-board-button'
        to={`/dashboard/projects/${projectId}/boards/${board.id}`}
      >
        View Board
      </Link>
    </div>
  )
}
