const router = require('express').Router();
const reservationController = require('../controllers/reservation.controller');
const { auth } = require('../utils/auth');

router.route('/:restaurantId').post(auth, reservationController.create);
router.route('/restaurant/:reservationId').get(auth, reservationController.showRestaurant);
router.route('/client/:reservationId').get(auth, reservationController.showClient);
router.route('/:reservationId').delete(auth, reservationController.destroy);

module.exports = router
