import { useForm } from 'react-hook-form'
import { useProject } from '../../context/ProjectContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import '../../styles/ProjectForm.css'

export default function ProjectForm ({ defaultValues }) {
  const { createNewProject, updateProject } = useProject()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues || { name: '', description: '' }
  })

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  const onSubmit = async data => {
    if (defaultValues && defaultValues.id) {
      await updateProject(defaultValues.id, data)
    } else {
      await createNewProject(data)
    }
    navigate('/dashboard')
  }

  return (
    <form className='project-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='form-group'>
        <label>Nombre del Proyecto</label>
        <input
          type='text'
          {...register('name', { required: 'El nombre es obligatorio' })}
        />
        {errors.name && (
          <p className='error-message'>{errors.name.message}</p>
        )}
      </div>
      <div className='form-group'>
        <label>Descripción</label>
        <textarea
          {...register('description', { required: 'La descripción es obligatoria' })}
        />
        {errors.description && (
          <p className='error-message'>{errors.description.message}</p>
        )}
      </div>
      <button type='submit'>
        {defaultValues ? 'Actualizar Proyecto' : 'Crear Proyecto'}
      </button>
    </form>
  )
}
