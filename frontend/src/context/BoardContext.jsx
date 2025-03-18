import { useContext, createContext } from 'react'
import { getBoard } from '../services/board'

export const BoardContext = createContext()

export const useBoard = () => {
  const context = useContext(BoardContext)
  if (!context) {
    throw new Error('UseBoard must be used within an BoardProvider')
  }
  return context
}

export const BoardProvider = ({ children }) => {

  const fetchBoard = async (projectId, boardId) => {
    try {
      const res = await getBoard(projectId, boardId)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <BoardContext.Provider value={{
      fetchBoard
    }}>
      {children}
    </BoardContext.Provider>
  )
}