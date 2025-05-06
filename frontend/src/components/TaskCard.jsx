import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import '../styles/TaskCard.css'

export default function TaskCard({ task, url }) {

  let color = '#e5e7eb'
  if (task.Priority.name === 'Baja') color = '#55c953'
  if (task.Priority.name === 'Media') color = '#ebd510'
  if (task.Priority.name === 'Alta') color = '#f0a00c'
  if (task.Priority.name === 'Máxima') color = '#e3193b'

  return (
    <div
      className='task-card'
      style={{ borderLeft: `6px solid ${color || '#e5e7eb'}` }}
    >
      <div className='task-content'>
        <p className='task-description'>ID-{task.id}</p>
        <h3 className='task-title'>{task.title}</h3>
        <p className='task-description'>{task.description}</p>
        <p className='task-info'>
          <strong>Fecha de creación:</strong> {format(task.createdAt, 'dd-MM-yyyy')}
        </p>
        <p className='task-info'>
          <strong>Fecha límite:</strong> {format(task.due_date, 'dd-MM-yyyy')}
        </p>
        <p className='task-info'>
          <strong>Prioridad:</strong> {task.Priority?.name}
        </p>
        <p className='task-info'>
          <strong>Usuario asignado:</strong> {task.assignedTo?.first_name} {task.assignedTo?.last_name}
        </p>
      </div>
      <Link className='detail-button' to={url}>Ir a la tarea</Link>
    </div >
  )
}