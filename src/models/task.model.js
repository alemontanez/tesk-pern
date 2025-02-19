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
  created_by: {
    type: DataTypes.UUID,
    allowNull: false
  },
  assigned_to: {
    type: DataTypes.UUID,
  },
  board_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  priority_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  label_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 }
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

Task.addHook('beforeCreate', async (task) => {
  if (!task.position) {
    const maxPosition = await Task.max('position', {
      where: { board_id: task.board_id }
    })
    task.position = (maxPosition || 0) + 1
  }
})

export default Task