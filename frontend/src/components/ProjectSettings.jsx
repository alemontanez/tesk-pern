import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useProject } from '../context/ProjectContext'
import '../styles/ProjectSettings.css'

const ProjectSettings = ({ project, setShouldRefresh, setActiveTab }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { updateProject, deleteProject, clearErrors, errors: apiErrors } = useProject()

  const navigate = useNavigate()

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
      alert('Error: Acceso denegado')
      clearErrors()
    }
  }, [apiErrors, clearErrors])

  const onSubmit = async (data) => {
    await updateProject(project.id, data)
    alert('Proyecto actualizado')
    setShouldRefresh(prev => !prev)
    setActiveTab('boards')
  }

  const onDelete = async () => {
    await deleteProject(project.id)
    alert('Proyecto eliminado')
    navigate('/dashboard')
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

          <div className='project-settings-buttons'>
            <button type="submit" className="save-button">
              Guardar Cambios
            </button>
            <button className='delete-project-btn' onClick={onDelete}>
              Eliminar proyecto
            </button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default ProjectSettings