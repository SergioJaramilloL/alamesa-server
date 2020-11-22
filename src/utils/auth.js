const jwt = require('jsonwebtoken');

exports.auth = ( req, res, next ) =>{
  try{
    const { authorization } = req.headers;
    if(!authorization){
      throw new Error( 'Su sesion expiró' );
    }
    const [ _, token] = authorization.split(' ');
    if(!token){
      throw new Error('Su sesion expiró');
    }
    const { clientId, restaurantId } = jwt.verify(token, process.env.SECRET);
    req.client = clientId;
    req.restaurant = restaurantId;
    next();
  }
  catch(err){
    res.status(401).json({message: err.message});
  }


}
