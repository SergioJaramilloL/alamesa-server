const router = require('express').Router();
const sanitaryRegisterController = require('../controllers/sanitaryRegister.controller');

router.route('/').get(sanitaryRegisterController.list)
router.route('/profile').post(sanitaryRegisterController.create);
router.route('/:sanitaryRegisterId').get(sanitaryRegisterController.show)

module.exports = router