import { Link } from 'react-router-dom'
import '../styles/TaskCard.css'

export default function TaskCard({ task, url }) {
  return (
    <div
      className='task-card'
      style={{ borderLeft: `5px solid ${task.Label?.hex_code || '#e5e7eb'}` }}
    >
      <div className='task-content'>
        <h3 className='task-title'>{task.title}</h3>
        <p className='task-description'>{task.description}</p>
        <p className='task-info'>
          <strong>Fecha de creación:</strong> {task.createdAt}
        </p>
        <p className='task-info'>
          <strong>Fecha límite:</strong> {task.due_date}
        </p>
        <p className='task-info'>
          <strong>Prioridad:</strong> {task.Priority?.name}
        </p>
        <p className='task-info'>
          <strong>Usuario asignado:</strong> {task.assignedTo?.first_name} {task.assignedTo?.last_name}
        </p>
      </div>
      <Link className='detail-button' to={url}>Ir a la tarea</Link>
    </div>
  )
}