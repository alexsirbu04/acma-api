const moment = require("moment");
const Reservation = require("../models/Reservation");

exports.getReservationsForReception = (req, res, next) => {
  const hotel = req.params.hotel;
  Reservation.find({ hotel: hotel })
    .or([{ status: "upcoming" }, { status: "ongoing" }, { status: "onhold" }])
    .lean()
    .exec((err, reservations) => {
      if (err) return next(err);
      const arrivals = [];
      const departures = [];
      const staying = [];
      const now = moment().format("YYYY-MM-DD");

      reservations.map(reservation => {
        const { checkOut, checkIn } = reservation;
        const checkInDate = moment(
          `${checkIn.year}-${checkIn.month}-${checkIn.dayOfMonth}`,
          "YYYY-MMM-DD"
        );
        const checkOutDate = moment(
          `${checkOut.year}-${checkOut.month}-${checkOut.dayOfMonth}`,
          "YYYY-MMM-DD"
        );

        if (
          moment(checkInDate).isSame(now) &&
          (reservation.status === "upcoming" || reservation.status === "onhold")
        ) {
          arrivals.push(reservation);
        }
        if (
          moment(checkOutDate).isSame(now) &&
          reservation.status === "ongoing"
        ) {
          departures.push(reservation);
        }
        if (reservation.status === "ongoing") {
          staying.push(reservation);
        }
      });

      res.json({
        arrivals,
        departures,
        staying
      });
    });
};

exports.getReservationsForUser = (req, res, next) => {
  const userId = req.params.userId;
  Reservation.find({ userId: userId })
    .or([{ status: "upcoming" }, { status: "onhold" }])
    .lean()
    .exec((err, reservations) => {
      if (err) return next(err);
      const activeReservations = [];
      const now = moment().format("YYYY-MM-DD");

      reservations.map(reservation => {
        const { year, dayOfMonth, month } = reservation.checkIn;
        const checkInDate = moment(
          `${year}-${month}-${dayOfMonth}`,
          "YYYY-MMM-DD"
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

exports.updateStatus = (req, res, next) => {
  Reservation.findOne({ id: req.params.id }, (err, reservation) => {
    if (err) return next(err);
    reservation.status = req.body.status;
    reservation.save(err => {
      if (err) return next(err);
      res.json({ updated: true });
    });
  });
};

exports.cancelReservation = (req, res, next) => {
  Reservation.deleteOne({ id: req.params.id }, err => {
    if (err) return next(err);
    res.json({ deleted: true });
  });
};

exports.book = (req, res, next) => {
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
    roomImage: req.body.roomImage,
    price: req.body.price,
    nightsBooked: req.body.nightsBooked,
    persons: req.body.persons,
    roomsBooked: req.body.roomsBooked,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    status: req.body.status || "upcoming"
  });
  reservation.save(err => {
    if (err) return next(err);
    res.json({ created: true });
  });
};
