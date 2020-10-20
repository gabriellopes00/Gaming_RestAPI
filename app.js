//Imports
  import express from 'express';
  import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


let myDatabase = {
  games: [
    {
      id: 1,
      title: 'Game 1',
      year: 2017,
      price: 190
    },
    {
      id: 2,
      title: 'Game 2',
      year: 2010,
      price: 50
    },
    {
      id: 3,
      title: 'Game 3',
      year: 2020,
      price: 290
    },
    {
      id: 4,
      title: 'Game 4',
      year: 2019,
      price: 100
    },
    {
      id: 5,
      title: 'Game 5',
      year: 2018,
      price: 0
    }
  ]
}

function SearchGames(id){
  let gamesReturned, statusReturned;

  gamesReturned = myDatabase.games.find(game => game.id === id);
  !gamesReturned ? statusReturned = 404 /*Not found*/: statusReturned = 200//OK

  return {
    games: gamesReturned,
    status: statusReturned
  }

}

app.get('/games', (req, res) => {
  return res.status(200).json(myDatabase)
})
app.get('/game/:id', (req, res) => {
  let { id } = req.params;
  let statusNumber = 0;//Default = Null
  let gamesReturned

  if(isNaN(id)) statusNumber = 400; //Bad Request
  else{
    let idNumber = parseInt(id);

    let results = SearchGames(idNumber);
    gamesReturned = results.games;
    statusNumber = results.status;      
  }
  res.status(statusNumber).json(gamesReturned);//Final response
})

app.post('/game', async (req, res) => {
  let {id, title, year, price} = req.body;

  //Request Validation
  if(id && title && price && year){
    await myDatabase.games.push({
      id: id,
      title: title,
      year: year,
      price: price
    })

    let results = await SearchGames(parseInt(id))
    let gamesReturned = results.games
    let statusNumber = results.status;

    res.status(statusNumber).json(gamesReturned);
  } else res.status(400).send('Invalid data received')//Bad Request
})

app.delete('/game/:id', (req, res) => {
  let {id} = req.params;
  let response = {status: 0, msg: ''};

  if(isNaN(id)) response = {status: 400, msg: 'Invalid params'}; //Bad Request
  else{

    let index = myDatabase.games.findIndex(game => game.id === parseInt(id));
    if (index == -1) response = {status: 404, msg: 'Game not found'};//Not found
    else {
      myDatabase.games.splice(index, 1);
      response = {status: 200, msg: `Game deleted successfully`};
    }
  }

  res.status(response.status).send(response.msg)
})

app.put('/game/:id', (req, res) => {
  let {id} = req.params;
  let response = {status: 0, msg: ''};

  if(isNaN(id)) response = {status: 400, msg: 'Invalid params'}; //Bad Request
  else{

    let game = SearchGames(parseInt(id));
    
    if (!game.games) response = {status: 404, msg: 'Game not found'};        
    else {
      let {title, price, year} = req.body;

      if (title) game.games.title = title
      if (price) game.games.price = price
      if (year) game.games.year = year
      
      response = {status: 200, msg: 'Game updated successfully'};
    }
  }
  res.status(response.status).send(response.msg);

})

const port = 3333;
app.listen(port, err =>{
  err ? console.log(err) : console.log(`Server running at http://localhost:${port}`);
})

                                                
