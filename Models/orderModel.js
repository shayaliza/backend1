const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
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

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
