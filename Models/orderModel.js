const mongoose = require("mongoose");

const riderOrderSchema = new mongoose.Schema({
  shopId: String,
  orderId: String,
  address: String,
  date: String,
  gst: String,
  onePiecePrice: String,
  paymentMethod: String,
  productCount: String,
  productId: String,
  productImage: String,
  productName: String,
  totalCartValue: String,
  transactionId: String,
  sellerAddress: String,
  accepted: Boolean,
  riderDetails: [],
});

const riderOrder = mongoose.model("riderOrder", riderOrderSchema);

module.exports = riderOrder;
