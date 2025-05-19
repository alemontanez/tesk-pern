import { createContext, useContext, useState } from 'react'
import { createTask, deleteTaskRequest, getTask, updateTaskRequest } from '../services/task'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

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
  const navigate = useNavigate()

  const createNewTask = async (projectId, boardId, taskData) => {
    try {
      setErrors([])
      await createTask(projectId, boardId, taskData)
      toast.success('Tarea creada con éxito')
    } catch (error) {
      toast.error('No se pudo crear la tarea')
      setErrors(error.response.data.error)
    }
  }

  const fetchTask = async (projectId, boardId, taskId) => {
    try {
      setErrors([])
      const res = await getTask(projectId, boardId, taskId)
      return res.data
    } catch (error) {
      navigate(`/dashboard/projects/${projectId}/boards/${boardId}`)
      toast.error('No se pudo encontrar la tarea')
      setErrors(error.response.data.error)
    }
  }

  const updateTask = async (projectId, boardId, taskId, taskData) => {
    try {
      setErrors([])
      await updateTaskRequest(projectId, boardId, taskId, taskData)
      toast.success('Tarea actualizada con éxito')
    } catch (error) {
      toast.error('Error al intentar actualizar la tarea')
      setErrors(error.response.data.error)
    }
  }

  const deleteTask = async (projectId, boardId, taskId) => {
    try {
      setErrors([])
      await deleteTaskRequest(projectId, boardId, taskId)
      toast.success('Tarea eliminada con éxito')
    } catch (error) {
      toast.error('Error al intentar eliminar la tarea')
      setErrors(error.response.data.error)
    } 
  }

  return (
    <TaskContext.Provider value={{
      createNewTask,
      fetchTask,
      updateTask,
      deleteTask,
      errors
    }}>
      {children}
    </TaskContext.Provider>
  )
}