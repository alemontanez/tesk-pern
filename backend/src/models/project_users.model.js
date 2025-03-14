import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database.js'

class Project_users extends Model {}

Project_users.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Project_users',
  tableName: 'project_users',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      name: 'unique_user_project',
      unique: true,
      fields: ['user_id', 'project_id'] // Un usuario no puede estar 2 veces en el mismo proyecto
    }
  ]
})

export default Project_users