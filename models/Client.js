const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: String,
  phone: String,
  address: String,
  postalCode: String,
  city: String,
  country: String
});

module.exports = mongoose.model("clients", clientSchema);
