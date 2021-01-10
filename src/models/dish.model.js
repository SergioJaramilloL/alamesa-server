const { Schema, model } = require('mongoose');

const dishSchema = new Schema ({
  nameDish: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  file: {
    type: String,
  },
  menuList: {
    type: Schema.Types.ObjectId,
    ref:'Menu',
    required: true,
  },
},{
  timestamps: true,
});

const Dish = model('Dish', dishSchema)

module.exports = Dish;