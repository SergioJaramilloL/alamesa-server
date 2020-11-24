const router = require('express').Router();
const clientController = require('../controllers/client.controller');

router.route('/sign-up').post(clientController.signup);
router.route('/').get(clientController.show);
router.route('/list').get(clientController.list);
router.route('/:clientId').put(clientController.update);
router.route('/:clientId').delete(clientController.destroy);


module.exports = router;
