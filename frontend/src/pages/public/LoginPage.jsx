import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import '../../styles/LoginPage.css'
import { useEffect } from 'react'

const LoginPage = () => {
  const { isAuthenticated ,signin, errors: authErrors } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm()
  const navigate = useNavigate()

  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [])

  const onSubmit = async (data) => {
    await signin(data)
    navigate('/home')
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Ingresar a mi usuario</h2>
        <p className="login-subtitle">Introduce tus credenciales para poder acceder</p>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="usuario@ejemplo.com"
              {...register('email', { required: 'El email es obligatorio' })}
            />
            {formErrors.email && (
              <p className="error-message">{formErrors.email.message}</p>
            )}
          </div>

          <div className="form-group password-group">
            <label>Contraseña</label>
            <Link to="/forgot-password" className="forgot-link">Olvidé mi contraseña</Link>
          </div>
          <div className="form-group">
            <input
              type="password"
              {...register('password', { required: 'La contraseña es obligatoria' })}
            />
            {formErrors.password && (
              <p className="error-message">{formErrors.password.message}</p>
            )}
          </div>

          <button type="submit" className="login-button">Ingresar</button>
        </form>

        {authErrors && authErrors.map((error, i) => (
          <p key={i} className="error-message">{error}</p>
        ))}

        <p className="signup-text">
          ¿No estás registrado? <Link to="/register">Crea una cuenta</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
