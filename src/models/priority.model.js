import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database.js'

class Priority extends Model {}

Priority.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(30),
    unique: true,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Priority',
  tableName: 'priorities',
})

export default Priority