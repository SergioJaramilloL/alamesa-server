const Client = require ('../models/client.model');
const jwt = require('jsonwebtoken');

module.exports = {
  list( req, res ) {
    Client
      .find()
      .then(clients =>{
        res.status(200).json({ message: 'Client found', data: clients, })
      }) 
      .catch(err =>{
        res.status(404).json({ message: 'Client not found' })
      })
  },

  show( req, res ) {
    const { clientId } = req.params;
    Client
      .findById( clientId )
      .then( client => {
        res.status(200).json({ message: 'Client found', data: client })
      })
      .catch( err => {
        res.status(404).json({ message: 'Client not found' })
      }) 
  },

  destroy( req,res ){
    const { clientId } = req.params;
    Client
      .findByIdAndDelete(clientId)
      .then( client => {
        res.status(200).json({ message: 'Cliente deleted', data:client, })
      })
      .catch(err =>{
        res.status(400).json({ message: 'Client could not be deleted' })
      })
  },

  async signup( req, res ){
    try{
      const { name, email, password, terms } = req.body;
      const client = await Client.create({ name, email, password, terms })
      const token = jwt.sign(
        { id: client._id },
        process.env.SECRET,
        { expiresIn: 3 }
      );
      res.status(201).json({ token })
    }
    catch(err){
      res.status(400).json({ message: err.message})
    }
  },
}
