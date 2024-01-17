const mongoose = require("mongoose");

const GotanSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subdomain: String,
  businessName: String,
  businessAddress: String,
  password: String,
});

const Gotan = mongoose.model("FormData", GotanSchema);

module.exports = Gotan;
