const router = require('express').Router();
const companionsController = require('../controllers/companion.controller');

router.route('/').get(companionsController.list);

module.exports = router