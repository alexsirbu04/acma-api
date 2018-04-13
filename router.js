const express = require('express');
const { Router } = express;
const hotelController = require('./controllers/HotelController');
const hotels = hotelController.Hotels;

const router = Router();

router.route('/hotels').get(hotels);

module.exports = {
  Router: router
};
