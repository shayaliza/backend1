const mongoose = require("mongoose");

const RuralRiderSchema = new mongoose.Schema({
  sellerName: String,
  sellerPhone: String,
  pickupAddress: String,
  deliveryAddress: String,
  pickupTime: String,
  accepted: Boolean,
  riderDetails: [],
});

const RuralRider = mongoose.model("RuralRider", RuralRiderSchema);

module.exports = RuralRider;
