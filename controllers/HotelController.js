const Hotel = require("../models/Hotel");

exports.getHotels = (req, res, next) => {
  // Find all hotels and return a JSON response
  Hotel.find()
    .lean()
    .exec((err, hotels) => {
      if (err) return next(err);
      res.json({
        // Iterate through each hotel
        hotels: hotels.map(hotel => ({
          ...hotel
        }))
      });
    });
};
