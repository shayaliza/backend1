const BulkParcel = require("../Models/bulkParcelModel");
const getSellerAcceptedTrue = async (req, res) => {
  try {
    const orders = await BulkParcel.find({ sellerAccepted: true });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders with sellerAccept true:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

getOrder = async (req, res) => {
  try {
    const orders = await BulkParcel.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const nodemailer = require("nodemailer");

const addOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new BulkParcel(orderData);
    await newOrder.save();

    // Send email notification to the seller
    sendEmailNotification(
      orderData.sellerEmail,
      "Order Confirmation",
      `Hi ${orderData.sellerName},\n\n` +
        `We have received your order. Thank you for choosing us!\n\n` +
        `To track your order, click on the following link: https://Goton.in/orders/${newOrder._id}\n\n` +
        `Your Order ID is: ${newOrder._id}\n\n` +
        `If you have any questions or concerns, feel free to reach out to us.\n\n` +
        `Best regards,\nGotan.in`
    );

    res.status(201).json({
      message: "Order submitted successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to send email notification
const sendEmailNotification = (recipientEmail, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "digistall.otp@gmail.com",
      pass: "pevkxuqeqaggfhkp",
    },
  });

  const mailOptions = {
    from: "digistall.otp@gmail.com",
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email notification:", error);
    } else {
      console.log("Email notification sent:", info.response);
    }
  });
};

sellerAccept = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the BulkParcel document by id
    const bulkParcel = await BulkParcel.findById(id);
    if (!bulkParcel) {
      return res.status(404).json({ error: "BulkParcel not found" });
    }
    // Update the sellerAccepted field to true
    console.log("jdf");
    bulkParcel.sellerAccepted = true;
    // Save the updated document
    await bulkParcel.save();
    // Respond with success message
    return res
      .status(200)
      .json({ message: "Seller accepted updated successfully" });
  } catch (error) {
    console.error("Error updating sellerAccepted:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getUnacceptedBulkParcelOrders = async (req, res) => {
  try {
    const unacceptedOrders = await BulkParcel.find({
      $or: [{ sellerAccepted: false }, { sellerAccepted: { $exists: false } }],
    });
    res.status(200).json(unacceptedOrders);
  } catch (error) {
    console.error("Error fetching unaccepted orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const editBulkParcelOrder = async (req, res) => {
  const { id } = req.params;
  const { deliverBy, expectedPrice, riderDetails } = req.body;
  try {
    const bulkParcel = await BulkParcel.findById(id);
    if (!bulkParcel) {
      return res.status(404).json({ error: "BookRider not found" });
    }
    if (deliverBy) {
      bulkParcel.deliverBy = deliverBy;
    }
    if (expectedPrice) {
      bulkParcel.expectedPrice = expectedPrice;
    }
    // Update riderDetails if present in the request body
    if (
      riderDetails &&
      Array.isArray(riderDetails) &&
      riderDetails.length >= 2
    ) {
      // Update riderDetails[0] and riderDetails[1] if they exist
      if (riderDetails[0]) {
        bulkParcel.riderDetails[0] = riderDetails[0];
      }
      if (riderDetails[1]) {
        bulkParcel.riderDetails[1] = riderDetails[1];
      }
    }
    await bulkParcel.save();
    return res
      .status(200)
      .json({ message: "BookRider order updated successfully" });
  } catch (error) {
    console.error("Error updating BookRider order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getUnacceptedBulkParcelOrders,
  editBulkParcelOrder,
  sellerAccept,
  getOrder,
  addOrder,
  getSellerAcceptedTrue,
};
