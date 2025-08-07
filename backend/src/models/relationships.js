import User from './user.model.js'
import Task from './task.model.js'
import Project from './project.model.js'
import Membership from './membership.model.js'
import Role from './role.model.js'
import Board from './board.model.js'
import Comment from './comment.model.js'
import TaskPriority from './taskPriority.model.js'
import BoardColor from './boardColor.model.js'

// Relaciones User
User.hasMany(Task, { foreignKey: 'created_by', onDelete: 'SET NULL' })
Task.belongsTo(User, { foreignKey: 'created_by', as: 'createdBy' })

User.hasMany(Task, { foreignKey: 'assigned_to', onDelete: 'SET NULL' })
Task.belongsTo(User, { foreignKey: 'assigned_to', as: 'assignedTo' })

User.hasMany(Membership, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: true })
Membership.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Project, { foreignKey: 'owner_id', onDelete: 'CASCADE', hooks: true })
Project.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' })

User.hasMany(Comment, { foreignKey: 'user_id', onDelete: 'SET NULL' })
Comment.belongsTo(User, { foreignKey: 'user_id' })

// Relaciones Task
Task.hasMany(Comment, { foreignKey: 'task_id', onDelete: 'CASCADE' })
Comment.belongsTo(Task, { foreignKey: 'task_id' })

// Relaciones Project
Project.hasMany(Membership, { foreignKey: 'project_id', onDelete: 'CASCADE', hooks: true })
Membership.belongsTo(Project, { foreignKey: 'project_id'})

Project.hasMany(Board, { foreignKey: 'project_id', onDelete: 'CASCADE', hooks: true })
Board.belongsTo(Project, { foreignKey: 'project_id' })

// Relaciones Role
Role.hasMany(Membership, { foreignKey: 'role_id' })
Membership.belongsTo(Role, { foreignKey: 'role_id', as: 'role' })

// Relaciones Board
Board.hasMany(Task, { foreignKey: 'board_id', onDelete: 'CASCADE', hooks: true })
Task.belongsTo(Board, { foreignKey: 'board_id' })

// Relaciones Label -> BoardColor
BoardColor.hasMany(Board, { foreignKey: 'color_id' })
Board.belongsTo(BoardColor, { foreignKey: 'color_id' })

// Relaciones TaskPriority
TaskPriority.hasMany(Task, { foreignKey: 'priority_id' })
Task.belongsTo(TaskPriority, { foreignKey: 'priority_id' })