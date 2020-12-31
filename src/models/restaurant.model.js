const { Schema, model, models } = require('mongoose');

const restaurantSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      async validator(email){
        try{
          const restaurant = await models.Restaurant.findOne({ email });
          return !restaurant;
        }
        catch(err){
          return false;
        }
      },
      message: 'El correo ya está en uso',
    }
  },
  password: {
    type: String,
    required: true,
  },
  terms: {
    type: Boolean,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  nit: {
    type: String,
  },
  scheduleFrom: {
    type: String,
  },
  scheduleTo: {
    type: String,
  },
  deposit: {
    type: Number,
  },
  paymentMethod: {
    type: String,
  },
}, {
  timestamps: true,
});

const Restaurant = model('Restaurant', restaurantSchema)

module.exports = Restaurant;
