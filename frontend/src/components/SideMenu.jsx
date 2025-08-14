import { NavLink } from 'react-router-dom'
import '../styles/SideMenu.css'
import { useUser } from '../context/UserContext'

export default function SideMenu() {

  const { profile } = useUser()
  const firstInitial = profile?.firstName ? profile.firstName.substring(0, 1).toUpperCase() : ''
  const lastInitial = profile?.lastName ? profile.lastName.substring(0, 1).toUpperCase() : ''
  

  return (
    <aside className='side-menu'>
      <div className='user-info'>
        <div className='avatar'>{firstInitial}{lastInitial}</div>
        <div className='user-details'>
          <h3>{profile.firstName} {profile.lastName}</h3>
          <p>{profile.email}</p>
        </div>
      </div>

      <ul className='menu-links'>
        <li>
          <NavLink to='/home' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>🏠</span> Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>📁</span> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to='/projects' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>📌</span> Proyectos
          </NavLink>
        </li>
        <li>
          <NavLink to='/teams' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>👥</span> Equipos
          </NavLink>
        </li>
        <li>
          <NavLink to='/calendar' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>📅</span> Calendario
          </NavLink>
        </li>
        <li>
          <NavLink to='/reports' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>📊</span> Reportes
          </NavLink>
        </li>
        <li>
          <NavLink to='/documentation' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>📖</span> Documentación
          </NavLink>
        </li>
        <li>
          <NavLink to='/search' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>🔍</span> Búsqueda
          </NavLink>
        </li>
        <li>
          <NavLink to='/automations' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>⚡</span> Automatizaciones
          </NavLink>
        </li>
        <li>
          <NavLink to='/settings' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>⚙️</span> Ajustes
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}
