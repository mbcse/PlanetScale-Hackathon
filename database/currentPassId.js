import sequelize from './index.js'
import { DataTypes } from 'sequelize'
import config from '../config'

const currentPassIdSchema = {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  passId: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}

const CurrentPassId = sequelize.define('currentPassIds', currentPassIdSchema)

sequelize.sync({ force: true })

export default CurrentPassId
