import { useForm } from 'react-hook-form'
import { useTask } from '../../context/TaskContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import '../../styles/TaskForm.css'
import { format } from 'date-fns'

export default function TaskForm({ defaultValues }) {
  const { createNewTask, updateTask } = useTask()
  const { projectId, boardId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues || {
      title: '',
      description: '',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      priority: 1,
      status: 1
    }
  })

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  const onSubmit = async data => {
    const formattedData = {
      ...data,
      priorityId: parseInt(data.priorityId, 10), // Aseguramos que es número
      statusId: parseInt(data.statusId, 10), // Aseguramos que es número
    }

    if (defaultValues && defaultValues.id) {
      await updateTask(defaultValues.id, formattedData)
    } else {
      await createNewTask(projectId, boardId, formattedData)
    }
    navigate(`/dashboard/projects/${projectId}/boards/${boardId}`)
  }

  return (
    <form className='task-form' onSubmit={handleSubmit(onSubmit)}>
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
          rows={4}
          {...register('description')}
        />
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
        <select {...register('priorityId', { required: true })}>
          <option value='1'>Baja</option>
          <option value='2'>Media</option>
          <option value='3'>Alta</option>
          <option value='4'>Crítica</option>
        </select>
      </div>

      <div className='form-group'>
        <label>Estado</label>
        <select {...register('statusId', { required: true })}>
          <option value='1'>Pendiente</option>
          <option value='2'>En curso</option>
          <option value='3'>Finalizada</option>
        </select>
      </div>

      <button type='submit'>
        {defaultValues ? 'Actualizar Tarea' : 'Crear Tarea'}
      </button>
    </form>
  )
}
