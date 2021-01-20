const Dish = require('../models/dish.model');
const Menu = require('../models/menu.model');
const Restaurant = require('../models/restaurant.model');

module.exports = {

  async create(req, res) {
    try {
      const restaurant = await Restaurant.findById(req.restaurant).populate('menu')
      const { file, ...rest } = req.body
      if(!restaurant) {
        throw new Error('Invalid restaurant')
      }
      let menu = restaurant.menu
      let dish;
      if(!menu) {
        menu = await Menu.create({
          provider: restaurant,
        })
      
        dish = await Dish.create({ ...rest, file: file ? file.secure_url : '', menuList: menu._id })
        
        menu.dishes.push(dish);
        await menu.save({ validateBeforeSave: false })
        
        restaurant.menu = menu._id;
        await restaurant.save({ validateBeforeSave: false })
      }
      else {
        dish = await Dish.create({ ...rest, file: file ? file.secure_url : '', menuList: menu._id })
        menu.dishes.push(dish);
        await menu.save({ validateBeforeSave: false })
      }
      res.status(201).json(dish)
    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  },

  async update(req, res) {
    try {
      const { dishId } = req.params;

      const { file, ...rest } = req.body

      const update= { ...rest, file: file ? file.secure_url || file : '' }
        
      const dish = await Dish
        .findByIdAndUpdate(dishId, update, { new: true, useFindAndModify: false, })
      
      if(!dish) {
        throw new Error('Could not update that dish')
      }
      
      res.status(200).json({ message: 'Dish updated', data: dish })
    } catch(err) {
      res.status(400).json({ message: 'Dish could not be updated' })
    }
  },

  async destroy(req, res) {
    try {
      const { dishId } = req.params;

      const dish = await Dish
        .findByIdAndDelete(dishId)
      
      if(!dish) {
        throw new Error('Could not delete that dish')
      }
      
      res.status(200).json({ message: 'Dish deleted', data: dish })
    } catch(err) {
      res.status(400).json({ message: 'Dish could not be deleted' })
    }
  },

  async show(req, res) {
    try{
      const { dishId } = req.params;

      const dish = await Dish.findById(dishId)

      if(!dish) {
        throw new Error('Dish not exist')
      }
      
      res.status(200).json({ message: 'Dish found', data: dish })
    } catch(error) {
      res.status(400).json({ message: error.message })
    }
  },
}