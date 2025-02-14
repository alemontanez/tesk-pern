import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database'

class Task extends Model {}

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
    type: DataTypes.INTEGER,
    allowNull: false
  },
  assigned_to: {
    type: DataTypes.INTEGER,
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
    defaultValue: this.id
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
    }
  ]
})

export default Task