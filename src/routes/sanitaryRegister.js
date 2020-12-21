const router = require('express').Router();
const sanitaryRegisterController = require('../controllers/sanitaryRegister.controller');
const { auth } = require('../utils/auth');

router.route('/').post(auth, sanitaryRegisterController.create);
router.route('/').get(auth, sanitaryRegisterController.show);
router.route('/').put(auth, sanitaryRegisterController.update);
router.route('/companion').post(auth, sanitaryRegisterController.createCompanion);

module.exports = router