const Client = require('../models/client.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SanitaryRegister = require('../models/sanitaryRegister.model');

module.exports = {

  async signup( req, res ){
    try{
      const { name, email, password, userType, terms } = req.body;
      const encPassword = await bcrypt.hash( password, 8)
      const client = await Client.create({ name, email, password: encPassword, terms })
      const token = jwt.sign(
        { id: client._id, userType },
        process.env.SECRET,
        { expiresIn: 60*60*24 }
      );
      res.status(201).json({ token })
    }
    catch(err){
      res.status(400).json({ message: err.message})
    }
  },

  async signin( req, res ){
    try{
      const { email, password, userType } = req.body;
      const client = await Client.findOne({ email })
      if( !client ) {
        throw new Error( 'Usuario o contraseña invalida' )
      }
      const isValid = await bcrypt.compare( password, client.password )
      if(!isValid) {
        throw new Error( 'Usuario o contraseña invalida' )
      }
      const token = jwt.sign(
        { id: client._id, userType },
        process.env.SECRET,
        { expiresIn: 60*60*24}
      )
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
      const client = await Client
        .findByIdAndUpdate( req.client, req.body, { new: true, useFindAndModify: false,})

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
      const client = await Client.findByIdAndDelete(req.client)
      const sanitaryRegisterId = client.sanitaryRegister
      const sanitaryRegister = await SanitaryRegister
        .findByIdAndDelete(sanitaryRegisterId)  
      if(!client && !sanitaryRegister) {
        throw new Error('Could not delete that client')
      }
        res.status(200).json({ message: 'Client deleted', data:client, })
    } catch(err) {
      res.status(400).json({ message: 'Client could not be deleted' })
    }
  },
}
