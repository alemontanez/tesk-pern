import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database.js'

class TaskPriority extends Model {}

TaskPriority.init({
  id: {
    type: DataTypes.SMALLINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'TaskPriority',
  tableName: 'task_priorities',
})

export default TaskPriority