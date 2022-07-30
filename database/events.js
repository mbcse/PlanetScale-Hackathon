import sequelize from './index.js'
import { DataTypes } from 'sequelize'
import config from '../config'

const eventSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  createdBy: {
    type: DataTypes.UUID,
    required: true
  },
  stock: {
    type: DataTypes.INTEGER,
    required: true
  },
  minted: {
    type: DataTypes.INTEGER,
    required: true,
    default: 0
  },
  eventName: {
    type: DataTypes.STRING,
    trim: true,
    required: true
  },
  eventOrganizer: {
    type: DataTypes.STRING,
    trim: true,
    required: true
  },
  eventPassImage: {
    type: DataTypes.STRING,
    trim: true,
    required: true
  },
  eventTicketPrice: {
    type: DataTypes.STRING,
    trim: true,
    required: true
  },
  eventTicketBurnValue: {
    type: DataTypes.STRING,
    trim: true,
    required: true
  },
  eventStartDate: {
    type: DataTypes.STRING,
    trim: true,
    required: true
  },
  eventEndDate: {
    type: DataTypes.STRING,
    trim: true,
    required: true
  },
  ticketsMinted: DataTypes.JSON(
    {
      type: DataTypes.UUID,
      references: {
        model: 'tickets',
        key: 'id'
      }
    })
}
const Event = sequelize.define('events', eventSchema)
export default Event
