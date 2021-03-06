const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  id: String,
  userId: String,
  userImage: String,
  firstName: String,
  lastName: String,
  hotel: String,
  hotelImage: String,
  street: {
    streetName: String,
    streetNumber: Number,
    postalCode: String
  },
  city: String,
  country: String,
  room: String,
  roomImage: String,
  price: Number,
  nightsBooked: Number,
  persons: Number,
  roomsBooked: Number,
  checkIn: {
    dayOfMonth: String,
    dayOfWeek: String,
    month: String,
    year: String
  },
  checkOut: {
    dayOfMonth: String,
    dayOfWeek: String,
    month: String,
    year: String
  },
  status: String
});

module.exports = mongoose.model("reservations", reservationSchema);
