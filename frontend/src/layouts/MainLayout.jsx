import SideMenu from '../components/SideMenu'
import { Outlet } from 'react-router-dom'
import '../styles/MainLayout.css'

export default function MainLayout () {
  return (
    <div className='main-layout'>
      <div className='layout-content'>
        <SideMenu />
        <main className='main-page'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
