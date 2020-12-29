const { Schema, model } = require('mongoose');

const sanitaryRegisterSchema = new Schema ({
  temperature: {
    type: Number,
    required: true,
  },
  question1SymptomsCovid: {
    type: Boolean,
  },
  question2ContactWithPeople: {
    type: Boolean,
  },
  question3InternationalTravel: {
    type: Boolean,
  },
  question4HealthWorker: {
    type: Boolean,
  },
  nameCompanion: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  companions: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Companions', 
    }],
  },
  reservations: [{
    type: Schema.Types.ObjectId,
    ref: 'Reservation',
  }],
}, {
  timestamps: true,
});

const SanitaryRegister = model('SanitaryRegister', sanitaryRegisterSchema);

module.exports = SanitaryRegister;