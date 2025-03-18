import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProject } from '../../context/ProjectContext'

export default function ProjectPage() {

  const { projectId } = useParams()
  const { fetchProject } = useProject()
  const [project, setProject] = useState({})
  const [boards, setBoards] = useState([])

  useEffect(() => {
    async function getProject(projectId) {
      const project = await fetchProject(projectId)
      setProject(project.data)
      setBoards(project.data.Boards)
    }
    getProject(projectId)
  }, [])

  return (
    <>
      <h2>{project.name}</h2>
      <span>{project.description}</span>
      <hr />
      {boards.map((board) => (
        <div key={board.id}>
          <h3>{board.name}</h3>
          <span>12 tareas</span>
          <Link to={`/dashboard/projects/${project.id}/boards/${board.id}`}>View Board</Link>
          <hr />
        </div>
      ))}
    </>
  )
}
