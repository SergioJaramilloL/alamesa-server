const router = require('express').Router();
const reservationController = require('../controllers/reservation.controller');

router.route('/:restaurantId/:clientId').post(reservationController.create);
router.route('/restaurant/:reservationId').get(reservationController.showRestaurant);
router.route('/client/:reservationId').get(reservationController.showClient);
router.route('/:reservationId').put(reservationController.update);
router.route('/:reservationId').delete(reservationController.destroy);

module.exports = router