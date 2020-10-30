//Imports
  import bcrypt from 'bcryptjs';
  
  import jwt from 'jsonwebtoken';
  const jwtSecret = 'fghfi5apEPgabGdte5iHJapf6d3apohSFaLhp90ydqLpfu48';

async function Login(userData, validaPassword, res) {
  try {
    const isValid = await bcrypt.compare(userData.password, validaPassword);
    if(isValid){
      jwt.sign({email: userData.email, id: userData.id}, jwtSecret, {expiresIn: '6h'}, (err, token) => {
        err ? res.sendStatus(500) : res.status(200).json({token: token});
      });
    }else res.sendStatus(401)
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
  
}

export default Login;