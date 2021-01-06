const router = require('express').Routere();
const menuController = require('../controllers/menu.controller');

router.route('/:menuId').get(menuController.show)

module.exports = router