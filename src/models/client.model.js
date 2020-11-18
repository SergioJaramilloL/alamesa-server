const { Schema, model } = require('mongoose');

const clientSchema = new Schema ({
  name: 'String',
  lastName: 'String',
  password: 'String',
  email: 'String',
  identification: 'String',
  
  },{
    timestamps: true,
});

const Client = model('Client', clientSchema)

module.exports = Client
