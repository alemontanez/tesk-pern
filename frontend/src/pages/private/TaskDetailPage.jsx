import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTask } from '../../context/TaskContext'
import { format } from 'date-fns'
import Spinner from '../../components/Spinner'
import '../../styles/TaskDetailPage.css'

export default function TaskDetailPage() {
  const { projectId, boardId, taskId } = useParams()
  const { fetchTask, updateTask, createComment, deleteTask } = useTask()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [data, setData] = useState(null)
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
    async function loadTask() {
      const data = await fetchTask(projectId, boardId, taskId)
      setTask(data.task)
      setData(data)
      reset({
        title: data.task.title,
        description: data.task.description,
        dueDate: format(data.task.due_date, 'yyyy-MM-dd'),
        priority: data.task.priority_id ? data.task.priority_id.toString() : '1'
      })
      setLoading(false)
    }
    loadTask()
  }, [taskId])

  const onSubmit = async (formData) => {
    const updatedData = {
      ...formData,
      priorityId: parseInt(formData.priority, 10),
      createdBy: task.created_by,
      boardId: task.board_id,
      labelId: task.label_id
    }
    await updateTask(projectId, boardId, taskId, updatedData)
    navigate(`/dashboard/projects/${projectId}/boards/${boardId}`)
  }

  const onSubmitComment = async commentData => {
    await createComment(projectId, boardId, taskId, commentData)
    const updatedTask = await fetchTask(projectId, boardId, taskId)
    setTask(updatedTask)
    resetComment()
  }

  if (loading) {
    return (
      <div className='loading'>
        <Spinner />
      </div>
    )
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

          {/* Genera error de fecha en la consola */}
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
            <label>Creado Por</label>
            <input type='text' value={data.creator.name} readOnly />
          </div>

          <div className='form-group'>
            <label>Usuario asignado</label>
            <select
              {...register('assignedTo', { required: true })}
              defaultValue={data.task.assigned_to}
            >
              {data.users.map((user, i) => (
                <option
                  key={i}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Genera error de fecha en la consola */}
          <div className='form-group'>
            <label>Última actualización</label>
            <input type='text' value={format(task.updatedAt, 'dd/MM/yyyy p')} readOnly />
          </div>

          <button type='submit'>
            Guardar Cambios
          </button>
          <button
            type='button'
            className='delete-button' onClick={() => {
              deleteTask(projectId, boardId, taskId)
              navigate(`/dashboard/projects/${projectId}/boards/${boardId}`)
            }}
          >
            Eliminar tarea
          </button>
          <button
            type='button'
            className='cancel-button'
            onClick={() => navigate(`/dashboard/projects/${projectId}/boards/${boardId}`)}
          >
            Cancelar
          </button>
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
                <p className='comment-user'>
                  Usuario: {`${comment.User.first_name} ${comment.User.last_name}`}
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
