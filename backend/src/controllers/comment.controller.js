import {
  addNewComment,
  removeComment,
  editCommentContent
} from '../services/comment.service.js'


export const createComment = async (req, res) => {
  const { projectId, boardId, taskId } = req.params
  const userId = req.user.id
  const { content } = req.body
  try {
    const comment = await addNewComment(userId, projectId, boardId, taskId, content)
    res.status(201).json({
      message: 'Comment created successfully',
      comment
    })
  } catch (error) {
    console.log(error)
    if (error.message === 'Forbidden') {
      return res.status(403).json({ error: ['Access denied: insufficient permissions'] })
    }
    if (error.message === 'Task not found' || error.message === 'Board not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const updateComment = async (req, res) => {
  const { projectId, boardId, taskId, commentId } = req.params
  const userId = req.user.id
  const { content } = req.body
  try {
    await editCommentContent(userId, projectId, boardId, taskId, commentId, content)
    res.status(200).json({ message: 'Comment updated successfully' })
  } catch (error) {
    console.log(error)
    if (error.message === 'Forbidden') {
      return res.status(403).json({ error: ['Access denied: insufficient permissions'] })
    }
    if (error.message === 'Task not found' || error.message === 'Board not found' || error.message === 'Comment not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}

export const deleteComment = async (req, res) => {
  const { projectId, boardId, taskId, commentId } = req.params
  const userId = req.user.id
  try {
    await removeComment(userId, projectId, boardId, taskId, commentId)
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    if (error.message === 'Forbidden') {
      return res.status(403).json({ error: ['Access denied: insufficient permissions'] })
    }
    if (error.message === 'Task not found' || error.message === 'Board not found' || error.message === 'Comment not found') {
      return res.status(404).json({ error: [error.message] })
    }
    return res.status(500).json({ error: ['Internal error'] })
  }
}