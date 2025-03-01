import { createCommentService, deleteCommentService, getCommentsService, updateCommentService } from '../services/comment.service.js'

export const getComments = async (req, res) => {
  const { taskId } = req.params
  try {
    const comments = await getCommentsService(taskId)
    res.status(200).json(comments)
  } catch (error) {
    console.log(error)
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const createComment = async (req, res) => {
  const { taskId } = req.params
  const { id } = req.user
  const { content } = req.body
  try {
    const comment = await createCommentService(id, taskId, content)
    res.status(201).json({
      message: 'Comment created successfully',
      comment
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const updateComment = async (req, res) => {
  const { commentId } = req.params
  const { content } = req.body
  try {
    await updateCommentService(commentId, content)
    res.status(200).json({ message: 'Comment updated successfully' })
  } catch (error) {
    console.log(error)
    if (error.message === 'Comment not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}

export const deleteComment = async (req, res) => {
  const { commentId } = req.params
  try {
    await deleteCommentService(commentId)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    if (error.message === 'Comment not found') {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
  }
}