const { Schema, model } = require('mongoose');

const sanitaryRegisterSchema = new Schema ({
  temperature: {
    type: String,
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  // reservation: {
  //   type: Schema.Types.ObjectId, 
  //   ref: 'Reservation',
  //   required: true,
  // },
  // companion: {
  //   type: [{ type: Schema.Types.ObjectId, ref: 'Companion'}],
  // },
}, {
  timestamps: true,
});

const SanitaryRegister = model('SanitaryRegister', sanitaryRegisterSchema);

module.exports = SanitaryRegister;