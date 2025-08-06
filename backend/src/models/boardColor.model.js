import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database.js'

class BoardColor extends Model {}

BoardColor.init({
  id: {
    type: DataTypes.SMALLINT,
    autoIncrement: true,
    primaryKey: true
  },
  color: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  hexCode: {
    type: DataTypes.STRING(7),
    unique: true,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  underscored: true,
  modelName: 'BoardColor',
  tableName: 'board_colors',
})

export default BoardColor