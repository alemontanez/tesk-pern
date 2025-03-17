import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import '../../styles/RegisterPage.css'

const RegisterPage = () => {
  const { signup, errors: authErrors } = useAuth()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors }
  } = useForm()
  const navigate = useNavigate()

  const passwordValue = watch('password', '')

  const onSubmit = async (data) => {
    await signup(data)
    navigate('/dashboard')
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Create an account</h1>
        <p className="register-subtitle">Enter your information to get started</p>

        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="name-fields">
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                placeholder="John"
                {...register('firstName', { required: 'First name is required' })}
              />
              {formErrors.firstName && (
                <p className="error-message">{formErrors.firstName.message}</p>
              )}
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                placeholder="Doe"
                {...register('lastName', { required: 'Last name is required' })}
              />
              {formErrors.lastName && (
                <p className="error-message">{formErrors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="johndoe123"
              {...register('username', { required: 'Username is required' })}
            />
            {formErrors.username && (
              <p className="error-message">{formErrors.username.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="me@example.com"
              {...register('email', { required: 'Email is required' })}
            />
            {formErrors.email && (
              <p className="error-message">{formErrors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long'
                }
              })}
            />
            {formErrors.password && (
              <p className="error-message">{formErrors.password.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === passwordValue || 'Passwords do not match'
              })}
            />
            {formErrors.confirmPassword && (
              <p className="error-message">{formErrors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" className="register-button">Create account</button>
        </form>

        {authErrors &&
          authErrors.map((error, i) => (
            <p key={i} className="error-message">{error}</p>
          ))
        }

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
