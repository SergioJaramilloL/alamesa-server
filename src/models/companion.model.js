const { Schema, model } = require('mongoose');

const companionsSchema = new Schema ({
  nameCompanion: {
    type: String,
    required: true,
  },
  sanitaryRegister: { 
    type: Schema.Types.ObjectId,
    ref: 'SanitaryRegister',
  },
  reservation: {
    type: Schema.Types.ObjectId,
    ref: 'Reservation',
  }
}, {
  timestamps: true,
});

const Companions = model('Companions', companionsSchema);

module.exports = Companions;