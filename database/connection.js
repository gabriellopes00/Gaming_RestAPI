//Imports
  import Sequelize from 'sequelize';

const connection = new Sequelize('your_db', 'your_user', 'your_user_password',{
  host: 'your_host', 
  dialect: 'mysql'
})

export default connection;