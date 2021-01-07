const Dish = require('../models/dish.model');
const Menu = require('../models/menu.model');
const Restaurant = require('../models/restaurant.model');

module.exports = {

  async create(req, res, next) {
    try {
      const restaurant = await Restaurant.findById(req.restaurant)
      if(!restaurant) {
        throw new Error('Invalid restaurant')
      }

      let menu = restaurant.menu
      let dish;
      if(!menu) {
        menu = await Menu.create({
          provider: restaurant,
        })
        console.log('here a new menu because dont exist', menu)
        dish = await Dish.create({ ...req.body, menuList: menu })
        console.log('here created dish', dish)
      } 
      else {
        dish = await Dish.create({ ...req.body, menuList: menu })
        console.log('here created dish', dish)
        menu.dishes.push(dish);         
        console.log(menu)
      }
      
      restaurant.menu = menu;
      menu.dishes.push(dish); 
      await menu.save({ validateBeforeSave: false })
      await restaurant.save({ validateBeforeSave: false })
      res.status(201).json(dish)
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