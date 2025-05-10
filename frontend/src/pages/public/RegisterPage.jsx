import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import '../../styles/RegisterPage.css'
import { useEffect } from 'react'

const RegisterPage = () => {
  const { isAuthenticated, signup, errors: authErrors } = useAuth()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors }
  } = useForm()
  const navigate = useNavigate()

  useEffect(() => { 
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [])


  const passwordValue = watch('password', '')

  const onSubmit = async (data) => {
    await signup(data)
    navigate('/dashboard')
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Crear una cuenta</h1>
        <p className="register-subtitle">Ingresa tus datos para registrarte</p>

        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="name-fields">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                {...register('firstName', { required: 'El nombre es requerido' })}
              />
              {formErrors.firstName && (
                <p className="error-message">{formErrors.firstName.message}</p>
              )}
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                placeholder="Tu apellido"
                {...register('lastName', { required: 'El apellido es requerido' })}
              />
              {formErrors.lastName && (
                <p className="error-message">{formErrors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              placeholder="Tu usuario"
              {...register('username', { required: 'El usuario es requerido' })}
            />
            {formErrors.username && (
              <p className="error-message">{formErrors.username.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="usuario@ejemplo.com"
              {...register('email', { required: 'El email es requerido' })}
            />
            {formErrors.email && (
              <p className="error-message">{formErrors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
            />
            {formErrors.password && (
              <p className="error-message">{formErrors.password.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Falta confirmar la contraseña',
                validate: (value) =>
                  value === passwordValue || 'Las contraseñas no coinciden'
              })}
            />
            {formErrors.confirmPassword && (
              <p className="error-message">{formErrors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" className="register-button">Registrarse</button>
        </form>

        {authErrors &&
          authErrors.map((error, i) => (
            <p key={i} className="error-message">{error}</p>
          ))
        }

        <p className="login-text">
          ¿Ya estas registrado? <Link to="/login">Ingresar</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
