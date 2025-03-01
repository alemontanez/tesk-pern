import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database.js'
import Project_users from './project_users.model.js'
import Role from './role.model.js'

class Project extends Model {}

Project.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING(255),
  },
  owner_id: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Project',
  tableName: 'projects',
  timestamps: true,
  underscored: true
})

Project.addHook('afterCreate', async (project) => {
  const ownerRoleId = await Role.findOne({
    where: { name: 'owner'}
  })
  await Project_users.create({
    user_id: project.owner_id,
    project_id: project.id,
    role_id: ownerRoleId.id
  })
})

export default Project