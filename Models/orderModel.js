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
  orderProcess: {
    type: String,
    enum: [
      "Order Accepted",
      "On the way to Seller",
      "Parcel Accepted by Seller",
      "On the Way to Customer",
      "Customer Accepted",
    ],
    default: "Order Accepted",
  },
});

const riderOrder = mongoose.model("riderOrder", riderOrderSchema);

module.exports = riderOrder;
