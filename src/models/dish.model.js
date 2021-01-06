const { Schema, model } = require('mongoose');

const dishSchema = new Schema ({
  menu: {
    type: Schema.Types.ObjectId,
    ref:'Menu',
    required: true,
  },

},{
  timestamps: true,
});

const Dish = model('Dish', dishSchema)

module.exports = Dish;