const Dish = require('../models/dish.model');
const Menu = require('../models/menu.model');
const Restaurant = require('../models/restaurant.model');

module.exports = {

  async create(req, res) {
    try {
      const restaurant = await Restaurant.findById(req.restaurant)
      if(!restaurant) {
        throw new Error('Invalid restaurant')
      }

      const menu = restaurant.menu
      if(!menu) {
        menu = await Menu.create({
          provider: restaurant,
        })
      }

      const dish = await Dish.create({ ...req.body, })

      menu.dish.push(dish); 
      await menu.save({ validateBeforeSave: false })

      restaurant.menu = menu;
      await restaurant.save({ validateBeforeSave: false })

      res.status(201).json(menu)
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  },

  async update(req, res) {
    try {
      const { dishId } = req.params;

      const dish = await Dish
        .findByIdAndUpdate(dishId, req.body, { new: true, useFindAndModify: false, })
      if(!dish) {
        throw new Error('Could not update that dish')
      }
      
      res.status(200).json({ message: 'Dish updated', data: dish })
    } catch(err) {
      res.status(400).json({ message: 'Dish could not be updated' })
    }
  },
}