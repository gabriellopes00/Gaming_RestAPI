//Imports
  import express from 'express'
  const router = express.Router();

  import Games from '../model/Games';

  import Auth from '../middleware/authentication'

router.get('/', async (req, res) => {
  req.loggedUser && res.send(req.loggedUser);
  try {
    const gamesReturned = await Games.findAll();  //Founding games
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
    let idNumber = parseInt(id);

    let gamesReturned  = await Games.findOne({where: {id: idNumber}}) //Founding unique game
    gamesReturned ? res.status(200).json(gamesReturned) : res.sendStatus(404);
  }
  
})

router.post('/', Auth, async (req, res) => {
  let {title, year, price, company} = req.body;

  //Request Validation
  if(title != undefined && !isNaN(price)&&
    company != undefined && !isNaN(year)){
      try {
        await Games.create({  // Creating game
          title: title,
          year: Number(year),
          price: Number(price),
          company: company
        })  
        res.sendStatus(201)
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
  } else return res.sendStatus(400); //Bad Request => Invalid data received
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

  if(isNaN(id)) return res.sendStatus(400); //Bad Request
  else{
    let game = await Games.findOne({where: {id: id}});    
    if (!game) res.sendStatus(404);       
    else {
      let {title, price, year, company} = req.body;
      
      if(title != undefined && !isNaN(price)&&
      company != undefined && !isNaN(year)){
        try {
          await Games.update({  //Updating the game
            title: title,
            company: company,
            price: price,
            year: year,
          },
          {where: {id: id}})
          res.sendStatus(200)
        } catch (error) {
          console.log(error);
          res.sendStatus(500)
        }
      }else res.sendStatus(400);
    }
  }
  

})

export default router;  