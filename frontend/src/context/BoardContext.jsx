import { useContext, createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { createBoard, getBoard, searchBoardTasks } from '../services/board'

export const BoardContext = createContext()

export const useBoard = () => {
  const context = useContext(BoardContext)
  if (!context) {
    throw new Error('UseBoard must be used within an BoardProvider')
  }
  return context
}

export const BoardProvider = ({ children }) => {

  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  const fetchBoard = async (projectId, boardId, sortBy, order) => {
    try {
      setErrors([])
      const res = await getBoard(projectId, boardId, sortBy, order)
      return res.data
    } catch (error) {
      toast.error('Error al intentar buscar el tablero')
      navigate(`/dashboard/projects/${projectId}`)
      setErrors(error.response.data.error)
    }
  }

  const createNewBoard = async (projectId, projectData) => {
    try {
      setErrors([])
      await createBoard(projectId, projectData)
      toast.success('Nuevo tablero creado correctamente')
    } catch (error) {
      setErrors(error.response.data.error)
      toast.error('Error al intentar crear el tablero')
      setErrors(error.response.data.error)
    }
  }

  const searchTasks = async (projectId, boardId, query, sortBy, order) => {
    try {
      setErrors([])
      const res = await searchBoardTasks(projectId, boardId, query, sortBy, order)
      return res.data
    } catch (error) {
      toast.error('Error al buscar las tareas')
      setErrors(error.response.data.error)
    }
  }

  const clearErrors = () => {
    setErrors([])
  }

  return (
    <BoardContext.Provider value={{
      fetchBoard,
      createNewBoard,
      clearErrors,
      searchTasks,
      errors
    }}>
      {children}
    </BoardContext.Provider>
  )
}