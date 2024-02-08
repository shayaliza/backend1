const mongoose = require("mongoose");

const VeteranSchema = new mongoose.Schema({
  sellerName: String,
  sellerPhone: String,
  sellerEmail: String,
  sellerAddress: String,
  accepted: Boolean,
  sellerAccepted: Boolean,
  photoUrl: String,
  expectedPrice: String,
  deliverBy: String,
  riderDetails: [],
});

const RuralRider = mongoose.model("Veteran", VeteranSchema);

module.exports = RuralRider;
