import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Navbar.css'

export default function Navbar () {
  const { isAuthenticated, logout } = useAuth()

  if (isAuthenticated) {
    return (
      <nav className='navbar navbar-internal'>
        <div className='navbar-left'>
          <div className='logo'>
            <span className='logo-icon'>🌀</span>
            <span className='logo-text'>Tesk</span>
          </div>
        </div>
        <div className='navbar-right'>
          <NavLink to='/home' className={({ isActive }) => isActive ? 'active' : ''}>
            Inicio
          </NavLink>
          <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'active' : ''}>
            Dashboard
          </NavLink>
          <NavLink to='/projects' className={({ isActive }) => isActive ? 'active' : ''}>
            Proyectos
          </NavLink>
          <NavLink to='/teams' className={({ isActive }) => isActive ? 'active' : ''}>
            Equipos
          </NavLink>
          <button onClick={logout} className='logout-button'>Cerrar sesión</button>
        </div>
      </nav>
    )
  } else {
    return (
      <nav className='navbar navbar-public'>
        <div className='navbar-left'>
          <div className='logo'>
            <span className='logo-icon'>🌀</span>
            <span className='logo-text'>Tesk</span>
          </div>
          <div className='nav-links'>
            <NavLink to='/'>Inicio</NavLink>
            <NavLink to='/'>Características</NavLink>
            <NavLink to='/'>Precios</NavLink>
            <NavLink to='/'>Sobre nosotros</NavLink>
          </div>
        </div>
        <div className='navbar-right'>
          <Link to='/login' className='login-link'>Ingresar</Link>
          <Link to='/register' className='get-started-button'>Registrarse</Link>
        </div>
      </nav>
    )
  }
}