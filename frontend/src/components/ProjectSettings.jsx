import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useProject } from '../context/ProjectContext'
import Swal from 'sweetalert2'
import '../styles/ProjectSettings.css'

const ProjectSettings = ({ project, onUpdateSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { updateProject, clearErrors, errors: apiErrors } = useProject()

  // Setear valores iniciales del formulario
  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description
      })
    }
  }, [project, reset])

  // Manejar errores de permisos
  useEffect(() => {
    if (apiErrors.some(error => error.includes('The user does not have permissions'))) {
      Swal.fire({
        title: 'Acceso denegado',
        text: 'No tienes permisos para modificar este proyecto',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        clearErrors()
      })
    }
  }, [apiErrors, clearErrors])

  const onSubmit = async (data) => {
    try {
      await updateProject(project.id, data)
      Swal.fire({
        title: '¡Cambios guardados!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      onUpdateSuccess()
    } catch (error) {
      // El error ya es manejado por el contexto
    }
  }

  return (
    <div className="project-settings">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="settings-section">
          <h3>Configuración del Proyecto</h3>
          
          <div className="form-group">
            <label>Nombre del Proyecto</label>
            <input
              type="text"
              {...register('name', { required: 'El nombre es requerido' })}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              {...register('description')}
              rows="4"
            />
          </div>

          <button type="submit" className="save-button">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProjectSettings