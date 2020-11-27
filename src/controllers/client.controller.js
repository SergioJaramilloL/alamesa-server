const Client = require('../models/client.model');
const jwt = require('jsonwebtoken');

module.exports = {
  async signup( req, res ){
    try{
      const { name, email, password, userType, terms } = req.body;
      const client = await Client.create({ name, email, password, terms })
      const token = jwt.sign(
        { id: client._id, userType: userType },
        process.env.SECRET,
        { expiresIn: 60*60*24 }
      );
      res.status(201).json({ token })
    }
    catch(err){
      res.status(400).json({ message: err.message})
    }
  },

  async list( req, res ) {
    try {
      const clients = await Client.find()

      if(!clients) {
        throw new Error('Client not found')
      }
      
      res.status(200).json({ message: 'Clients list found', data: clients, })
    }catch(error) {
        res.status(404).json({ message: 'Client not found' })
      }
  },

  async show( req, res ) {
    try {
      const client = await Client.findById( req.client )

      if(!client) {
        throw new Error('Client not found')
      }
        res.status(200).json({ message: 'Client found', data: client })
    }
      catch(error) {
        res.status(404).json({ message: 'Client not found' })
      }
  },

  async update( req, res ) {
    try{
      const { clientId } = req.params
      const client = await Client.findByIdAndUpdate()( clientId, req.body, { new: true})

      if(!client) {
        throw new Error('Could not update that client')
      }
      res.status(200).json({ message: 'Client updated', data: client})

    } catch(error) {
      res.status(400).json({ message: 'Client could not be updated'})
    }
  },

  async destroy( req,res ){
    try {
      const { clientId } = req.params;
      const client = await Client.findByIdAndDelete(clientId)

      if(!clientId){
        throw new Error('Could not update Client')
      }
        res.status(200).json({ message: 'Cliente deleted', data:client, })
    }catch(err) {
        res.status(400).json({ message: 'Client could not be deleted' })
      }
  },

}
