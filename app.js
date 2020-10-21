//Imports
  import express from 'express';
  import bodyParser from 'body-parser';
  import cors from 'cors';

  import dbAuthentication from './database/authenticate'
  dbAuthentication.Authenticate(); 

  import games from './controller/GamesController';
  

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', games);


const port = 3333;
app.listen(port, err =>{
  err ? console.log(err) : console.log(`Server running at http://localhost:${port}`);
})

                                                
