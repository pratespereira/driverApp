const express = require('express');
const passengerController = require('../controllers/passenger.controller');

const validateNewPassengerFields = require('../middlewares/validateNewPassengerFields');
const validateRequestTravelSchema = require('../middlewares/validatePassengerFields');

const router = express.Router();

router.post(
  '/:passengerId/request/travel',
  validateRequestTravelSchema,
  passengerController.createTravel,
);

router.get(
  '/',
  passengerController.listPassengers,
);

router.get(
  '/:id',
  passengerController.getPassenger,
);

router.post(
  '/',
  validateNewPassengerFields,
  passengerController.createPassenger,
);

module.exports = router;
