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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
}, {
  timestamps: true,
});

const Reservation = model('Reservation', reservationSchema);

module.exports = Reservation;