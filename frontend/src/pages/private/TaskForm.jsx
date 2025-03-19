// src/pages/TaskForm.jsx
import { useForm } from 'react-hook-form'
import { useTask } from '../../context/TaskContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import '../../styles/TaskForm.css'

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
      dueDate: '',
      priority: 1
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
      priorityId: parseInt(data.priorityId, 10) // Aseguramos que es número
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
          <option value='1'>1 - Baja</option>
          <option value='2'>2 - Media</option>
          <option value='3'>3 - Alta</option>
          <option value='4'>4 - Crítica</option>
        </select>
      </div>

      <button type='submit'>
        {defaultValues ? 'Actualizar Tarea' : 'Crear Tarea'}
      </button>
    </form>
  )
}
