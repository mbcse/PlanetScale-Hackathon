import sequelize from './index.js'
import { DataTypes } from 'sequelize'
import config from '../config'

const walletSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  type: {
    type: DataTypes.STRING,
    required: true
  },
  publicKey: {
    type: DataTypes.STRING,
    trim: true
  },

  address: {
    type: DataTypes.STRING,
    required: true,
    trim: true
  },

  encryptedWalletJson: {
    type: DataTypes.JSON
  },

  networkType: {
    type: DataTypes.STRING,
    required: true
  }

}

const Wallet = sequelize.define('wallets', walletSchema)
export default Wallet
