import { createContext, useContext, useState } from 'react'
import { createTask, getTask, updateTaskRequest } from '../services/task'

const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('UseTask must be used within an TaskProvider')
  }
  return context
}

export const TaskProvider = ({ children }) => {

  const [errors, setErrors] = useState([])

  const createNewTask = async (projectId, boardId, taskData) => {
    try {
      await createTask(projectId, boardId, taskData)
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.error)
    }
  }

  const fetchTask = async (projectId, boardId, taskId) => {
    try {
      const res = await getTask(projectId, boardId, taskId)
      return res.data
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.error)
    }
  }

  const updateTask = async (projectId, boardId, taskId, taskData) => {
    try {
      console.log(taskData)
      await updateTaskRequest(projectId, boardId, taskId, taskData)
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.error)
    }
  }

  return (
    <TaskContext.Provider value={{
      createNewTask,
      fetchTask,
      updateTask,
      errors
    }}>
      {children}
    </TaskContext.Provider>
  )
}