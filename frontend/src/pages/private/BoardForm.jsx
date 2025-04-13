import { useForm } from 'react-hook-form'
import { useBoard } from '../../context/BoardContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import '../../styles/BoardForm.css'

export default function BoardForm ({ defaultValues }) {
  const { createNewBoard, updateBoard, errors } = useBoard()
  const { projectId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors }
  } = useForm({
    defaultValues: defaultValues || { name: '' }
  })

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  const onSubmit = async data => {
    if (defaultValues && defaultValues.id) {
      await updateBoard(defaultValues.id, data)
    } else {
      await createNewBoard(projectId, data)
    }
    navigate(`/dashboard/projects/${projectId}`)
  }

  return (
    <form className='board-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='form-group'>
        <label>Nombre del Board</label>
        <input
          type='text'
          {...register('name', { required: 'El nombre es obligatorio' })}
        />
        {formErrors.name && (
          <p className='error-message'>{formErrors.name.message}</p>
        )}
      </div>
      <button type='submit'>
        {defaultValues ? 'Actualizar Board' : 'Crear Board'}
      </button>
    </form>
  )
}
