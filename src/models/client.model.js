const { Schema, model, models } = require('mongoose');

const clientSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  lastName: String,
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
          const client = await models.Client.findOne({ email });
          return !client;
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
  birthDate: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  address: {
    type: String,
  }
  },{
    timestamps: true,
});

const Client = model('Client', clientSchema)

module.exports = Client
