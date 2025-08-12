import { DataTypes, Model} from 'sequelize'
import { sequelize } from '../config/database.js'

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      fields: ['task_id']
    },
    {
      fields: ['user_id']
    }
  ]
})

export default Comment