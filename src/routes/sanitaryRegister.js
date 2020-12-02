const router = require('express').Router();
const sanitaryRegisterController = require('../controllers/sanitaryRegister.controller');
const { auth } = require('../utils/auth');

router.route('/').post(auth, sanitaryRegisterController.create);
router.route('/:sanitaryRegisterId').get(auth, sanitaryRegisterController.show)

module.exports = router