const moment = require("moment");
const Hotel = require("../models/Hotel");
const Reservation = require("../models/Reservation");
const Client = require("../models/Client");

exports.getTotalAvailableRooms = (req, res, next) => {
  const result = {
    months: [
      {
        name: "Jan",
        roomsBooked: 0
      },
      {
        name: "Feb",
        roomsBooked: 0
      },
      {
        name: "Mar",
        roomsBooked: 0
      },
      {
        name: "Apr",
        roomsBooked: 0
      },
      {
        name: "May",
        roomsBooked: 0
      },
      {
        name: "Jun",
        roomsBooked: 0
      },
      {
        name: "Jul",
        roomsBooked: 0
      },
      {
        name: "Aug",
        roomsBooked: 0
      },
      {
        name: "Sep",
        roomsBooked: 0
      },
      {
        name: "Oct",
        roomsBooked: 0
      },
      {
        name: "Nov",
        roomsBooked: 0
      },
      {
        name: "Dec",
        roomsBooked: 0
      }
    ]
  };

  hotelName = req.params.hotel;
  Hotel.findOne({ name: hotelName }, (err, hotel) => {
    if (err) return next(err);
    result.totalRooms = hotel.rooms.roomNumber;

    Reservation.find({ hotel: hotelName })
      .lean()
      .exec((err, reservations) => {
        if (err) return next(err);
        for (const reservation of reservations) {
          for (const month of result.months) {
            if (month.name === reservation.checkIn.month) {
              month.roomsBooked += reservation.roomsBooked;
            }
          }
        }
        res.json(result);
      });
  });
};
