const router = require('express').Router();
const reservationController = require('../controllers/reservation.controller');
const { auth } = require('../utils/auth');

router.route('/:reservationId').get(auth, reservationController.show);
router.route('/:clientId').post(reservationController.create);
router.route('/:reservationId').put(auth, reservationController.update);

module.exports = router