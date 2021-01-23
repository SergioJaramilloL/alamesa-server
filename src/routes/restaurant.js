const router = require('express').Router();
const restaurantController = require('../controllers/restaurant.controller');
const { auth } = require('../utils/auth')
const restaurantLogo = require('../utils/cloudinaryPresets/restaurantLogo') 

router.route('/sign-up').post(restaurantController.signup);
router.route('/sign-in').post(restaurantController.signin);
router.route('/').get(restaurantController.list);
router.route('/profile').get(auth, restaurantController.show);
router.route('/').put(auth, restaurantController.update);
router.route('/update-logo').put(auth, restaurantLogo, restaurantController.updateLogo);
router.route('/').delete(auth, restaurantController.destroy);
router.route('/reservations').get(auth, restaurantController.showReservationRestaurant);

module.exports = router;
