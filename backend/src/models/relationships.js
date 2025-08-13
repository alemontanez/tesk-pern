import {
  Board,
  BoardColor,
  Comment,
  Membership,
  Project,
  Role,
  Task,
  TaskPriority,
  TaskStatus,
  User,
} from './index.js'

// Relaciones User
User.hasMany(Task, {
  foreignKey: {
    name: 'createdBy',
    allowNull: false
  },
  onDelete: 'SET NULL'
})
Task.belongsTo(User, {
  as: 'creatorUser',
  foreignKey: {
    name: 'createdBy',
    allowNull: false
  }
})

User.hasMany(Task, {
  foreignKey: {
    name: 'assignedTo',
    allowNull: false
  },
  onDelete: 'SET NULL'
})
Task.belongsTo(User, {
  as: 'assignedUser',
  foreignKey: {
    name: 'assignedTo',
    allowNull: false
  }
})

User.hasMany(Membership, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE',
  hooks: true
})
Membership.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
})

User.hasMany(Project, {
  foreignKey: {
    name: 'ownerId',
    allowNull: false
  },
  onDelete: 'CASCADE',
  hooks: true
})
Project.belongsTo(User, {
  as: 'owner',
  foreignKey: {
    name: 'ownerId',
    allowNull: false
  }
})

User.hasMany(Comment, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  onDelete: 'SET NULL'
})
Comment.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
})

// Relaciones Task
Task.hasMany(Comment, {
  foreignKey: {
    name: 'taskId',
    allowNull: false
  },
  onDelete: 'CASCADE'
})
Comment.belongsTo(Task, {
  foreignKey: {
    name: 'taskId',
    allowNull: false
  }
})

// Relaciones Project
Project.hasMany(Membership, {
  foreignKey: {
    name: 'projectId',
    allowNull: false
  },
  onDelete: 'CASCADE',
  hooks: true
})
Membership.belongsTo(Project, {
  foreignKey: {
    name: 'projectId',
    allowNull: false
  },
})

Project.hasMany(Board, {
  foreignKey: {
    name: 'projectId',
    allowNull: false
  },
  onDelete: 'CASCADE',
  hooks: true
})
Board.belongsTo(Project, {
  foreignKey: {
    name: 'projectId',
    allowNull: false
  }
})

// Relaciones Role
Role.hasMany(Membership, {
  foreignKey: {
    name: 'roleId',
    allowNull: false
  }
})
Membership.belongsTo(Role, {
  foreignKey: {
    name: 'roleId',
    allowNull: false
  },
  as: 'role'
})

// Relaciones Board
Board.hasMany(Task, {
  foreignKey: {
    name: 'boardId',
    allowNull: false
  },
  onDelete: 'CASCADE',
  hooks: true
})
Task.belongsTo(Board, {
  foreignKey: {
    name: 'boardId',
    allowNull: false
  }
})

// Relaciones BoardColor
BoardColor.hasMany(Board, {
  foreignKey: {
    name: 'colorId',
    allowNull: false
  }
})
Board.belongsTo(BoardColor, {
  foreignKey: {
    name: 'colorId',
    allowNull: false,
    defaultValue: 1
  }
})

// Relaciones TaskPriority
TaskPriority.hasMany(Task, {
  foreignKey: {
    name: 'priorityId',
    allowNull: false
  }
})
Task.belongsTo(TaskPriority, {
  foreignKey: {
    name: 'priorityId',
    allowNull: false
  }
})

// Relaciones TaskStatus
TaskStatus.hasMany(Task, {
  foreignKey: {
    name: 'statusId',
    allowNull: false
  }
})
Task.belongsTo(TaskStatus, {
  foreignKey: {
    name: 'statusId',
    allowNull: false
  }
})