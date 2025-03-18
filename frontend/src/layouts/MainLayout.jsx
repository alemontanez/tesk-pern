import { ProjectProvider } from '../context/ProjectContext'
import { BoardProvider } from '../context/BoardContext'
import { Outlet } from 'react-router-dom'
import SideMenu from '../components/SideMenu'
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
