const SanitaryRegister = require('../models/sanitaryRegister.model');
const Client = require('../models/client.model');

module.exports = {
  async show(req, res) {
    const { sanitaryRegisterId } = req.params;

    const sanitaryRegister = await SanitaryRegister
      .findById(sanitaryRegisterId)
      .populate({ path: 'user', select: 'name'})
    
    res.status(200).json(sanitaryRegister)
  },
  async create(req, res) {
    try {
      console.log(req.client)
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
  }
}