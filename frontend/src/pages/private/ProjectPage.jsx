import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProject } from '../../context/ProjectContext'

export default function ProjectPage() {

  const { projectId } = useParams()
  const { fetchProject } = useProject()
  const [project, setProject] = useState({})

  useEffect(() => {
    async function getProject(projectId) {
      const project = await fetchProject(projectId)
      setProject(project.data)
    }
    getProject(projectId)
  }, [])

  return (
    <>
      <h2>{project.name}</h2>
      <span>{project.description}</span>
    </>
  )
}
