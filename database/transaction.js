import sequelize from './index.js'
import { DataTypes } from 'sequelize'
import config from '../config'
import User from './user.js'
import Event from './events.js'
import Ticket from './tickets'

const Schema = sequelize.Schema

const transactionSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID
  },
  eventId: {
    type: DataTypes.UUID
  },
  address: {
    type: DataTypes.STRING
  },
  txHash: DataTypes.STRING,
  passId: DataTypes.STRING,
  ticketId: {
    type: DataTypes.UUID
  },
  paymentType: {
    type: DataTypes.ENUM(['CRYPTO', 'FIAT'])
  },
  type: {
    type: DataTypes.ENUM(['MINT', 'SELL', 'BUY', 'AUCTION', 'BOTH', 'BID', 'OTHER']),
    defaultValue: 'OTHER'
  },
  status: {
    type: DataTypes.ENUM(['NONE', 'FAILED', 'SUCCESS', 'PROCESSING']),
    defaultValue: 'NONE'
  },

  error: {
    type: DataTypes.STRING
  }

}

const Transaction = sequelize.define('transactions', transactionSchema)

Transaction.prototype.saveTransactionHash = async function (hash) {
  try {
    this.txHash = hash
    await this.save()
    return this
  } catch (err) {
    throw new Error(err)
  }
}

Transaction.prototype.setFailed = async function () {
  try {
    this.status = 'FAILED'
    await this.save()
    const user = await User.findById(this.userId)
    user.transactions.push(this._id)
    await user.save()
    return this
  } catch (err) {
    throw new Error(err)
  }
}

Transaction.prototype.setSuccess = async function () {
  try {
    this.status = 'SUCCESS'
    const ticket = await new Ticket({ issuedTo: this.userId, issuedToAddress: this.address, passId: this.passId, eventId: this.eventId, status: 'MINTED' }).save()
    this.ticketId = ticket._id
    await this.save()
    const user = await User.findById(this.userId)
    const event = await Event.findById(this.eventId)
    user.transactions.push(this._id)
    user.ticketsBrought.push(this.ticketId)
    await user.save()
    event.minted += 1
    event.ticketsMinted.push(this.ticketId)
    await event.save()
    return this
  } catch (err) {
    throw new Error(err)
  }
}

Transaction.prototype.setProcessing = async function () {
  try {
    this.status = 'PROCESSING'
    await this.save()
    return this
  } catch (err) {
    throw new Error(err)
  }
}

export default Transaction
