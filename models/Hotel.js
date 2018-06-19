const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: String,
  type: String,
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
        bedType: String,
        price: Number,
        services: {
          wifi: Boolean,
          bathtub: Boolean,
          ac: Boolean,
          bar: Boolean,
          tv: Boolean,
          safe: Boolean
        }
      }
    ]
  },
  bars: Boolean,
  restaurants: Boolean,
  firstImage: String,
  secondImage: String,
  thirdImage: String
});

module.exports = mongoose.model("hotels", hotelSchema);
