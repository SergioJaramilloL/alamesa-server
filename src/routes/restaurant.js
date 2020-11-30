const router = require('express').Router();
const restaurantController = require('../controllers/restaurant.controllers');
const { auth } = require('../utils/auth')

router.route('/sign-up').post(restaurantController.signup);
router.route('/sign-in').post(restaurantController.signin);
router.route('/').get(auth, restaurantController.list);
router.route('/profile').get(auth, restaurantController.show);
router.route('/:restaurantId').put(restaurantController.update);
router.route('/:restaurantId').delete(restaurantController.destroy);

module.exports = router;
