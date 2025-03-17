import { NavLink } from 'react-router-dom'
import '../styles/SideMenu.css'

export default function SideMenu() {
  return (
    <aside className='side-menu'>
      <div className='user-info'>
        <div className='avatar'>JD</div>
        <div className='user-details'>
          <h3>John Doe</h3>
          <p>john@example.com</p>
        </div>
      </div>

      <ul className='menu-links'>
        <li>
          <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>🏠</span> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to='/home' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>📁</span> Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/projects' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>📌</span> Projects
          </NavLink>
        </li>
        <li>
          <NavLink to='/teams' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>👥</span> Teams
          </NavLink>
        </li>
        <li>
          <NavLink to='/calendar' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>📅</span> Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to='/reports' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>📊</span> Reports
          </NavLink>
        </li>
        <li>
          <NavLink to='/documentation' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>📖</span> Documentation
          </NavLink>
        </li>
        <li>
          <NavLink to='/search' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>🔍</span> Search
          </NavLink>
        </li>
        <li>
          <NavLink to='/automations' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>⚡</span> Automations
          </NavLink>
        </li>
        <li>
          <NavLink to='/settings' className={({ isActive }) => isActive ? 'active' : ''}>
            <span className='icon'>⚙️</span> Settings
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}
