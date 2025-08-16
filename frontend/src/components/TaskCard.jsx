import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import '../styles/TaskCard.css'

export default function TaskCard({ task, url }) {


  let color = '#e5e7eb'
  if (task.TaskPriority.name === 'Baja') color = '#55c953'
  if (task.TaskPriority.name === 'Media') color = '#ebd510'
  if (task.TaskPriority.name === 'Alta') color = '#f0a00c'
  if (task.TaskPriority.name === 'Máxima') color = '#e3193b'

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
          <strong>Fecha límite:</strong> {format(task.dueDate, 'dd-MM-yyyy')}
        </p>
        <p className='task-info'>
          <strong>Prioridad:</strong> {task.TaskPriority?.name}
        </p>
        <p className='task-info'>
          <strong>Estado:</strong> {task.TaskStatus?.name}
        </p>
        <p className='task-info'>
          <strong>Usuario asignado:</strong> {task.assignedUser?.firstName} {task.assignedUser?.lastName}
        </p>
      </div>
      <Link className='detail-button' to={url}>Ir a la tarea</Link>
    </div >
  )
}