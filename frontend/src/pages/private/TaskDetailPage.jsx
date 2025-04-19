import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTask } from '../../context/TaskContext'
import { format } from 'date-fns'
import '../../styles/TaskDetailPage.css'

export default function TaskDetailPage () {
  const { projectId, boardId, taskId } = useParams()
  const { fetchTask, updateTask, createComment, deleteTask } = useTask()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  // Formulario para editar la tarea
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      priority: '1',
    }
  })

  // Formulario para crear un comentario
  const { register: registerComment, handleSubmit: handleSubmitComment, reset: resetComment, formState: { errors: commentErrors } } = useForm({
    defaultValues: {
      content: ''
    }
  })

  useEffect(() => {
    async function loadTask () {
      const data = await fetchTask(projectId, boardId, taskId)
      setTask(data)
      reset({
        title: data.title,
        description: data.description,
        dueDate: format(data.due_date, 'yyyy-MM-dd'),
        priority: data.priority_id ? data.priority_id.toString() : '1'
      })
      setLoading(false)
    }
    loadTask()
  }, [taskId])

  const onSubmit = async formData => {
    const updatedData = {
      ...formData,
      priorityId: parseInt(formData.priority, 10),
      createdBy: task.created_by,
      assignedTo: task.assigned_to,
      boardId: task.board_id,
      labelId: task.label_id
    }
    await updateTask(projectId, boardId, taskId, updatedData)
    const updatedTask = await fetchTask(projectId, boardId, taskId)
    setTask(updatedTask)
    navigate(`/dashboard/projects/${projectId}/boards/${boardId}`)
  }

  const onSubmitComment = async commentData => {
    await createComment(projectId, boardId, taskId, commentData)
    const updatedTask = await fetchTask(projectId, boardId, taskId)
    setTask(updatedTask)
    resetComment()
  }

  if (loading) {
    return <p className='loading'>Cargando...</p>
  }

  return (
    <div className='task-detail-page'>
      <h1 className='task-detail-title'>Detalle de la Tarea</h1>

      <section className='task-edit-section'>
        <form className='task-edit-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label>Título</label>
            <input
              type='text'
              {...register('title', { required: 'El título es obligatorio' })}
            />
            {errors.title && <p className='error-message'>{errors.title.message}</p>}
          </div>
          <div className='form-group'>
            <label>Descripción</label>
            <textarea
              {...register('description', { required: 'La descripción es obligatoria' })}
            />
            {errors.description && <p className='error-message'>{errors.description.message}</p>}
          </div>
          <div className='form-group'>
            <label>Fecha de creación</label>
            <input type="date" value={format(task.createdAt, 'yyyy-MM-dd')} readOnly />
          </div>
          <div className='form-group'>
            <label>Fecha Límite</label>
            <input
              type='date'
              {...register('dueDate', { required: 'La fecha límite es obligatoria' })}
            />
            {errors.dueDate && <p className='error-message'>{errors.dueDate.message}</p>}
          </div>
          <div className='form-group'>
            <label>Prioridad</label>
            <select {...register('priority', { required: true })}>
              <option value='1'>Baja</option>
              <option value='2'>Media</option>
              <option value='3'>Alta</option>
              <option value='4'>Crítica</option>
            </select>
          </div>

          {/* Campos de solo lectura para mostrar los IDs (por ahora) */}
          <div className='form-group'>
            <label>Creado Por (ID)</label>
            <input type='text' value={task.created_by} readOnly />
          </div>
          <div className='form-group'>
            <label>Actualizado (Timestamp)</label>
            <input type='text' value={task.updatedAt} readOnly />
          </div>

          <button type='submit'>Guardar Cambios</button>
          <button type='button' className='delete-button' onClick={() => {
            deleteTask(projectId, boardId, taskId)
            navigate(`/dashboard/projects/${projectId}/boards/${boardId}`)
          }}>Eliminar tarea</button>
        </form>
      </section>

      <section className='task-comments-section'>
        <h2>Comentarios</h2>
        <div className='comments-list'>
          {task.Comments && task.Comments.length > 0 ? (
            task.Comments.map(comment => (
              <div className='comment-card' key={comment.id}>
                <p className='comment-content'>{comment.content}</p>
                <p className='comment-date'>
                  Creado: {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No hay comentarios</p>
          )}
        </div>

        <form className='comment-form' onSubmit={handleSubmitComment(onSubmitComment)}>
          <div className='form-group'>
            <label>Nuevo Comentario</label>
            <textarea
              {...registerComment('content', { required: 'El comentario es obligatorio' })}
            />
            {commentErrors.content && <p className='error-message'>{commentErrors.content.message}</p>}
          </div>
          <button type='submit'>Agregar Comentario</button>
        </form>
      </section>
    </div>
  )
}
