//Imports 
  import jwt from 'jsonwebtoken';
  const jwtSecret = 'fghfi5apEPgabGdte5iHJapf6d3apohSFaLhp90ydqLpfu48';

//Token validation function 
function Authentication(req, res, next){
  const headerToken = req.headers.authorization;
  if(!headerToken) res.sendStatus(401);
  else{
    let token = headerToken.split(' ');
    jwt.verify(token[1], jwtSecret, (err, data) =>{
      if(err) res.sendStatus(401);
      else {
        req.loggedUser = {token, email: data.email, id: data.id};
        next(); 
      }
    })
  }
}

export default Authentication;