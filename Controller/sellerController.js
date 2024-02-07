const Order = require("../Models/orderModel");
// const User = require("../Models/userModel");

const getHello = (req, res) => {
  res.send("hello");
};

const notAcceptedBySeller = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Assuming you have a Mongoose model for the "riderOrders" collection
    const riderOrder = await Order.findOne({ _id: orderId });

    if (!riderOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // If riderOrder is present, send it in the response
    return res.status(200).json({ riderOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getHello,
  notAcceptedBySeller,
};
