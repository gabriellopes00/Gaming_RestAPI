//Imports
  import Sequelize from 'sequelize';

  import dbInformation from '../node_modules/information/index';
  //Here i suggest you create an array with your db information (db name, user name, user password and your host), in a folder inside 'node_modules' and use ".gitignore", to omit this information in your github repository;

// db Connection  
const connection = new Sequelize(dbInformation[0], dbInformation[1], dbInformation[2],{
  host: dbInformation[3], 
  dialect: 'mysql'
})

export default connection;
