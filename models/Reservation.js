const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var reservationSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  hotel: String,
  room: String,
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
  cancelled: Boolean
});

module.exports = mongoose.model("reservations", reservationSchema);
