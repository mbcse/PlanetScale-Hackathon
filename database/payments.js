import sequelize from './index.js'
import { DataTypes } from 'sequelize'
import config from '../config'

const paymentSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  payId: {
    type: DataTypes.INTEGER,
    required: true
  },
  userId: {
    type: DataTypes.UUID
  },
  address: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.ENUM(['CRYPTO', 'FIAT']),
    required: true
  },
  amount: {
    type: DataTypes.INTEGER,
    required: true
  },
  eventId: {
    type: DataTypes.UUID,
    required: true
  }
}

const Payments = sequelize.define('payments', paymentSchema)
export default Payments
