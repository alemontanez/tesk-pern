import { useContext, createContext, useState } from 'react'
import { createBoard, getBoard } from '../services/board'
import Swal from 'sweetalert2'

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

  const fetchBoard = async (projectId, boardId) => {
    try {
      const res = await getBoard(projectId, boardId)
      return res.data
    } catch (error) {
      setErrors(error.response.data.error)
    }
  }

  const createNewBoard = async (projectId, projectData) => {
    try {
      await createBoard(projectId, projectData)
    } catch (error) {
      setErrors(error.response.data.error)
      Swal.fire({
        title: 'Error de Permisos',
        text: error.response.data.error,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        allowEscapeKey: false,
      })
      setErrors([])
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
      errors
    }}>
      {children}
    </BoardContext.Provider>
  )
}