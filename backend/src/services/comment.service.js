import Board from '../models/board.model.js'
import Task from '../models/task.model.js'
import Comment from '../models/comment.model.js'


export const addNewComment = async (userId, projectId, boardId, taskId, content) => {
  const board = await Board.findOne({
    where: {
      id: boardId,
      project_id: projectId
    }
  })
  if (!board) throw new Error('Board not found')
  const task = await Task.findOne({
    where: {
      id: taskId,
      board_id: boardId
    }
  })
  if (!task) throw new Error('Task not found')
  const comment = await Comment.create({
    content,
    task_id: taskId,
    user_id: userId
  })
  return comment
}

export const editCommentContent = async (userId, projectId, boardId, taskId, commentId, content) => {
  const board = await Board.findOne({
    where: {
      id: boardId,
      project_id: projectId
    }
  })
  if (!board) throw new Error('Board not found')
  const task = await Task.findOne({
    where: {
      id: taskId,
      board_id: boardId
    }
  })
  if (!task) throw new Error('Task not found')

  const comment = await Comment.findOne({
    where: {
      id: commentId,
      task_id: taskId
    }
  })
  if (!comment) throw new Error('Comment not found')
  await comment.update({
    content,
    user_id: userId
  })
}

export const removeComment = async (projectId, boardId, taskId, commentId) => {
  const board = await Board.findOne({
    where: {
      id: boardId,
      project_id: projectId
    }
  })
  if (!board) throw new Error('Board not found')
  const task = await Task.findOne({
    where: {
      id: taskId,
      board_id: boardId
    }
  })
  if (!task) throw new Error('Task not found')

  const comment = await Comment.findOne({
    where: {
      id: commentId,
      task_id: taskId
    }
  })
  if (!comment) throw new Error('Comment not found')
  await comment.destroy({ force: true })
}