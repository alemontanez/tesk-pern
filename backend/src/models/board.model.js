import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database.js'

class Board extends Model {}

Board.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Board',
  tableName: 'boards',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      fields: ['name']
    }
  ]
})

export default Board