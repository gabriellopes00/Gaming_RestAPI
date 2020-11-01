# { Games : Rest API } 🎮
## About API 📚
This is an Rest API witch the users can see a Games list, registered in database. However, when the users register themselves, they have free access to some routes, in witch, they can **register a new game**, **delete a existing game** and **update or change information about some game**. This Rest API was made to learn more about the *http* methods and see the *http's* status code.

## Building ⚙
You'll need [Node.js](https://nodejs.org) and i recommend that you have installed the [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) on your computer. With your setup completed, you will need to instal [MySQL](https://www.mysql.com/), and create an empty database.

Before register the games, you need to register a user, and log in with this user email. Logging in, get the generated *Token Code*, and user this token to access, the others games Routes, passing the token as a value in authentication ``Bearer Token``.

This is API is running at port ``3333`` ```http://localhost:3333```;
<br>

#### Clone
```bash
git clone https://github.com/gabriellopes00/Games_RestAPI.git
```

#### Running with yarn 🐿
```ssh
cd Games_APiRest
yarn install
yarn dev
```

#### Running with npm 🔧
```ssh
cd Games_APiRest
npm install
npm run dev
```

## Contact 📱
[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link=https://github.com/gabriellopes00)](https://github.com/gabriellopes00)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gabriel-lopes-6625631b0/)](https://www.linkedin.com/in/gabriel-lopes-6625631b0/)
[![Twitter Badge](https://img.shields.io/badge/-Twitter-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/_gabrielllopes_)](https://twitter.com/_gabrielllopes_)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-D14836?&style=flat-square&logo=Gmail&logoColor=white&link=mailto:gabrielluislopes00@gmail.com)](mailto:gabrielluislopes00@gmail.com)
  <a href="https://www.facebook.com/profile.php?id=100034920821684">
    <img src="https://img.shields.io/badge/Facebook-%231877F2.svg?&style=flat-square&logo=facebook&logoColor=white">  
  </a> 
  <a href="https://www.instagram.com/_.gabriellopes/?hl=pt-br">
    <img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?&style=flat-square&logo=instagram&logoColor=white">
  </a>

# Documentation 📝
This api is used to list games and its information.

## Games EndPoints

### GET Routes 

#### */games/*
This endpoint return a list with all of the information about all of the games registered in the database.

##### - Parameters
This route doesn't have any parameter.

##### - Answers
###### OK 200 ```OK```
If is returned **OK**, is because everything is ok, and all of the games were returned.
Exemple: 
```
[
  {
    "id": 1,
    "title": "Assasin's Screed Valhalla",
    "year": 2020,
    "price": 199,
    "company": "Ubisoft",
    "imageLink": "https://cdn.europosters.eu/image/1300/posters/assassin-s-creed-valhalla-eivor-i96339.jpg",
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
    "officialWebsiteLink": "https://www.ubisoft.com/pt-br/game/assassins-creed/valhalla",
    "createdAt": "2020-10-29T22:03:58.000Z",
    "updatedAt": "2020-10-29T22:03:58.000Z"
  },
  {
    "id": 2,
    "title": "FIFA 21",
    "year": 2020,
    "price": 299,
    "company": "EA Sports",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTDpd3gmkaL7iaRUtRGCJLjNChKQPTKNqESbQ&usqp=CAUg",
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
    "officialWebsiteLink": "https://www.ea.com/pt-br/games/fifa/fifa-21",
    "createdAt": "2020-10-30T17:48:17.000Z",
    "updatedAt": "2020-10-30T17:48:17.000Z"
  }
]
```
###### Bad Request 400 ```Bad Request```
This answer is returned if something bad happened on the server or if the route putted on the url field is doesn't exist. 

###### Internal server error 500 ```Internal server error```
This answer is returned if something bad happened on the server or if the route putted on the url field is doesn't exist. `
<hr>

#### */games/:id*
This route is used to return a specific game, witch has the id received as parameter.

##### - Parameters
###### *id* 
In this route the user must pass the **id** of the game to return its information.

##### - Answers 
###### Bad Request 400 ```Bad Request```
If the *id* parameter is not a number, will be returned `` Bad request 400 ``
###### internal Server Error 500 ```internal Server Error```
If this answer is returned is because something bad happened in the server;
###### Not found 404 ```Not found```
If the answer is `` Not found 404 ``, is because the API received and accepted the parameter,
but any game was found having the parameter as *id*
###### OK 200 ```OK```
If is returned *OK*, is because the paramentes was accepted, and the games was found and returned successfully.
 So the games,witch has the id parameter as id, information will be returned.
Exemple: 
```
{
    "id": 2,
    "title": "FIFA 21",
    "year": 2020,
    "price": 299,
    "company": "EA Sports",
    "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTDpd3gmkaL7iaRUtRGCJLjNChKQPTKNqESbQ&usqp=CAUg",
    "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
    "officialWebsiteLink": "https://www.ea.com/pt-br/games/fifa/fifa-21",
    "createdAt": "2020-10-30T17:48:17.000Z",
    "updatedAt": "2020-10-30T17:48:17.000Z"
  }
```

### POST  Routes 
#### */games*
This route is used to register new games in the database but is protected by **authentication**, 
so to access this route you need to register a user and log in with this user, generating one token,
after you just need to pass this token as ``Bearer Authorization``, and you have free access to this route.

##### - Parameters
*Routes parameters must be passed as **body parameters**. And any one can be null or undefined.*
###### title
This will be the title of the games;
###### company
This will be the company that created the game.
###### price
This will be the price of the game. *This value can be **0***
###### year
This will be the year that teh game was created.
###### imageLink
This is the the image game link.
###### officialWebsiteLink
This is the the official game Website link.

##### - Answers
###### Created 201 ```Created```
This answer will be returned if the game was created successfully.
###### Bad request 400 ```Bad request```
This answer will be returned if the parameters received are invalid.
###### Internal Server Error 500 ```Internal Server Error```
This answer will be returned if something bad happened in the server.

### DELETE  Routes 
#### */games/:id*
This route will delete a specific game in the database. This game delete will have the *id*
igual the parameter received. But this route is protected by **authentication**, 
so to access this route you need to register a user and log in with this user, generating one token,
after you just need to pass this token as ``Bearer Authorization``, and you have free access to this route.

##### - Parameters
###### id
This route will receive one parameter, called `id`, that will be used to find the game that will be deleted.

##### - Answers
###### OK 200 ```OK  ```
If is returned *OK*, is because the paramentes was accepted, the games was found and deleted successfully.
###### Not found 404 ```Not found ```
If the answer returned is Bad Request, is because the API received and accepted the parameter,
but any game was found having the parameter as *id*
###### Bad request 400 ``` Bad request ```
This answer will be returned if the parameters received are invalid.
###### Internal Server Error 500 ```Internal Server Error ```
This answer will be returned if something bad happened in the server.

### PUT  Routes 
#### */games/:id*
This route is used to update an existent game in the database but is protected by **authentication**, 
so to access this route you need to register a user and log in with this user, generating one token,
after you just need to pass this token as ``Bearer Authorization``, and you have free access to this route.

##### - Parameters
*The game id, need to be passed parameter, but the games information, must be passed as **body parameters**. And any one can be null or undefined.*
###### title
This will be the new title of the game.
###### company
This will be the new company that created the game.
###### price
This will be the new price of the game. *This value can be **0***
###### year
This will be the new year that teh game was created.
###### imageLink
This is the the new image game link.
###### officialWebsiteLink
This is the the new official game Website link.

##### - Answers
###### Created 200 ```OK```
This answer will be returned if the game was updated successfully.
###### Bad request 400 ```Bad request ```
This answer will be returned if the parameters received are invalid.
###### Internal Server Error 500 ```Internal Server Error ```
This answer will be returned if something bad happened in the server.
###### Not found 404 ```Not found ```
If the answer returned is Bad Request, is because the API received and accepted the parameter, and the new game data
but any game was found having the parameter as *id*.

## Users EndPoints

### POST Routes

#### */users/*
This route register a new user in the database. This.

#### - Parameters
###### name
This is the user name.
###### email
This is the user email.
###### password
This is the user password.

#### - Answers
###### Bad Request 400 ```Bad Request```
This answer will be returned if the parameters received are invalid.
###### Internal Server Error 500 ```Internal Server Error ```
This answer will be returned if something bad happened in the server
###### Created 201 ```Created```
This answer will be returned if the user was created successfully.

<hr>

#### */users/:id*
This route will log the user in the application returning the generated token.

##### - Parameters
###### email
This route will receive the email of the user that will be logged.
###### password
This parameter will be passed as **body parameters**, and must be the user password.

##### - Answers
###### Bad Request 400 ```Bad Request```
This answer will be returned if the parameters received are invalid.
###### Internal Server Error 500 ```Internal Server Error ```
This answer will be returned if something bad happened in the server
###### Not found 404 ```Not found ```
If the answer returned is not found, is because the API received and accepted the parameter, but any game was found having the parameter as *email*.
###### Unauthorized 201 ```Unauthorized```
This answer will be returned if the password is invalid or incorrect.
###### Created 200 ```OK```
This answer will be returned if the user was logged successfully.
