//Imports
  import express from 'express';
  const router = express.Router();

  //db Table
  import Users from '../model/Users';

  //jwt import and secretKey creation
  import jwt from 'jsonwebtoken';
  const jwtSecret = 'fghfi5apEPgabGdte5iHJapf6d3apohSFaLhp90ydqLpfu48';

// User Registration  
router.post('/', async (req, res) => {
  let {email, name, password} = req.body;

  if(!email || !name || !password) res.sendStatus(400);
  else{
    try {
      await Users.create({
        name: String(name),
        email: String(email),
        password: String(password),
      });
      res.sendStatus(201);
    } catch (error) {
      res.sendStatus(500);
    };
    
  };
});

// User Login
router.post('/:email', async (req, res) => {
  let {email, password} = req.body;

  if(!email || !password) res.sendStatus(400)
  else{
    try {
      let userFound = await Users.findOne({where: {email: email}});
      if(userFound){
        if(userFound.password === password){
          //Token generation
          jwt.sign({email: userFound.email, id: userFound.id}, jwtSecret, {expiresIn: '1d'}, (err, token) => {
            err ? res.sendStatus(500) : res.status(200).json({token: token})
          });
        }else res.sendStatus(401)
      }else res.sendStatus(404)
    } catch (error) {
      console.log(error);
      res.sendStatus(500)
    }
    
  }
})

export default router;

