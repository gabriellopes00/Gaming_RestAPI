//Imports
  import Sequelize from 'sequelize'
  import dbConnection from '../database/connection'

const Games = dbConnection.define('games', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER ,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  company:{
    type: Sequelize.STRING,
    allowNull: true
  },
  imageLink:{
    type: Sequelize.STRING,
    allowNull: false
  },
  description:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  officialWebsiteLink:{
    type: Sequelize.STRING,
    allowNull: true
  },
  createdAt:{
    type: Sequelize.DATE,
    allowNull: false
  },
  updatedAt:{
    type: Sequelize.DATE,
    allowNull: false
  }
})
  /* Games.sync({force: true}) */

export default Games;

