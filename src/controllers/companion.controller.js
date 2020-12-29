const Companions = require('../models/companion.model');

module.exports = {
  async list(req, res) {
    try {
      const companions = await Companions
        .find()
        .populate({ 
          path: 'sanitaryRegister', 
          select: ['temperature', 'question1SymptomsCovid', 'question2ContactWithPeople', 'question3InternationalTravel', 'question4HealthWorker']})

      if(!companions){
        throw new Error('Could not find companions')
      }

      res.status(200).json({ message: 'Companions found', data: companions })
    } catch(err) {
      res.status(404).json({ message: 'Companions not found' })
    }
  },
};