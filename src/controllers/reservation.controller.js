const Reservation = require('../models/reservation.model');
const Client = require('../models/client.model');

module.exports = {
  async create(req, res) {
    try {

      const client = await Client.findById(req.client)

      if(!client) {
        throw new Error('Invalid user')
      }

      const reservation = await Reservation.create({ ...req.body, user: client })

      client.reservations.push(reservation);

      await client.save({ validateBeforeSave: false })

      res.status(201).json(reservation)
    } catch(error) {
      res.status(400).json({ message: error.message })
    }
  }, 
}