const moment = require("moment");
const Reservation = require("../models/Reservation");

exports.getReservationsForReception = (req, res, next) => {
  const hotel = req.params.hotel;
  console.log(req.params.hotel);
  Reservation.find({ hotel: hotel })
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

        if (moment(checkInDate).isSame(now)) {
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

exports.cancelReservation = (req, res, next) => {
  Reservation.deleteOne({ id: req.params.id }, err => {
    if (err) return next(err);
    res.json({ deleted: true });
  });
};

exports.Book = (req, res, next) => {
  const reservation = new Reservation({
    id: req.body.id,
    userId: req.body.userId,
    userImage: req.body.userImage,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    hotel: req.body.hotel,
    hotelImage: req.body.hotelImage,
    street: req.body.street,
    city: req.body.city,
    country: req.body.country,
    room: req.body.room,
    price: req.body.price,
    nightsBooked: req.body.nightsBooked,
    persons: req.body.persons,
    roomsBooked: req.body.roomsBooked,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut
  });
  reservation.save(err => {
    if (err) return next(err);
    res.json({ created: true });
  });
};
