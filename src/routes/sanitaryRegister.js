const router = require('express').Router();
const sanitaryRegisterController = require('../controllers/sanitaryRegister.controller');
const { auth } = require('../utils/auth');

router.route('/').post(auth, sanitaryRegisterController.create);
router.route('/').get(auth, sanitaryRegisterController.show);
router.route('/:sanitaryRegisterId').put(auth, sanitaryRegisterController.update);

module.exports = router