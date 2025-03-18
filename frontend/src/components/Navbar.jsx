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
            Home
          </NavLink>
          <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'active' : ''}>
            Dashboard
          </NavLink>
          <NavLink to='/projects' className={({ isActive }) => isActive ? 'active' : ''}>
            Projects
          </NavLink>
          <NavLink to='/teams' className={({ isActive }) => isActive ? 'active' : ''}>
            Teams
          </NavLink>
          <button onClick={logout} className='logout-button'>Log out</button>
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
            <NavLink to='/features'>Features</NavLink>
            <NavLink to='/pricing'>Pricing</NavLink>
            <NavLink to='/about'>About</NavLink>
          </div>
        </div>
        <div className='navbar-right'>
          <Link to='/login' className='login-link'>Log in</Link>
          <Link to='/register' className='get-started-button'>Get Started</Link>
        </div>
      </nav>
    )
  }
}