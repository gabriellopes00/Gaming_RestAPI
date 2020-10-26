//Imports
  import express from 'express';
  import bodyParser from 'body-parser';
  import cors from 'cors';

  //db Authentication
  import dbAuthentication from './database/authenticate'
  dbAuthentication.Authenticate(); 
  
  //db Tables
  import games from './controller/GamesController';
  import users from './controller/UsersController';
  

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Routes
  app.use('/games', games);
  app.use('/users', users);
  app.use((req, res, next) =>{
    res.status(404).json({error: 'Sorry! Page not found.'})
  })

const port = 3333;
app.listen(port, err =>{
  err ? console.log(err) : console.log(`Server running at http://localhost:${port}`);
})

                                                
