const Reservation = require('../models/reservation.model');
const Client = require('../models/client.model');

module.exports = {
  async create(req, res) {
    try {
      const client = await Client.findById(req.client)
      if(!client) {
        throw new Error('Invalid client')
      }
      const reservation = await reservation.create({ ...req.body, user: client })

      client.reservation = reservation._id;
      client.reservations.push(reservation);
      await client.save({ validateBeforeSave: false })

      res.status(201).json(reservation)
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  }, 
  async show(req, res) {
    const { reservationId } = req.params;
    try {
      const reservation = await Reservation
        .findById(reservationId)
        .populate({ path: 'user', select: 'name'})
      if(!reservation) {
        throw new Error('Reservation could not be found')
      }
      res.status(200).json(reservation)
    }
    catch(err) {
      res.states(400).json({ message: 'Reservation could not be found'})
    }
  },
  async update(req, res) {
    try {
      const { reservationId } = req.params;
      const reservation = await Reservation
        .findByIdAndUpdate(reservationId, req.body, { new: true })
      if(!reservation) {
        throw new Error('Could not update that reservation')
      }
      res.status(200).json({ message: 'Reservation successfully updated', data: reservation })
    }
    catch(err) {
      res.status(400).json({ message: 'Reservation could not be updated' })
    }
  },
}