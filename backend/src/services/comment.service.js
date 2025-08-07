import Board from '../models/board.model.js'
import Task from '../models/task.model.js'
import Comment from '../models/comment.model.js'

export const addNewComment = async (userId, projectId, boardId, taskId, content) => {
  const board = await Board.findOne({
    where: {
      id: boardId,
      projectId
    }
  })
  if (!board) throw new Error('Board not found')
  const task = await Task.findOne({
    where: {
      id: taskId,
      boardId
    }
  })
  if (!task) throw new Error('Task not found')
  const comment = await Comment.create({
    content,
    taskId,
    userId
  })
  return comment
}

export const editCommentContent = async (userId, projectId, boardId, taskId, commentId, content) => {
  const board = await Board.findOne({
    where: {
      id: boardId,
      projectId
    }
  })
  if (!board) throw new Error('Board not found')
  const task = await Task.findOne({
    where: {
      id: taskId,
      boardId
    }
  })
  if (!task) throw new Error('Task not found')

  const comment = await Comment.findOne({
    where: {
      id: commentId,
      taskId
    }
  })
  if (!comment) throw new Error('Comment not found')
  await comment.update({
    content,
    userId
  })
}

export const removeComment = async (projectId, boardId, taskId, commentId) => {
  const board = await Board.findOne({
    where: {
      id: boardId,
      projectId
    }
  })
  if (!board) throw new Error('Board not found')
  const task = await Task.findOne({
    where: {
      id: taskId,
      boardId
    }
  })
  if (!task) throw new Error('Task not found')

  const comment = await Comment.findOne({
    where: {
      id: commentId,
      taskId
    }
  })
  if (!comment) throw new Error('Comment not found')
  await comment.destroy({ force: true })
}