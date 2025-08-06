import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database.js'

class Membership extends Model {}

Membership.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Membership',
  tableName: 'memberships',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      name: 'unique_membership',
      unique: true,
      fields: ['user_id', 'project_id'] // Un usuario no puede estar 2 veces en el mismo proyecto
    }
  ]
})

export default Membership