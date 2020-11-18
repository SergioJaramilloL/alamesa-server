const router = require('express').Router();
const clientController = require('../controllers/client.controller');

router.route('/').get(clientController.listar);
router.route('/').post(clientController.create);
router.route('/:clientId').get(clientController.show);
router.route('/:clientId').delete(clientController.destroy);


module.exports = router;