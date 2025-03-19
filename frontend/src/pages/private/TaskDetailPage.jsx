import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTask } from '../../context/TaskContext'
import '../../styles/TaskDetailPage.css'

export default function TaskDetailPage () {
  const { projectId, boardId, taskId } = useParams()
  const { fetchTask, updateTask, createComment } = useTask()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  // Formulario para editar la tarea
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      priority: '1'
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
      const formattedDueDate = data.due_date ? data.due_date.slice(0, 10) : ''
      reset({
        title: data.title,
        description: data.description,
        dueDate: formattedDueDate,
        priority: data.priority_id ? data.priority_id.toString() : '1'
      })
      setLoading(false)
    }
    loadTask()
  }, [projectId, boardId, taskId, reset, fetchTask])

  const onSubmit = async formData => {
    const updatedData = {
      ...formData,
      priority_id: parseInt(formData.priority, 10)
    }
    await updateTask(task.id, updatedData)
    const updatedTask = await fetchTask(projectId, boardId, taskId)
    setTask(updatedTask)
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
              <option value='1'>1 - Baja</option>
              <option value='2'>2 - Media</option>
              <option value='3'>3 - Alta</option>
              <option value='4'>4 - Crítica</option>
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
