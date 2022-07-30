import validator from 'validator'
import sequelize from './index.js'
import { DataTypes } from 'sequelize'
import config from '../config'
import User from './user.js'

const emailotpSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    constraints: false

  },
  email: {
    type: DataTypes.STRING,
    required: true
  },
  otp: {
    type: DataTypes.STRING,
    required: true
  },

  secret: {
    type: DataTypes.STRING,
    required: true
  }
}

const emailotp = sequelize.define('emailotp', emailotpSchema)
// emailotp.belongsTo('users', {
//   foreignKey: 'userId',
//   constraints: false
// })
export default emailotp
