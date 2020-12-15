const SanitaryRegister = require('../models/sanitaryRegister.model');
const Client = require('../models/client.model');

module.exports = {
  async show(req, res) {
    try {
      const client = await Client.findById(req.client)
      const sanitaryRegisterId = client.sanitaryRegister
      const sanitaryRegister = await SanitaryRegister
        .findById(sanitaryRegisterId)
        .populate({ path: 'user', select: 'name'})
      if(!sanitaryRegister) {
        throw new Error('Sanitary register not exist')
      }
      res.status(200).json(sanitaryRegister)
    }
    catch(err) {
      res.states(400).json({ message: 'Sanitary register not found'})
    }
  },
  async create(req, res) {
    try {
      const client = await Client.findById(req.client)
      if(!client) {
        throw new Error('Invalid client')
      }
      const sanitaryRegister = await SanitaryRegister.create({ ...req.body, user: client })

      client.sanitaryRegister = sanitaryRegister._id;
      await client.save({ validateBeforeSave: false })

      res.status(201).json(sanitaryRegister)
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  },
  async update(req, res) {
    try {
      const client = await Client.findById(req.client)
      const sanitaryRegisterId = client.sanitaryRegister
      const sanitaryRegister = await SanitaryRegister
        .findByIdAndUpdate(sanitaryRegisterId, req.body, { new: true, useFindAndModify: false, })
      if(!sanitaryRegister) {
        throw new Error('Could not update that sanitary register')
      }
      res.status(200).json({ message: 'Sanitary register updated', data: sanitaryRegister })
    }
    catch(err) {
      res.status(400).json({ message: 'Sanitary register could not be updated' })
    }
  },
}