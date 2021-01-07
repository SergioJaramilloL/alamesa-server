const { Schema, model } = require('mongoose');

const menuSchema = new Schema ({
  provider: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  dishes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Dish' }]
  },
}, {
  timestamps: true,
});

const Menu = model('Menu', menuSchema)

module.exports = Menu;