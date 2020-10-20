//Imports
  import dbConnection from './connection'

async function Authenticate(){
  try {
    await dbConnection.authenticate()
    console.log('Connected successfully');
  } catch (err) {
    console.log(err);
  }    
}
export default {Authenticate};