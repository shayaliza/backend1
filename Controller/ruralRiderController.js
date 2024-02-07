const RuralRider = require("../Models/ruralRiderModel");

const addOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new RuralRider(orderData);
    await newOrder.save();
    res.status(201).json({ message: "Order submitted successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

getOrder = async (req, res) => {
  try {
    const orders = await RuralRider.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getOrder,
  addOrder,
};
