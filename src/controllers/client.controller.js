const Client = require ('../models/client.model');

module.exports = {
  listar( req, res ) {
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

  create( req, res ){
    const data = req.body;
    const newClient = {
      ...data, 
      published: Date.now()
    };
    Client
      .create(newClient)
      .then(client =>{
        res.status(201).json({ message: 'Client create', data:client, })
      })
      .catch(err =>{
        res.status(400).json({ message: 'Client could not be created' })
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
  }
}