const model = require('../models/Hotel');
const Hotel = model.hotelModel;

const Hotels = (req, res) => {
  // Find all hotels and return a JSON response
  Hotel.find().lean().exec((error, hotels) => res.json({
    // Iterate through each hotel
    hotels: hotels.map(hotel => ({
      ...hotel
    }))
  }));
};

module.exports = {
  Hotels
};
