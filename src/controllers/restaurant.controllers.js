const Restaurant = require('../models/restaurant.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

module.exports = {

  async signup( req, res ){
    try{
      const { name, email, password, userType, terms, nit, deposit } = req.body;
      const encPassword = await bcrypt.hash( password, 8)
      const restaurant = await Restaurant.create({ name, email, password: encPassword, terms, nit, deposit })
      const token = jwt.sign(
        { id: restaurant._id, userType },
        process.env.SECRET,
        { expiresIn: 3 }
      );
      res.status(201).json({ token })
    }
    catch(err){
      res.status(400).json({ message: err.message })
    }
  },

  async signin( req, res ){
    try{
      const { email, password, userType } = req.body;
      const restaurant = await Restaurant.findOne({ email })
      if( !restaurant ) {
        throw new Error( 'Usuario o contraseña invalida' )
      }
      const restaurant = await Restaurant.create({ name, email, password, terms, nit, deposit })
      const token = jwt.sign(
        { id: restaurant._id, userType },
        process.env.SECRET,
        { expiresIn: 3 }
      );
      res.status(201).json({ token })
    }
    catch(err){
      res.status(400).json({ message: err.message })
    }
  },

    async list( req, res ) {
    try {
      const restaurants = await Restaurant.find();

      if(!restaurants){
        throw new Error('Could not find restaurants')
      }
  
      res.status(200).json({ message: 'Restaurants found', data: restaurants }) 
    } catch(error) {
      res.status(404).json({ message: 'Restaurants not found' })
    }
  },

  async show( req, res ) {
    try {
      const restaurant = await Restaurant.findById( req.restaurant );
      
      if(!restaurant){
        throw new Error('Could not find restaurant with the requested id')
      }
      
      res.status(200).json({ message: 'Restaurant found', data: restaurant })
    } catch(error) {
      res.status(404).json({ message: 'Restaurant not found' })
    }
  },

  async update( req, res ){
    try {
      const { restaurantId } = req.params;
      const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, req.body, { new: true })

      if(!restaurantId){
        throw new Error('Could not update that restaurant')
      }

      res.status(200).json({ message: 'Restaurant updated', data: restaurant })
    } catch(error) {
      res.status(400).json({ message: 'Restaurant could not be updated'} )
    }
  },

  async destroy( req,res ){
    try {
      const { restaurantId } = req.params;
      const restaurant = await Restaurant.findByIdAndDelete(restaurantId)

      if(!restaurantId){
        throw new Error('Could not delete that restaurant')
      }

      res.status(200).json({ message: 'Restaurant deleted', data: restaurant })
    } catch(error) {
      res.status(400).json({ message: 'Restaurant could not be deleted' })
    }
  },
}

