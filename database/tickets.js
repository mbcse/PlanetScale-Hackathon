import sequelize from './index.js'
import { DataTypes } from 'sequelize'
import config from '../config'

const ticketSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  issuedTo: {
    type: DataTypes.UUID,
    required: true
  },
  issuedToAddress: {
    type: DataTypes.STRING,
    required: true
  },
  passId: {
    type: DataTypes.INTEGER,
    required: true
  },
  eventId: {
    type: DataTypes.UUID,
    required: true
  },
  status: {
    type: DataTypes.ENUM(['NONE', 'MINTED', 'CHECKEDIN', 'BANNED', 'CANCELLED']),
    defaultValue: 'NONE'
  }
}

const Tickets = sequelize.define('tickets', ticketSchema)
export default Tickets
