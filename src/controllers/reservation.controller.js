const Reservation = require('../models/reservation.model');
const Restaurant = require('../models/restaurant.model');
const Client = require('../models/client.model');

module.exports = {
  async create(req, res) {
    try {

      const { restaurantId } = req.params;
      const { clientId } = req.params;

      const restaurant = await Restaurant.findById(restaurantId)
      const client = await Client.findById(clientId)

      if(!restaurant) {
        throw new Error('Invalid Restaurant')
      }

      if(!client) {
        throw new Error('Invalid Client')
      }

      const reservation = await Reservation.create({ ...req.body, provider: restaurant, user: client})

      restaurant.reservations.push(reservation);
      client.reservations.push(reservation);

      await restaurant.save({ validateBeforeSave: false })
      await client.save({ validateBeforeSave: false })

      res.status(201).json(reservation)
    } catch(error) {
      res.status(400).json({ message: error.message })
    }
  },

  async showRestaurant(req, res) {
    const { reservationId } = req.params;

    const reservationRestaurant = await Reservation.findById(reservationId).populate({
      path: 'provider',
      select: 'name',
    })
    
    res.status(200).json(reservationRestaurant)
  },

  async showClient(req, res) {
    const { reservationId } = req.params;

    const reservationClient = await Reservation.findById(reservationId).populate({
      path: 'user',
      select: ['name', 'lastName', 'email', 'phone', 'identification', 'sanitaryRegister'],
    })
    
    res.status(200).json(reservationClient)
  },

  async update( req, res ) {
    try{
      const { reservationId } = req.params;

      const reservation = await Reservation.findByIdAndUpdate( reservationId, req.body, { new: true })

      if(!reservation) {
        throw new Error('Could not update that reservation')
      }
      res.status(200).json({ message: 'Reservation updated', data: reservation })

    } catch(error) {
      res.status(400).json({ message: 'Reservation could not be updated'})
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