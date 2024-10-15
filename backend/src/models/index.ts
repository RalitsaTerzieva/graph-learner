import { Sequelize } from 'sequelize'

import { $db } from '../../config'
import { IModels } from '../types/interfaces'

// Db Connection
const { dialect, port, host, database, username, password } = $db

// Connecting to the database
const uri = `${dialect}://${username}:${password}@${host}:${port}/${database}`
const sequelize = new Sequelize(uri)

// Models
const models: IModels = {
  User: require('./User').default(sequelize, Sequelize),
  sequelize
}

export default models