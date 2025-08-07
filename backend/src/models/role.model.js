import { DataTypes, Model} from 'sequelize'
import { sequelize } from '../config/database.js'

class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.INTEGER, // Cuando cambie esto, cambiar en el modelo Membership
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true
  },
  can_view: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  can_edit: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  can_manage: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  is_owner: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'Role',
  tableName: 'roles'
})

export default Role