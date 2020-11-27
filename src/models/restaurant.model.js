const { Schema, model, models } = require('mongoose');

const restaurantSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  password: {
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
  terms: {
    type: Boolean,
    required: true,
  },
  nit: {
    type: String,
  },
  deposit: {
    type: Number,
  },
  paymentMethod: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Restaurant = model('Restaurant', restaurantSchema)

module.exports = Restaurant