const Order = require("../Models/orderModel");
const User = require("../Models/userModel");

const httpPlaceOrder = async (req, res) => {
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
};
const httpGetOrders = async (req, res) => {
  try {
    // Retrieve orders with accepted as false or not present
    const orders = await Order.find({ accepted: { $ne: true } });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const httpGetOrder = async (req, res) => {
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
};
const httpGetOrdernew = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId: orderId }); // Correct usage of findOne

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const httpGetRiderdetails = async (req, res) => {
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
};
const httpGetAcceptedOrders = async (req, res) => {
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
};
//@put request //////////////////////////////////
const httpAcceptOrder = async (req, res) => {
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
};
// const httpUpdateAcceptedOrders = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const { acceptedOrders } = req.body;

//     const user = await User.findOneAndUpdate(
//       { email },
//       { $push: { acceptedOrders: { $each: acceptedOrders } } },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Accepted orders updated successfully", user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const httpUpdateAcceptedOrders = async (req, res) => {
  try {
    const { email } = req.params;
    const { acceptedOrders } = req.body;

    // Check if the orders already exist in the user's acceptedOrders array
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingOrderIds = user.acceptedOrders.map((order) => order._id);

    const newOrderIds = acceptedOrders.map((order) => order._id);

    const duplicateOrderIds = existingOrderIds.filter((id) =>
      newOrderIds.includes(id)
    );

    if (duplicateOrderIds.length > 0) {
      return res
        .status(400)
        .json({ error: "Duplicate orders found", duplicateOrderIds });
    }

    // If no duplicates found, update the user's acceptedOrders
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $push: { acceptedOrders: { $each: acceptedOrders } } },
      { new: true }
    );

    res.status(200).json({
      message: "Accepted orders updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const httpUpdateRiderDetails = async (req, res) => {
  const { orderId } = req.params;
  const riderDetails = req.body.riderDetails;

  try {
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
};

// const httpNotAcceptedBySeller = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     // console.log("start");

//     const updatedOrder = await Order.findOneAndUpdate(
//       { orderId: orderId },
//       { $set: { riderDetails: [], accepted: false } },
//       { new: true }
//       // console.log("usado")
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ error: "Order not found" });
//       // console.log("uo");
//     }
//     console.log("end");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const httpNotAcceptedBySeller = async (req, res) => {
  try {
    const { orderId } = req.params;

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      { $set: { riderDetails: [], accepted: false } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    console.log("end");
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update order process API endpoint
// const OrderProcess = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { orderProcess } = req.body;

//     // Find the order by orderId
//     const order = await Order.findOne({ orderId });

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Determine the next order process based on the current one
//     let nextOrderProcess;
//     switch (orderProcess) {
//       case "Order Accepted":
//         nextOrderProcess = "On the way to Seller";
//         break;
//       case "On the way to Seller":
//         nextOrderProcess = "Parcel Accepted by Seller";
//         break;
//       case "Parcel Accepted by Seller":
//         nextOrderProcess = "On the Way to Customer";
//         break;
//       case "On the Way to Customer":
//         nextOrderProcess = "Customer Accepted";
//         break;
//       default:
//         return res.status(400).json({ message: "Invalid order process" });
//     }

//     // Update orderProcess field
//     order.orderProcess = nextOrderProcess;

//     // Save updated order
//     await order.save();

//     return res.json({ message: "Order process updated successfully", order });
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };
const OrderProcess = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderProcess } = req.body;

    // Find the order by orderId
    let order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // If orderProcess field does not exist, set it to default value
    if (!order.orderProcess) {
      order.orderProcess = "Order Accepted";
    }

    // Determine the next order process based on the current one
    let nextOrderProcess;
    switch (
      order.orderProcess // Use order.orderProcess instead of orderProcess
    ) {
      case "Order Accepted":
        nextOrderProcess = "On the way to Seller";
        break;
      case "On the way to Seller":
        nextOrderProcess = "Parcel Accepted by Seller";
        break;
      case "Parcel Accepted by Seller":
        nextOrderProcess = "On the Way to Customer";
        break;
      case "On the Way to Customer":
        nextOrderProcess = "Customer Accepted";
        break;
      default:
        return res.status(400).json({ message: "Invalid order process" });
    }

    // Update orderProcess field
    order.orderProcess = nextOrderProcess;

    // Save updated order
    await order.save();

    return res.json({ message: "Order process updated successfully", order });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  OrderProcess,
  httpAcceptOrder,
  httpUpdateAcceptedOrders,
  httpUpdateRiderDetails,
  httpGetOrder,
  httpGetOrdernew,
  httpGetOrders,
  httpPlaceOrder,
  httpGetRiderdetails,
  httpGetAcceptedOrders,
  httpNotAcceptedBySeller,
};
