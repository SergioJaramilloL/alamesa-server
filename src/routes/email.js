const router = require('express').Router();
const emailController = require('../controllers/email.controller')
const { auth } = require('../utils/auth')

router.route('/recovery-pass').post(emailController.recoverypass)
router.route('/recovery-reset').put(auth, emailController.resetpass)

module.exports = router;
