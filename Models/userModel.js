const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  phoneNumber: String,
  email: String,
  location: String,
  name: String,
  profileImage: String,
  licenseImage: String,
  password: String,
  acceptedOrders: [{}],
});

const Rider = mongoose.model("Rider", UserSchema);

module.exports = Rider;
