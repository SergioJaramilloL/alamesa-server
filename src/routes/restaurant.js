const router = require('express').Router();
const restaurantController = require('../controllers/restaurant.controllers');

router.route('/').get(restaurantController.list);
router.route('/:restaurantId').get(restaurantController.show);
router.route('/sign-up').post(restaurantController.signup);
router.route('/:restaurantId').put(restaurantController.update);
router.route('/:restaurantId').delete(restaurantController.destroy);


module.exports = router;