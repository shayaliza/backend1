const mongoose = require("mongoose");

const BookRiderchema = new mongoose.Schema({
  sellerName: String,
  sellerPhone: String,
  sellerEmail: String,
  pickupAddress: String,
  deliveryAddress: String,
  pickupTime: String,
  expectedPrice: String,
  accepted: Boolean,
  deliverBy: String,
  riderDetails: [],
  sellerAccepted: Boolean,
});

const BookRider = mongoose.model("BookRider", BookRiderchema);

module.exports = BookRider;
