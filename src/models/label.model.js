import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database.js'

class Label extends Model {}

Label.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  color: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'Label',
  tableName: 'labels',
})

export default Label