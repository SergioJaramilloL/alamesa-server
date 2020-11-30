const SanitaryRegister = require('../models/sanitaryRegister.model');
const Client = require('../models/client.model');

module.exports = {
  async list (req, res) {
    const sanitaryRegisters = await SanitaryRegister.find().populate('user', 'email').catch(err => {
      res.status(500).json(err)
    });
    res.status(200).json(sanitaryRegisters)
  },
  async show(req, res) {
    const { sanitaryRegisterId } = req.params;

    const sanitaryRegister = await SanitaryRegister.findById(sanitaryRegisterId).populate({
      path: 'client',
      select: 'sanitaryRegisters',
      populate: { path: 'sanitaryRegister' }
    })
    res.status(200).json(SanitaryRegisters)
  },
  async create(req, res) {
    try {
      const client = await Client.findById(req.client)
      if(!client) {
        throw new Error('Invalid client')
      }
      const sanitaryRegister = await SanitaryRegister.create({ ...req.body, user: client })

      client.sanitaryRegister.push(sanitaryRegister);
      await client.save({ validateBeforeSave: false })

      res.status(201).json(sanitaryRegister)
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  }
}