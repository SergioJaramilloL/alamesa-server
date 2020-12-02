const router = require('express').Router();
const clientController = require('../controllers/client.controller');
const { auth } = require('../utils/auth')

router.route('/sign-up').post(clientController.signup);
router.route('/sign-in').post(clientController.signin);
router.route('/').get(clientController.list);
router.route('/profile').get(auth, clientController.show);
router.route('/').put(auth, clientController.update);
router.route('/').delete(auth, clientController.destroy);

module.exports = router;
