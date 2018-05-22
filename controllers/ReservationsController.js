const Reservation = require("../models/Reservation");

exports.getReservations = (req, res, next) => {
  Reservation.find()
    .lean()
    .exec((err, reservations) => {
      if (err) return next(err);
      res.json({
        reservations: reservations.map(reservation => ({
          ...reservation
        }))
      });
    });
};

exports.Book = (req, res, next) => {
  const reservation = new Reservation({
    id: req.body.id,
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
