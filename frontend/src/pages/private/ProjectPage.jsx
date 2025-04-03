import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProject } from '../../context/ProjectContext'
import BoardsPanel from '../../components/BoardsPanel'
import '../../styles/ProjectPage.css'
import MembersPanel from '../../components/MembersPanel'

export default function ProjectPage() {
  const { projectId } = useParams()
  const { fetchProject, searchBoards, getMembers, errors } = useProject()
  const [project, setProject] = useState({})
  const [boards, setBoards] = useState([])
  const [timer, setTimer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('boards')

  useEffect(() => {
    async function getProject(id) {
      const res = await fetchProject(id)
      setProject(res.data)
      setBoards(res.data.Boards)
    }
    if (activeTab === 'boards') {
      getProject(projectId)
    }
  }, [projectId, activeTab])

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

  if (errors.length > 0) {
    return (
      <div>
        <Link to={'/dashboard'} className='project-go-back'>
          ⬅️ Volver al dashboard
        </Link>
        {errors.map((error, i) => (
          <h2 key={i}>{error}</h2>
        ))}
      </div>
    )
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
            className={`tab-button ${activeTab === 'boards' ? 'active' : ''}`}
            onClick={() => setActiveTab('boards')}
          >
            Tableros
          </button>
          <button
            className={`tab-button ${activeTab === 'members' ? 'active' : ''}`}
            onClick={() => setActiveTab('members')}
          >
            Miembros
          </button>
          <button
            className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Ajustes
          </button>
        </div>
      </div>

      {activeTab === 'boards' && (
        <BoardsPanel
          boards={boards}
          loading={loading}
          projectId={projectId}
          onSearch={handleSearch}
        />
      )}
      {activeTab === 'members' && (
        <MembersPanel
          projectId={projectId}
          getMembers={getMembers}
        />
      )}
      {activeTab === 'settings' && (
        <p>settings</p>
      )}
    </div>
  )
}
