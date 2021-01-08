const router = require('express').Router();
const menuController = require('../controllers/menu.controller');

router.route('/:menuId').get(menuController.show)

module.exports = router