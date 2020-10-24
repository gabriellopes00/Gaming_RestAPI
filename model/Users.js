//Imports
import { STRING } from 'sequelize';
import dbConnection from '../database/connection'

const User = dbConnection.define('user', {
  name: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING,
    allowNull: false
  }
}) 

/*  User.sync({force: false})  */

export default User;