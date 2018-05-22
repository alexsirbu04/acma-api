const moment = require("moment");
const Reservation = require("../models/Reservation");

exports.getReservations = (req, res, next) => {
  Reservation.find()
    .lean()
    .exec((err, reservations) => {
      if (err) return next(err);
      const activeReservations = [];
      const now = moment().format("YYYY-MM-D");

      reservations.map(reservation => {
        const { year, dayOfMonth } = reservation.checkIn;
        const month = moment()
          .month(reservation.checkIn.month)
          .format("MM");
        const checkInDate = moment(`${year}-${month}-${dayOfMonth}`).format(
          "YYYY-MM-D"
        );

        if (moment(checkInDate).isSameOrAfter(now)) {
          activeReservations.push(reservation);
        }
      });

      res.json({
        reservations: activeReservations
      });
    });
};

exports.getReservationsForUser = (req, res, next) => {
  const userId = req.params.userId;
  Reservation.find({ userId: userId })
    .lean()
    .exec((err, reservations) => {
      if (err) return next(err);
      const activeReservations = [];
      const now = moment().format("YYYY-MM-D");

      reservations.map(reservation => {
        const { year, dayOfMonth } = reservation.checkIn;
        const month = moment()
          .month(reservation.checkIn.month)
          .format("MM");
        const checkInDate = moment(`${year}-${month}-${dayOfMonth}`).format(
          "YYYY-MM-D"
        );

        if (moment(checkInDate).isSameOrAfter(now)) {
          activeReservations.push(reservation);
        }
      });

      res.json({
        reservations: activeReservations
      });
    });
};

exports.Book = (req, res, next) => {
  const reservation = new Reservation({
    id: req.body.id,
    userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    hotel: req.body.hotel,
    street: req.body.street,
    city: req.body.city,
    country: req.body.country,
    room: req.body.room,
    price: req.body.price,
    nightsBooked: req.body.nightsBooked,
    persons: req.body.persons,
    roomsBooked: req.body.roomsBooked,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    cancelled: req.body.cancelled
  });
  reservation.save(err => {
    if (err) return next(err);
    res.json({ created: true });
  });
};
