const mongoose = require('mongoose');
const model = require('./models/Hotel');
const Hotel = model.hotelModel;
const keys = require('./config/keys');

const hotels = [
  {
    name: 'Sunshine Suites',
    street: {
      streetName: 'Esterley Tibbetts Highway',
      streetNumber: 1465,
      postalCode: 'KY1-1201'
    },
    city: 'Safehaven',
    country: 'Cayman Islands',
    telephone: '+1-345-9493000',
    email: 'info@sunshinesuites.com',
    site: 'www.sunshinesuites.com',
    stars: 4,
    rooms: 132,
    bars: 1,
    restaurants: 1
  }
];

mongoose.connect(keys.mongoURI);

// Go through each hotel
hotels.map(data => {
  // Initialize a model with hotel data
  const hotel = new Hotel(data);
  // Save the record
  hotel.save();
});