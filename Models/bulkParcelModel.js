const mongoose = require("mongoose");

const BulkParcelchema = new mongoose.Schema({
  sellerName: String,
  sellerPhone: String,
  sellerEmail: String,
  pickupAddress: String,
  deliveryAddress: String,
  pickupTime: String,
  weight: String,
  expectedPrice: String,
  accepted: Boolean,
  riderDetails: [],
  sellerAccepted: Boolean,
});

const BookRider = mongoose.model("BulkParcel", BulkParcelchema);

module.exports = BookRider;
