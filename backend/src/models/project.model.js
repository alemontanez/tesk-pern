import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database.js'
import Membership from './membership.model.js'
import Role from './role.model.js'
import Board from './board.model.js'

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
  },
  description: {
    type: DataTypes.STRING(255),
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'owner_id',
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
  await Membership.create({
    userId: project.ownerId,
    projectId: project.id,
    roleId: ownerRoleId.id
  })
})

Project.addHook('afterCreate', async (project) => {
  const defaultBoards = ['Planificación General', 'Backlog e Ideas']
  defaultBoards.forEach((status) => {
    Board.create({
      name: status,
      projectId: project.id,
    })
  })
})

export default Project