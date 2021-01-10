const router = require('express').Router();
const dishController = require('../controllers/dish.controller');
const { auth } = require('../utils/auth');
const formData = require('../utils/formData');

router.route('/').post(auth, formData, dishController.create);
router.route('/:dishId').put(auth, formData, dishController.update);
router.route('/:dishId').delete(auth, dishController.destroy);
router.route('/:dishId').get(auth, dishController.show);

module.exports = router