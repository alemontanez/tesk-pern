import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProject } from '../../context/ProjectContext'
import BoardsPanel from '../../components/BoardsPanel'
import MembersPanel from '../../components/MembersPanel'
import ProjectSettings from '../../components/ProjectSettings'
import Tooltip from '../../components/Tooltip'
import '../../styles/ProjectPage.css'

export default function ProjectPage() {
  const { projectId } = useParams()
  const { fetchProject, searchBoards, getMembers, getPermissions, errors } = useProject()
  const [project, setProject] = useState({})
  const [boards, setBoards] = useState([])
  const [timer, setTimer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('boards')
  const [userRole, setUserRole] = useState({})
  const [shouldRefresh, setShouldRefresh] = useState(false)

  useEffect(() => {
    async function getProject(id) {
      const res = await fetchProject(id)
      setProject(res.data)
      setBoards(res.data.Boards)
      const permissions = await getPermissions(id)
      setUserRole(permissions)
    }
    if (activeTab === 'boards') {
      getProject(projectId)
    }
  }, [shouldRefresh])

  const handleSearch = (e) => {
    const query = e.target.value.trim()
    setLoading(true)
    if (timer) clearTimeout(timer)

    const newTimer = setTimeout(async () => {
      const res = await searchBoards(projectId, query)
      setBoards(res)
      setLoading(false)
    }, 1000)
    setTimer(newTimer)
  }

  return (
    <div className='project-page'>
      <Link to={'/dashboard'} className='project-go-back'>
        ⬅️ Volver al dashboard
      </Link>

      <div className='project-header'>
        <h1 className='project-title'>{project.name}</h1>
        <p className='project-description'>{project.description}</p>

        <div className='project-tabs'>
          <button
            className={`project-tab-button ${activeTab === 'boards' ? 'active' : ''}`}
            onClick={() => setActiveTab('boards')}
          >
            Tableros
          </button>
          <button
            className={`project-tab-button ${activeTab === 'members' ? 'active' : ''}`}
            onClick={() => setActiveTab('members')}
          >
            Miembros
          </button>
          {userRole.can_manage ?
            <button
              className={`project-tab-button ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Ajustes
            </button> :
            <Tooltip>
              <button className='project-tab-button' disabled>
                Ajustes
              </button>
            </Tooltip>
          }
        </div>
      </div>

      {activeTab === 'boards' && (
        <BoardsPanel
          boards={boards}
          loading={loading}
          projectId={projectId}
          onSearch={handleSearch}
          userRole={userRole}
        />
      )}
      {activeTab === 'members' && (
        <MembersPanel
          projectId={projectId}
          getMembers={getMembers}
          getPermissions={getPermissions}
          userRole={userRole}
        />
      )}
      {activeTab === 'settings' && (
        <ProjectSettings
          project={project}
          setShouldRefresh={setShouldRefresh}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  )
}
