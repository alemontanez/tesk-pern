import Comment from '../models/comment.model.js'
import Task from '../models/task.model.js'


export const getCommentsService = async (taskId) => {
  const task = await Task.findByPk(taskId)
  if (!task) throw new Error('Task not found')

  const comments = await Comment.findAll({ where: { task_id: taskId } })
  return comments
}

export const createCommentService = async (userId, taskId, content) => {
  const task = await Task.findByPk(taskId)
  if (!task) throw new Error('Task not found')

  const comment = await Comment.create({
    content,
    task_id: taskId,
    user_id: userId
  })
  return comment
}

export const updateCommentService = async (id, content) => {
  const comment = await Comment.findByPk(id)
  if (!comment) throw new Error('Comment not found')

  await comment.update({
    content
  })
}

export const deleteCommentService = async (id) => {
  const comment = await Comment.findByPk(id)
  if (!comment) throw new Error('Comment not found')

  await comment.destroy({ force: true })
}