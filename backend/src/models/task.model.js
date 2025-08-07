import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database.js'

class Task extends Model { }

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.UUID,
  },
  assignedTo: {
    type: DataTypes.UUID,
  },
  boardId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  priorityId: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  statusId: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1 // Corregir esto cuando se implemente la funcionalidad de estados
  }
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'tasks',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      fields: ['created_by']
    },
    {
      fields: ['assigned_to']
    },
    {
      fields: ['board_id']
    },
    {
      fields: ['priority_id']
    },
    {
      fields: ['due_date']
    }
  ]
})

export default Task