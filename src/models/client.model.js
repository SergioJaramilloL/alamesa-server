const { Schema, model, models } = require('mongoose');

const clientSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
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
  image: {
    type: String,
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
  identification: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  idType: {
    type: String,
  },
  sanitaryRegister: {
    type: Schema.Types.ObjectId, 
    ref: 'SanitaryRegister',
  },
  reservations: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }]
  },
},{
  timestamps: true,
});

const Client = model('Client', clientSchema)

module.exports = Client;
