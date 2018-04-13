const mongoose = require('mongoose');
const { Schema } = mongoose;

const hotelSchema = new Schema({
  name: String,
  street: {
    streetName: String,
    streetNumber: Number,
    postalCode: String
  },
  city: String,
  country: String,
  telephone: String,
  email: String,
  site: String,
  stars: Number,
  rooms: Number,
  bars: Number,
  restaurants: Number
});

module.exports = {
  hotelModel: mongoose.model('hotels', hotelSchema)
};
