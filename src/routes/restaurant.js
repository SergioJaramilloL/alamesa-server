const router = require('express').Router();
const restaurantController = require('../controllers/restaurant.controller');
const { auth } = require('../utils/auth')

router.route('/sign-up').post(restaurantController.signup);
router.route('/sign-in').post(restaurantController.signin);
router.route('/').get(restaurantController.list);
router.route('/profile').get(auth, restaurantController.show);
router.route('/').put(auth, restaurantController.update);
<<<<<<< HEAD
router.route('/').delete(auth, restaurantController.destroy);
=======
router.route('/:restaurantId').delete(restaurantController.destroy);
>>>>>>> 734680ba2cb71d1f907a5a947b8c3b916962ac9e

module.exports = router;
