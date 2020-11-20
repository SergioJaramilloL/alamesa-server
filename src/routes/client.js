const router = require('express').Router();
const clientController = require('../controllers/client.controller');

router.route('/').get(clientController.list);
router.route('/').post(clientController.create);
router.route('/sign-up').post(clientController.signup);
router.route('/:clientId').get(clientController.show);
router.route('/:clientId').delete(clientController.destroy);


module.exports = router;
