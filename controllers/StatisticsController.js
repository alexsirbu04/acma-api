const moment = require("moment");
const Hotel = require("../models/Hotel");
const Reservation = require("../models/Reservation");
const Client = require("../models/Client");

exports.getStatistics = (req, res, next) => {
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
    ],
    countries: []
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

        Client.find({})
          .lean()
          .exec((err, clients) => {
            if (err) return next(err);
            result.totalClients = clients.length;

            let found;
            for (const client of clients) {
              found = false;
              for (const country of result.countries) {
                if (country.name === client.country) {
                  found = true;
                  country.count = country.count + 1;
                  country.percent = Math.floor(
                    (country.count / result.totalClients) * 100
                  );
                }
              }

              if (found === false) {
                result.countries.push({
                  name: client.country,
                  count: 1,
                  percent: Math.floor((1 / result.totalClients) * 100)
                });
              }
            }

            result.countries.sort((a, b) => {
              return b.percent - a.percent;
            });
            result.countries.splice(5);

            res.json(result);
          });
      });
  });
};
