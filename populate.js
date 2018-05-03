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
    rooms: {
      roomNumber: 132,
      roomTypes: [
        {
          roomTypeName: 'Studio Suite',
          roomTypeDescription: 'One King bed with pillow top mattress. 265 square feet. Located on all floors. Fully equipped kitchen with full-sized refrigerator, two-burner stove top, microwave, toaster, coffeemaker, and cookware. Two-seater dining table. Reading chair. 27-inch television with U.S. cable channels. Free wireless internet access. Bathroom with shower and tub. Ceiling fan and louvered windows in addition to air conditioning.'
        },
        {
          roomTypeName: 'Deluxe Suite',
          roomTypeDescription: 'Two queen beds with pillow top mattresses. 345 square feet. Located on all floors. Fully equipped kitchen with full-sized refrigerator, two-burner stove top, microwave, toaster, coffeemaker, and cookware. Two-seater dining table. Reading chair. 27-inch television with U.S. cable channels. Free wireless internet access. Bathroom with shower and tub. Ceiling fan and louvered windows in addition to air conditioning.'
        },
        {
          roomTypeName: 'One Bedroom Suite',
          roomTypeDescription: 'One king bed with pillow top mattress in bedroom area, and a single sleeper sofa bed in living room area. Garden, pool, or courtyard view. 394 square feet. Fully equipped kitchen with full-sized refrigerator, stove top, microwave, toaster, coffeemaker, and cookware. Two-seater dining table. Reading chair and coffee table. Two TVs (one in bedroom) television with U.S. cable channels. Free wireless internet. Bathroom with shower and tub. Ceiling fan & AC.'
        }
      ]
    },
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