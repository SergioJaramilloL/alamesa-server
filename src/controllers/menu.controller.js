const Menu = require('../models/menu.model');

module.exports = {

  async show(req, res) {
    try{
      const { menuId } = req.params;

      const menu = await Menu.findById(menuId)
        .populate({ path: 'dish' })

      res.status(201).json(menu)
    } catch(error) {
      res.status(400).json({ message: error.message })
    }
  },
}