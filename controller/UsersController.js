//Imports
  import express from 'express';
  const router = express.Router();

  //db Table
  import Users from '../model/Users';

  //Validations
  import Validator from '../validators/validation';
  import login from '../validators/Login';

  //bcryptjs => Password hash generator
  import bcrypt from 'bcryptjs';

// User Registration  
router.post('/', async (req, res) => {
  let data = req.body;
    try {
      await Validator.userValidation.validate(data);
      
      const salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);
       
      await Users.create(data);
      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      error.name === 'ValidationError' ? res.sendStatus(400) : res.sendStatus(500);
      //If error is not "ValidationError", is because yup validation successfully, but something happened in sequelize;
    };
});

// User Login
router.post('/:email', async (req, res) => {
  let {password} = req.body;
  let {email} = req.params;

  if(!email || !password) res.sendStatus(400)
  else{
    try {
      let userFound = await Users.findOne({where: {email: email}});
      userFound ? login({email, password}, userFound.password, res) : res.sendStatus(404);
    } catch (error) {
      console.log(error);
      res.sendStatus(500)
    }
    
  }
})

export default router;