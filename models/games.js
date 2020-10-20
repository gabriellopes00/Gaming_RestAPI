//Imports
  import Sequelize from 'sequelize'
  import dbConnection from '../database/connection'

const Games = dbConnection.define('games', {
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
  }
})

Games.sync({foce: false})

export default Games;

