const router = require('express').Router();
const emailController = require('../controllers/email.controller')

router.route('/recovery-pass').post(emailController.recoverypass)
//router.route('/sign-in').post(restaurantController.signin);

module.exports = router;
