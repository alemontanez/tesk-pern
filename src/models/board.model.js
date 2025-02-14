import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database'

class Board extends Model {}

Board.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status_name: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  label_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  sequelize,
  modelName: 'Board',
  tableName: 'boards',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['status_name']
    }
  ]
})

export default Board