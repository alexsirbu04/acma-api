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
  },
  {
    name: 'Hotel Continental',
    street: {
      streetName: 'B-dul Revolutiei 1989',
      streetNumber: 5,
      postalCode: '300054'
    },
    city: 'Timisoara',
    country: 'Romania',
    telephone: '(0040) 256 494 144',
    email: 'secretariat@hotelcontinental.ro',
    site: 'www.hotelcontinental.ro',
    stars: 3.5,
    rooms: 164,
    bars: 1,
    restaurants: 0
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