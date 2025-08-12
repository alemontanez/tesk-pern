import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database.js'

class TaskStatus extends Model {}

TaskStatus.init({
  id: {
    type: DataTypes.SMALLINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'TaskStatus',
  tableName: 'task_status',
})

export default TaskStatus