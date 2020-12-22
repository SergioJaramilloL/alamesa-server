const { Schema, model } = require('mongoose');

const companionsSchema = new Schema ({
  nameCompanion: {
    type: String,
    required: true,
  },
  sanitaryRegister: {
    type: [{ 
      type: Schema.Types.ObjectId,
      ref: 'SanitaryRegister',
    }]
  },
}, {
  timestamps: true,
});

const Companions = model('Companions', companionsSchema);

module.exports = Companions;