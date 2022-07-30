'use strict'
import { Sequelize, DataTypes } from 'sequelize'

import logger from '../utilities/logger.js'
import config from '../config'
import { shutDown } from '../utilities/serverUtils'

const sequelize = new Sequelize(config.DATABASE.PLANETSCALE.URI, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

try {
  await sequelize.authenticate()
  console.log('PlanetScale Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default sequelize
