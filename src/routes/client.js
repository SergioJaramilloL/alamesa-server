const router = require('express').Router();
const clientController = require('../controllers/client.controller');
const { auth } = require('../utils/auth')

router.route('/sign-up').post(clientController.signup);
router.route('/sign-in').post(clientController.signin);
router.route('/').get(clientController.list);
router.route('/profile').get(auth, clientController.show);
router.route('/:clientId').put(clientController.update);
router.route('/:clientId').delete(clientController.destroy);


module.exports = router;
