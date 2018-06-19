const Hotel = require("../models/Hotel");

exports.getHotels = (req, res, next) => {
  Hotel.find()
    .lean()
    .exec((err, hotels) => {
      if (err) return next(err);
      res.json({ hotels });
    });
};
