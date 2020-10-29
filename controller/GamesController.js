//Imports
  import express from 'express'
  const router = express.Router();

  import Games from '../model/Games';

  import Auth from '../middleware/authentication'
  import Validator from '../validators/validation'

router.get('/', async (req, res) => {
  try {
    const gamesReturned = await Games.findAll({order: [['year','desc']]}); 
    gamesReturned ? res.status(200).json(gamesReturned) : res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
})
router.get('/:id', async (req, res) => {
  let { id } = req.params;

  if(isNaN(id)) res.sendStatus(400); //Bad Request => Invalid data received
  else{
    try {
      let gamesReturned  = await Games.findOne({where: {id: id}}) //Founding unique game
      gamesReturned ? res.status(200).json(gamesReturned) : res.sendStatus(404);
    } catch (error) {
      res.sendStatus(500);
    }
  }
})

router.post('/', Auth, async (req, res) => {
  const data = req.body;
  //Request Validation
  try {
    await Validator.gamesValidation.validate(data); //Validation
    await Games.create(data);  
    res.sendStatus(201)
  } catch (error) {
    console.log(error);
    error.name === 'ValidationError' ? res.sendStatus(400) : res.sendStatus(500);
  }
})
  
router.delete('/:id', Auth, async (req, res) => {
  let {id} = req.params;

  if(isNaN(id)) res.sendStatus(400);//Bad Request => Invalid data received
  else{
    try {
      let found = await Games.findOne({where: {id: id}})
      if(found) {
        await Games.destroy({where: {id: id}}) 
        res.sendStatus(200);
      }else res.sendStatus(404);
      
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
})

router.put('/:id', Auth, async (req, res) => {
  let {id} = req.params;

  if(isNaN(id)) res.sendStatus(400); //Bad Request
  else{   
    try {
      let game = await Games.findOne({where: {id: id}});    
      !game && res.sendStatus(404);

      const data = req.body;
      await Validator.gamesValidation.validate(data);
      await Games.update(data, {where: {id: id}})
      res.sendStatus(200)
    } catch (error) {
      console.log(error);
      error.name === 'ValidationError' ? res.sendStatus(400) : res.sendStatus(500)
    }
  }
  

})

export default router;  