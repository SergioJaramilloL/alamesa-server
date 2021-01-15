const Reservation = require('../models/reservation.model');
const Restaurant = require('../models/restaurant.model');
const Client = require('../models/client.model');
const SanitaryRegister = require('../models/sanitaryRegister.model');

module.exports = {
  async create(req, res) {
    try {

      const { restaurantId } = req.params;

      const restaurant = await Restaurant.findById(restaurantId)
      const client = await Client.findById(req.client)
      const sanitaryRegisterId = client.sanitaryRegister
      const sanitaryRegister = await SanitaryRegister.findById(sanitaryRegisterId)

      if(!restaurant) {
        throw new Error('Invalid Restaurant')
      }

      if(!client) {
        throw new Error('Invalid Client')
      }

      if(!sanitaryRegister) {
        throw new Error('Invalid Sanitary Register')
      }

      const reservation = await Reservation.create({ ...req.body, provider: restaurant._id, user: client._id})

      restaurant.reservations.push(reservation._id);
      await restaurant.save({ validateBeforeSave: false })

      client.reservations.push(reservation._id);
      await client.save({ validateBeforeSave: false })

      sanitaryRegister.reservations.push(reservation._id)
      await sanitaryRegister.save({ validateBeforeSave: false })
      reservation.sanitaryRegister = sanitaryRegister._id

      res.status(201).json(reservation)
    } catch(error) {
      res.status(400).json({ message: error.message })
    }
  },

  async showRestaurant(req, res) {
    try {
      const { reservationId } = req.params;
  
      const reservationRestaurant = await Reservation.findById(reservationId).populate({
        path: 'provider',
        select: 'name',
      })
      
      res.status(200).json(reservationRestaurant)

    } catch(error) {
      res.status(400).json({ message: 'Reservation not found' })
    }
  },

  async showClient(req, res) {
    try {
      const { reservationId } = req.params;
  
      const reservationClient = await Reservation.findById(reservationId)
      .populate({
        path: 'user',
        select: ['name', 'lastName', 'email', 'phone', 'identification', 'sanitaryRegister'],
      })
      .populate({
        path: 'companions',
        select: ['nameCompanion', 'sanitaryRegister']
      })
      
      res.status(200).json(reservationClient)
    } catch(error) {
      res.states(400).json({ message: 'Reservation not found' })
    }
  },

  async destroy( req,res ){
    try {
      const { reservationId } = req.params;

      const reservation = await Reservation.findByIdAndDelete(reservationId)

      if(!reservation){
        throw new Error('Could not delete reservation')
      }
        res.status(200).json({ message: 'Reservation deleted', data: reservation, })
    }catch(err) {
        res.status(400).json({ message: 'Reservation could not be deleted' })
      }
  },

}