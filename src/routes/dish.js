const router = require('express').Router();
const dishController = require('../controllers/dish.controller');
const { auth } = require('../utils/auth');
const formData = require('../utils/formData');

router.route('/').post(auth, dishController.create);
router.route('/').put(auth, dishController.update);

module.exports = router