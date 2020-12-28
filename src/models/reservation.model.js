const { Schema, model } = require('mongoose');

const reservationSchema = new Schema ({
  branch: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  range: {
    type: Number,
  },
  people: {
    type: Number,
  },
  paymentMethod: {
    type: String,
  },
  status: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  sanitaryRegister: {
    type: Schema.Types.ObjectId,
    ref: 'SanitaryRegister',
  }
}, {
  timestamps: true,
});

const Reservation = model('Reservation', reservationSchema);

module.exports = Reservation;