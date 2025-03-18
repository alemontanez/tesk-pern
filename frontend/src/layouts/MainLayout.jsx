import { ProjectProvider } from '../context/ProjectContext'
import { BoardProvider } from '../context/BoardContext'
import SideMenu from '../components/SideMenu'
import { Outlet } from 'react-router-dom'
import '../styles/MainLayout.css'

export default function MainLayout() {
  return (
    <ProjectProvider>
      <BoardProvider>
        <div className='main-layout'>
          <div className='layout-content'>
            <SideMenu />
            <main className='main-page'>
              <Outlet />
            </main>
          </div>
        </div>
      </BoardProvider>
    </ProjectProvider>
  )
}
