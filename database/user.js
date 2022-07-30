import validator from 'validator'
import sequelize from './index.js'
import { DataTypes } from 'sequelize'
import config from '../config'

const userSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    trim: true
  },

  email: {
    type: DataTypes.STRING,
    trim: true,
    required: true,
    unique: true,
    validate (email) {
      if (!validator.isEmail(email)) {
        throw new Error('Email Not Valid!' + email)
      }
    }
  },

  nounce: {
    type: DataTypes.INTEGER,
    required: true,
    default: 0
  },

  events: DataTypes.JSON({
    type: DataTypes.ARRAY,
    references: {
      model: 'events',
      key: 'id'
    }
  }),

  ticketsBrought: DataTypes.JSON({
    type: DataTypes.ARRAY,
    references: {
      model: 'tickets',
      key: 'id'
    }
  }),

  ticketsBurned: DataTypes.JSON({
    type: DataTypes.ARRAY,
    references: {
      model: 'tickets',
      key: 'id'
    }
  }),

  status: {
    type: DataTypes.STRING,
    required: true,
    defaultValue: 'ACTIVE'
  },

  defaultWallet: {
    type: DataTypes.UUID,
    required: true
  },

  accountsConnected: DataTypes.JSON(DataTypes.STRING),

  transactions: DataTypes.JSON({
    type: DataTypes.UUID,
    references: {
      model: 'transactions',
      key: 'id'
    }
  }),

  payments: DataTypes.JSON(
    {
      type: DataTypes.UUID,
      references: {
        model: 'payments',
        key: 'id'
      }
    }
  )

}

const User = sequelize.define('users', userSchema)
export default User
