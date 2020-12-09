const router = require('express').Router();
const reservationController = require('../controllers/reservation.controller');
const { auth } = require( '../utils/auth');

router.route('/profile').post(auth, reservationController.create);

module.exports = router