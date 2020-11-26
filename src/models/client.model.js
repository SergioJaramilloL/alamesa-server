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
  userType: {
    type: String,
    required: true, 
  },
  terms: {
    type: Boolean,
    required: true,
  },
  },{
    timestamps: true,
});

const Client = model('Client', clientSchema)

module.exports = Client
