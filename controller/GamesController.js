//Imports
  import express from 'express'
  const router = express.Router();

  import Games from '../models/games';

router.get('/games', async (req, res) => {
  try {
    const gamesReturned = await Games.findAll();
    gamesReturned ? res.status(200).json(gamesReturned) : res.status(200).send('Any game registered')
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: err.message})
  }
  
})
router.get('/game/:id', async (req, res) => {
  let { id } = req.params;

  if(isNaN(id)) res.status(400).send('Invalid params') //Bad Request
  else{
    let idNumber = parseInt(id);

    let gamesReturned  = await Games.findOne({where: {id: idNumber}})
    gamesReturned ? res.status(200).json(gamesReturned) : res.status(404).send('Game not found');
  }
  
})

router.post('/game', async (req, res) => {
  let {title, year, price, company} = req.body;

  //Request Validation
  if(title != undefined && !isNaN(price)&&
    company != undefined && !isNaN(year)){
      try {
        await Games.create({
          title: title,
          year: Number(year),
          price: Number(price),
          company: company
        })  
        res.status(201).redirect('/games');
      } catch (error) {
        console.log(error);
        res.status(400).send('Something happened');
      }
  } else return res.status(400).send('Invalid data received')//Bad Request
})
  
router.delete('/game/:id', async (req, res) => {
  let {id} = req.params;

  if(isNaN(id)) res.status(400).send('Invalid params')//Bad Request
  else{
    try {
      let deletedSuccessfully;
      let found = await Games.findOne({where: {id: id}})
      if(found) {
        deletedSuccessfully = await Games.destroy({where: {id: id}}) 
        res.status(200).send('Game deleted successfully')
      }else res.status(400).send('Game not found')
      
    } catch (error) {
      console.log(error);
      res.status(400).send('Somethig happened')
    }
  }
})

router.put('/game/:id', async (req, res) => {
  let {id} = req.params;

  if(isNaN(id)) return res.status(400).send('Invalid params'); //Bad Request
  else{
    let game = await Games.findOne({where: {id: id}});    
    if (!game) res.status(404).send('Game not found');        
    else {
      let {title, price, year, company} = req.body;
      
      if(title != undefined && !isNaN(price)&&
      company != undefined && !isNaN(year)){
        try {
          await Games.update({
            title: title,
            company: company,
            price: price,
            year: year,
          },
          {where: {id: id}})
          res.status(200).send('Game updated successfully')
        } catch (error) {
          console.log(error);
          res.status(400).status('Something happened, and the game was not deleted.')
        }
      }else res.status(400).send('Invalid Values')
    }
  }
  

})

  export default router;
  