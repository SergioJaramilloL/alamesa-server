const { Schema, model } = require('mongoose');

const companionSchema = new Schema ({
  nameCompanion: {
    type: String,
    required: true,
  },
  sanitaryRegister: {
    type: { 
      type: Schema.Types.ObjectId,
      ref: 'SanitaryRegister',
    }
  },
}, {
  timestamps: true,
});

const Companion = model('Companion', companionSchema);

module.exports = Companion;