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
  rooms: {
    roomNumber: Number,
    roomTypes: [
      {
        roomTypeName: String,
        roomTypeDescription: String,
        roomImage: String,
        price: Number
      }
    ]
  },
  bars: Boolean,
  restaurants: Boolean,
  firstImage: String,
  secondImage: String,
  thirdImage: String
});

module.exports = {
  hotelModel: mongoose.model('hotels', hotelSchema)
};
