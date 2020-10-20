//Imports
  import Sequelize from 'sequelize';

const connection = new Sequelize('games', 'root', 'root',{
  host: 'localhost', 
  dialect: 'mysql'
})

export default connection;