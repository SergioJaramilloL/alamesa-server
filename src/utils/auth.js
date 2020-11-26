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
    const { id, userType } = jwt.verify(token, process.env.SECRET);

    if( userType === 'clients' ) {
      req.client = id;
    } else if( userType === 'restaurants' ) {
      req.restaurant = id;
    } else{
      throw new Error( 'El tipo de usuario no existe')
    }
    next();
  }
  catch(err){
    res.status(401).json({message: err.message});
  }
}