import { ProjectProvider } from '../context/ProjectContext'
import { BoardProvider } from '../context/BoardContext'
import { TaskProvider } from '../context/TaskContext'
import { Outlet } from 'react-router-dom'
import SideMenu from '../components/SideMenu'
import '../styles/MainLayout.css'
import { UserProvider } from '../context/UserContext'

export default function MainLayout() {
  return (
    <UserProvider>
      <ProjectProvider>
        <BoardProvider>
          <TaskProvider>
            <div className='main-layout'>
              <div className='layout-content'>
                <SideMenu />
                <main className='main-page'>
                  <Outlet />
                </main>
              </div>
            </div>
          </TaskProvider>
        </BoardProvider>
      </ProjectProvider>
    </UserProvider>
  )
}
