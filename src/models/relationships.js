import User from './user.model.js'
import Task from './task.model.js'
import Project from './project.model.js'
import Project_users from './project_users.model.js'
import Role from './role.model.js'
import Board from './board.model.js'
import Comment from './comment.model.js'
import Priority from './priority.model.js'
import Label from './label.model.js'

// Relaciones User
User.hasMany(Task, { foreignKey: 'created_by', onDelete: 'SET NULL' })
Task.belongsTo(User, { foreignKey: 'created_by' })

User.hasMany(Task, { foreignKey: 'assigned_to', onDelete: 'SET NULL' })
Task.belongsTo(User, { foreignKey: 'assigned_to' })

User.hasMany(Project_users, { foreignKey: 'user_id', onDelete: 'CASCADE', hooks: true })
Project_users.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Project, { foreignKey: 'owner_id', onDelete: 'CASCADE', hooks: true })
Project.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' })

User.hasMany(Comment, { foreignKey: 'user_id', onDelete: 'SET NULL' })
Comment.belongsTo(User, { foreignKey: 'user_id' })

// Relaciones Task
Task.hasMany(Comment, { foreignKey: 'task_id', onDelete: 'CASCADE' })
Comment.belongsTo(Task, { foreignKey: 'task_id' })

// Relaciones Project
Project.hasMany(Project_users, { foreignKey: 'project_id', onDelete: 'CASCADE', hooks: true })
Project_users.belongsTo(Project, { foreignKey: 'project_id' })

Project.hasMany(Board, { foreignKey: 'project_id', onDelete: 'CASCADE', hooks: true })
Board.belongsTo(Project, { foreignKey: 'project_id' })

// Relaciones Role
Role.hasMany(Project_users, { foreignKey: 'role_id' })
Project_users.belongsTo(Role, { foreignKey: 'role_id', as: 'role' })

// Relaciones Board
Board.hasMany(Task, { foreignKey: 'board_id', onDelete: 'CASCADE', hooks: true })
Task.belongsTo(Board, { foreignKey: 'board_id' })

// Relaciones Label
Label.hasMany(Task, { foreignKey: 'label_id' })
Task.belongsTo(Label, { foreignKey: 'label_id' })

Label.hasMany(Board, { foreignKey: 'label_id' })
Board.belongsTo(Label, { foreignKey: 'label_id' })

// Relaciones Priority
Priority.hasMany(Task, { foreignKey: 'priority_id' })
Task.belongsTo(Priority, { foreignKey: 'priority_id' })