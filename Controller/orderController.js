const Order = require("../Models/orderModel");
const User = require("../Models/userModel");

module.exports = {
  placeOrder: async (req, res) => {
    try {
      const {
        email,
        shopId,
        orderId,
        address,
        date,
        gst,
        onePiecePrice,
        paymentMethod,
        productCount,
        productId,
        productImage,
        productName,
        totalCartValue,
        transactionId,
        sellerAddress,
        accepted,
        riderDetails,
      } = req.body;

      const order = new Order({
        email,
        shopId,
        orderId,
        address,
        date,
        gst,
        onePiecePrice,
        paymentMethod,
        productCount,
        productId,
        productImage,
        productName,
        totalCartValue,
        transactionId,
        sellerAddress,
        accepted,
        riderDetails,
      });

      await order.save();

      res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getOrders: async (req, res) => {
    try {
      // Retrieve orders with accepted as false or not present
      const orders = await Order.find({ accepted: { $ne: true } });

      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getOrder: async (req, res) => {
    try {
      const { orderId } = req.params;

      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.status(200).json({ order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getRiderdetails: async (req, res) => {
    try {
      const orderId = req.params.orderId;

      const order = await Order.findOne({ orderId });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.status(200).json({ order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  acceptOrder: async (req, res) => {
    try {
      const { orderId } = req.params;

      const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId },
        { accepted: true, riderId: req.body.riderId },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Update the user's accepted orders
      const userId = updatedOrder.userId; // Assuming you have userId in the Order schema
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { acceptedOrders: updatedOrder._id } },
        { new: true }
      );

      res.json({
        message: "Order accepted successfully",
        order: updatedOrder,
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateRiderDetails: async (req, res) => {
    const { orderId } = req.params;
    const riderDetails = req.body.riderDetails;

    try {
      // Find the order by orderId
      // const order = await Order.findOne({ orderId });
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      // If riderDetails array is empty, create a new array with the provided details
      order.riderDetails = riderDetails || [];

      // Update rider details
      await order.save();

      // Send a success response
      res.json({ message: "Rider details updated successfully", order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAcceptedOrders: async (req, res) => {
    try {
      const { email } = req.params;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const acceptedOrders = user.acceptedOrders || [];

      res.status(200).json({ acceptedOrders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateAcceptedOrders: async (req, res) => {
    try {
      const { email } = req.params;
      const { acceptedOrders } = req.body;

      const user = await User.findOneAndUpdate(
        { email },
        { $push: { acceptedOrders: { $each: acceptedOrders } } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res
        .status(200)
        .json({ message: "Accepted orders updated successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
