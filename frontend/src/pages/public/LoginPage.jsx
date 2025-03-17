import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import '../../styles/LoginPage.css'

const LoginPage = () => {
  const { signin, errors: authErrors } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    await signin(data)
    navigate('/dashboard')
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Enter your credentials to access your account</p>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="me@example.com"
              {...register('email', { required: 'El email es obligatorio' })}
            />
            {formErrors.email && (
              <p className="error-message">{formErrors.email.message}</p>
            )}
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
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

          <button type="submit" className="login-button">Login</button>
        </form>

        {authErrors && authErrors.map((error, i) => (
          <p key={i} className="error-message">{error}</p>
        ))}

        <p className="signup-text">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
